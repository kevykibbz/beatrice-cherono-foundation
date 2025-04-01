import { ITestimonial } from '@/types/types'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react';

export function useTestimonials() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";
  
  return useQuery<ITestimonial[]>({
    queryKey: ['testimonials', isAdmin],
    queryFn: async () => {
      const res = await fetch('/api/testimonials?approved=true')
      if (!res.ok) throw new Error('Failed to fetch testimonials')
      return res.json()
    }
  })
}

export function useAddTestimonial() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (values: {
      name: string
      role: string
      testimonial: string
    }) => {
      const res = await fetch('/api/testimonials/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      if (!res.ok) throw new Error('Failed to add testimonial')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] })
    }
  })
}