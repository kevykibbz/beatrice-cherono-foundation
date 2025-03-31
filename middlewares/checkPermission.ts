import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { UserModel } from "@/lib/models";

export const checkPermission = (requiredPermission: string) => {
  return async (req: NextApiRequest, res: NextApiResponse, next: Function) => {
    const session = await getSession({ req });

    if (!session?.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await UserModel.findById(session.user.id)
      .populate("permissions")
      .exec();

    const hasPermission = user?.permissions?.some(
      (p: any) => p.name === requiredPermission
    );

    if (!hasPermission && user?.role !== "admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
};
