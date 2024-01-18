import { prisma } from "../src/utils/db";
import bcrypt from 'bcryptjs';

const seedUserAndPermissions = async () => {
    // seeding roles
    const roles = [
        "CREATE_CATEGORY",
        "CREATE_PRODUCT",
        "UPDATE_CATEGORY",
        "UPDATE_PRODUCT",
        "DELETE_CATEGORY",
        "DELETE_PRODUCT"
        ];
    await prisma.$transaction(roles.map(role => prisma.role.create({ data: { permission: role } })));
    
    // seeding users
    await prisma.$transaction([
        prisma.user.create({
            data: {
                email: "category@gmail.com",
                password: await bcrypt.hash("123456", 12),
                name: "category_user",
                roles: {
                    create: [
                        { permission: "CREATE_CATEGORY" },
                        { permission: "UPDATE_CATEGORY" },
                    ]
                }
            }}),
        prisma.user.create({
            data: {
                email: "product@gmail.com",
                password: await bcrypt.hash("123456", 12),
                name: "product_user",
                roles: {
                    create: [
                        { permission: "CREATE_PRODUCT" },
                        { permission: "UPDATE_PRODUCT" },
                    ]
                }
            }}),
        prisma.user.create({
            data: {
                email: "admin@gmail.com",
                password: await bcrypt.hash("123456", 12),
                name: "admin_user",
                roles: {
                    create: [
                        { permission: "CREATE_CATEGORY" },
                        { permission: "UPDATE_CATEGORY" },
                        { permission: "DELETE_CATEGORY" },
                        { permission: "CREATE_PRODUCT" },
                        { permission: "UPDATE_PRODUCT" },
                        { permission: "DELETE_PRODUCT" },
                    ]
                }
            }}),
    ]);
}

try {
    await seedUserAndPermissions();
} catch (error) {
    console.log(error);
} finally {
    await prisma.$disconnect();
}