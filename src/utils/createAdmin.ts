import bcrypt from "bcrypt";
import mongoose, { Types } from "mongoose";

import { EAccounts } from "../enums";
import { Role, User } from "../models";

export const createAdminRole = async () => {
  const existingRole = await Role.findOne({ name: "admin" });
  if (existingRole) {
    return existingRole;
  }

  const adminRole = new Role({
    _id: new mongoose.Types.ObjectId(),
    name: "admin",
    permissions: {
      canContactSeller: true,
      canContactManager: true,
      canContactAdmin: true,
      canSaleCars: true,
      canBanUsers: true,
      canDeleteInvalidAnnoun: true,
      canChangeCarStatus: true,
      canCreateManager: true,
    },
  });

  try {
    const savedRole = await adminRole.save();
    console.log("Admin role created successfully:", savedRole);
  } catch (error) {
    console.error("Error creating admin role:", error);
  }
};

export const createAdminUser = async (roleId: Types.ObjectId) => {
  const existingUser = await User.findOne({ email: "evatafienko_a@ukr.net" });
  if (existingUser) {
    return existingUser;
  }

  try {
    const hashedPassword = await bcrypt.hash("123Password", 10);

    const adminUser = new User({
      userName: "Alona",
      email: "evatafienko_a@ukr.net",
      password: hashedPassword,
      _roleId: roleId,
      account: EAccounts.Premium,
      verify: true,
      lastVisited: Date.now(),
    });

    const savedUser = await adminUser.save();
    console.log("Admin user created successfully:", savedUser);
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

createAdminRole();
export const initializeAdmin = async () => {
  const role = await createAdminRole();
  if (role) {
    await createAdminUser(role._id);
  }
};
