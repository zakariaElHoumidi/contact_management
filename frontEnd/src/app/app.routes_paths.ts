
export const routes_paths = {
  auth: {
    root: "auth",
    children: {
      login: 'login',
      register: 'register',
      forget_password: 'forget-password',
    }
  },
  user: {
    root: "user",
    children: {
      dashboard: 'dashboard',
      profile: 'profile',
    }
  },
}
