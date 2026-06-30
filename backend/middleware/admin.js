const admin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required." });
  }

  const adminEmail = process.env.ADMIN_EMAIL;

  // Check either isAdmin flag or email match
  if (req.user.isAdmin || (adminEmail && req.user.email === adminEmail)) {
    return next();
  }

  return res.status(403).json({ error: "Admin access required." });
};

export default admin;
