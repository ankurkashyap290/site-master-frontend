import { organizationSkeleton } from '../../store/skeletons';

const userReducer = {
  modelList: [],
  modelListPagination: {},
  editableModel: null,
  resetableModel: null,
  deletableModel: null,
  warningMessage: null,

  parentOrganization: organizationSkeleton,
  userRole: null,
  userRoles: null,
};

export default userReducer;
