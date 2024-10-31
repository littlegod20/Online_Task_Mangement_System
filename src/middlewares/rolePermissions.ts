import { NextFunction, Request, Response } from "express";
import { PERMISSIONS } from "../utils/permissions";

export const hasPermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user.role;

    if (!role) {
      res.status(403).json({ message: "No role specified" });
      return;
    }

    const allowedPermissions = PERMISSIONS[role];
    if (allowedPermissions.includes(permission)) {
      next();
    } else {
      res.status(403).json({ message: "Permission denied" });
    }
  };
};
