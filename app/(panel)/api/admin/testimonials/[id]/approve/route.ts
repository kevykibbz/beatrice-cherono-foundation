import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { ActivityType } from '@prisma/client';
import { redis } from '@/lib/redis';
import { ADMIN_TESTIMONIALS_CACHE_KEY } from '@/config/redis';
import { FORBIDDEN, UNAUTHORIZED } from '@/config/api-messages';




export async function PATCH( request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) return UNAUTHORIZED

    // Check if user is admin
    if (session.user.role !== 'admin') return FORBIDDEN

    // Destructure params after awaiting
    const url = new URL(request.url);
    const id = url.searchParams.get("id");


    if (!id) {
      return NextResponse.json(
        { message: 'Testimonial ID is required' },
        { status: 400 }
      );
    }

    const existingTestimonial = await prisma.testimonial.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!existingTestimonial) {
      return NextResponse.json(
        { message: 'Testimonial not found' },
        { status: 404 }
      );
    }

    if (existingTestimonial.approved) {
      return NextResponse.json(
        { message: 'Testimonial is already approved' },
        { status: 400 }
      );
    }

    const updatedTestimonial = await prisma.testimonial.update({
      where: { id },
      data: { approved: true },
      include: { user: true },
    });

    // Get IP address
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    await prisma.activity.create({
      data: {
        userId: session.user.id,
        action: ActivityType.TESTIMONIAL_APPROVE,
        details: `Approved testimonial from ${updatedTestimonial.user.name}`,
        metadata: {
          testimonialId: updatedTestimonial.id,
          userName: updatedTestimonial.user.name,
          role: updatedTestimonial.role,
          oldStatus: existingTestimonial.approved,
          ipAddress,
          newStatus: true,
        },
      },
    });

    // Invalidate Redis cache
    await redis.del(ADMIN_TESTIMONIALS_CACHE_KEY);
    return NextResponse.json(updatedTestimonial);
  } catch (error) {
    console.error('Error approving testimonial:', error);
    return NextResponse.json(
      { 
        message: 'Error approving testimonial',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}