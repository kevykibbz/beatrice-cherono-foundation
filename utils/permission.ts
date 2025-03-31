import { PermissionModel } from "@/lib/models/Permission";

export const DEFAULT_ADMIN_PERMISSIONS = [
  { 
    name: "manage_users",
    description: "Can manage all users",
    resource: "users",
    action: "manage"
  },
  {
    name: "manage_content",
    description: "Can manage all content",
    resource: "content",
    action: "manage"
  }
];

export async function setupDefaultPermissions() {
  const permissions = await Promise.all(
    DEFAULT_ADMIN_PERMISSIONS.map(async perm => {
      const exists = await PermissionModel.findOne({ name: perm.name });
      if (!exists) {
        return PermissionModel.create(perm);
      }
      return exists;
    })
  );
  return permissions.map(p => p._id);
}