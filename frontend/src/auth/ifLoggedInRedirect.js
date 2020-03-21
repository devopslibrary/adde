import { getInstance } from "./index";

export const ifLoggedInRedirect = (to, from, next, destination) => {
  const authService = getInstance();
  const fn = () => {
    // If the user is authenticated, continue with the route
    if (authService.isAuthenticated) {
      return next(destination);
    }
    // Otherwise, continue
    next();
  };

  // If loading has already finished, check our auth state using `fn()`
  if (!authService.loading) {
    return fn();
  }

  // Watch for the loading property to change before we check isAuthenticated
  authService.$watch("loading", loading => {
    if (loading === false) {
      return fn();
    }
  });
};
