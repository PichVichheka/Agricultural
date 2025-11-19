import Role from "../model/roleModel";

export const createRoleService = async (data: any) => {
  const role = new Role(data);
  return await role.save();
};

export const getRolesService = async () => {
  return await Role.find();
};

export const getRoleByIdService = async (id: string) => {
  return await Role.findById(id);
};

export const updateRoleService = async (id: string, data: any) => {
  return await Role.findByIdAndUpdate(id, data, { new: true });
};

export const deleteRoleService = async (id: string) => {
  return await Role.findByIdAndDelete(id);
};
