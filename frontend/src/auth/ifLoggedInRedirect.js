export const ifLoggedInRedirect = (to, from, next, destination) => {
  // If the user is authenticated, continue with the route
  console.log(to, from, next, destination);
  // Otherwise, continue
  next();
};
