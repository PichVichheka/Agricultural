import { roleModel } from "../model/roleModel"; // ✅ matches your roleModel.ts


export const createRoleService = async (data: any) => {
  const role = new roleModel(data);
  return await role.save();
};

export const getRolesService = async () => {
  return await roleModel.find();
};

export const getRoleByIdService = async (id: string) => {
  return await roleModel.findById(id);
};

export const updateRoleService = async (id: string, data: any) => {
  return await roleModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteRoleService = async (id: string) => {
  return await roleModel.findByIdAndDelete(id);
};
