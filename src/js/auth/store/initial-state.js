const usersStore = {
  loginError: '',
  journeyUser: null,
  accessToken: localStorage.getItem('accessToken', ''),
  tokenTimerId: null,
  activityTimerId: null,
};

export default usersStore;
