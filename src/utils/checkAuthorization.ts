import { prisma } from "./db"
import { errorFactory } from "./errorFactory";

// Check if user has permission and throw error if not allowed 
export const checkAuthorization = async (userId: number, permission: string) => {
  const isUserRoleExist = await prisma.userRole.findUnique({
    where: {
        permission_userId: {permission, userId},
    }
  });

  if(!isUserRoleExist) throw errorFactory("Permission is not allowed", 401);
}