const isAdmin = (
  req: { user: { isAdmin: boolean } },
  res: any,
  next: () => any
) => {
  if (req.user && req.user.isAdmin) {
    return next(); // User is admin, proceed to the next middleware/route handler
  } else {
    return res.status(403).json({ message: "Forbidden" }); // User is not an admin, return forbidden error
  }
};
