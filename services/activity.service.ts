import { ActivityModel } from "@/lib/models/Activity";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";
import { getClientIp } from "request-ip";

export class ActivityLogger {
  // User Authentication Logs
  static async logLogin(userId: string, req?: NextApiRequest) {
    try {
      const ipAddress = req ? getClientIp(req) : null;
      const userAgent = req?.headers["user-agent"];

      await ActivityModel.create({
        user: userId,
        action: "user:login",
        details: "User logged in",
        metadata: {
          ipAddress: ipAddress ?? undefined,
          userAgent,
        },
      });
    } catch (error) {
      console.error("Failed to log login activity:", error);
    }
  }

  static async logLogout(userId: string, req?: NextApiRequest) {
    try {
      const ipAddress = req ? getClientIp(req) : null;
      const userAgent = req?.headers["user-agent"];

      await ActivityModel.create({
        user: userId,
        action: "user:logout",
        details: "User logged out",
        metadata: {
          ipAddress: ipAddress ?? undefined,
          userAgent,
        },
      });
    } catch (error) {
      console.error("Failed to log logout activity:", error);
    }
  }

  // Testimonial Logs
  static async logTestimonialAdd(
    userId: string,
    testimonialId: string,
    req?: NextRequest
  ) {
    try {
      let ipAddress: string | null = null;
      let userAgent: string | undefined;

      if (req) {
        ipAddress =
          req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
        userAgent = req.headers.get("user-agent") || undefined;
      }

      await ActivityModel.create({
        user: userId,
        action: "testimonial:add",
        details: "User added a new testimonial",
        metadata: {
          testimonialId,
          ipAddress: ipAddress ?? undefined,
          userAgent,
        },
      });
    } catch (error) {
      console.error("Failed to log testimonial addition:", error);
    }
  }

  static async logTestimonialApprove(
    userId: string,
    testimonialId: string,
    req?: NextRequest
  ) {
    try {
      let ipAddress: string | null = null;
      let userAgent: string | undefined;

      if (req) {
        ipAddress =
          req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
        userAgent = req.headers.get("user-agent") || undefined;
      }

      await ActivityModel.create({
        user: userId,
        action: "testimonial:approve",
        details: "Admin approved a testimonial",
        metadata: {
          testimonialId,
          ipAddress: ipAddress ?? undefined,
          userAgent,
        },
      });
    } catch (error) {
      console.error("Failed to log testimonial approval:", error);
    }
  }

  static async logTestimonialDelete(
    userId: string,
    testimonialId: string,
    req?: NextRequest
  ) {
    try {
      let ipAddress: string | null = null;
      let userAgent: string | undefined;

      if (req) {
        ipAddress =
          req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
        userAgent = req.headers.get("user-agent") || undefined;
      }

      await ActivityModel.create({
        user: userId,
        action: "testimonial:delete",
        details: "Admin deleted a testimonial",
        metadata: {
          testimonialId,
          ipAddress: ipAddress ?? undefined,
          userAgent,
        },
      });
    } catch (error) {
      console.error("Failed to log testimonial deletion:", error);
    }
  }

}
