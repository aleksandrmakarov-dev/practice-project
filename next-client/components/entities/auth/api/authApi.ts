export const authKeys = {
  auth: {
    root: ["auth"],
  },
  mutations: {
    signUpLocal: () => [...authKeys.auth.root, "sign-up-local"],
    signInLocal: () => [...authKeys.auth.root, "sign-in-local"],
    forgotPassword: () => [...authKeys.auth.root, "forgot-password"],
    resetPassword: () => [...authKeys.auth.root, "reset-password"],
  },
};