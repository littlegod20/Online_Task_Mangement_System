interface PermissionProps {
  [key: string]: string[];
}

export const PERMISSIONS: PermissionProps = {
  user: [
    "create:own_tasks",
    "update:own_tasks",
    "delete:own_tasks",
    "view:own_tasks",
  ],
  admin: ["update:all_tasks", "delete:all_tasks", "view:all_tasks"],
};
