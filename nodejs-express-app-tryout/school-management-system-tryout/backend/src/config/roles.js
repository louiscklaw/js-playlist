const allRoles = {
  user: [],
  student: [],
  teacher: ['getStudents', 'manageStudents'],
  restaurant: [],
  admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
