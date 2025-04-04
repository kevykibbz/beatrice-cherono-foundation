import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PermissionAction, Role } from "@prisma/client";
import { prisma } from "./db";
import { AuthCheckResult } from "@/types/types";



export async function checkAuthWithPermissions(): Promise<AuthCheckResult> {
  const session = await getServerSession(authOptions);
  const defaultResult = {
    isAuthenticated: false,
    isAdmin: false,
    user: null,
  };

  if (!session?.user?.id) {
    return defaultResult;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        permissions: {
          select: {
            resource: true,
            action: true,
          },
        },
      },
    });

    if (!user) {
      return defaultResult;
    }

    return {
      isAuthenticated: true,
      isAdmin: user.role === "admin",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        permissions: user.permissions.map((p) => ({
          resource: p.resource,
          action: p.action,
        })),
      },
    };
  } catch (error) {
    console.error("Auth check failed:", error);
    return defaultResult;
  }
}

export async function requirePermission(
  resource: string,
  action: PermissionAction
): Promise<{
  allowed: boolean;
  user?: { id: string; role: Role };
  error?: { status: number; message: string };
}> {
  const { isAuthenticated, isAdmin, user } = await checkAuthWithPermissions();

  // Basic checks
  if (!isAuthenticated || !user) {
    return {
      allowed: false,
      error: { status: 401, message: "Unauthorized" },
    };
  }

  // Admins bypass permission checks for non-manage actions
  if (isAdmin && action !== "manage") {
    return { allowed: true, user };
  }

  // Check specific permissions
  const hasPermission = user.permissions.some(
    (permission) =>
      permission.resource === resource &&
      (permission.action === action || permission.action === "manage")
  );

  if (!hasPermission) {
    return {
      allowed: false,
      user,
      error: {
        status: 403,
        message: `Requires ${action} permission on ${resource}`,
      },
    };
  }

  return { allowed: true, user };
}

// Special case for admin-only endpoints
export async function requireAdmin(): Promise<{
  allowed: boolean;
  user?: { id: string; role: Role };
  error?: { status: number; message: string };
}> {
  return requirePermission("admin", "manage");
}
