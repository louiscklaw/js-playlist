const allRoles = {
  user: ['getUsers'],
  admin: ['getUsers', 'manageUsers'],
};

const chargingPlan = [
  'startup',
  'standard',
  'business'
];
const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
  chargingPlan,
};
