import policies from '../../config/policies';
import { rolesGetNameById } from '../../config/roles';

class User {
  constructor() {
    this.isAllowed = this.isAllowed.bind(this);
  }

  isAllowed(action, module) {
    // Does it have a policy for the module?
    const role = rolesGetNameById(this.attributes.role_id);
    if (policies[module] === undefined || policies[module][role] === undefined) {
      return false;
    }

    // Does it have a permission for the role?
    const permissions = policies[module][role];
    if (permissions.includes(action) || permissions.includes('*')) {
      return true;
    }

    // Does it have any custom policies?
    const entities =
      permissions
        .map((permission) => {
          const matches = permission.match(/custom:(.+)/);
          return matches ? matches[1] : null;
        })
        .filter(entity => entity !== null);

    for (let i = 0; i < this.attributes.policies.length; i += 1) {
      const customPolicy = this.attributes.policies[i];
      if (entities.includes(customPolicy.entity) && customPolicy[action]) {
        return true;
      }
    }

    return false;
  }
}

export default User;
