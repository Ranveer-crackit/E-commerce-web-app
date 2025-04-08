import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
//   req.headers is an object containing all the HTTP headers sent by the client.

// .authorization refers specifically to the Authorization header — commonly used to send tokens in HTTP requests.
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // it returns the only payload value after verify of secret key
    req.user = decoded;
    //to know which user is making request
    console.log(req.user);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin only' });
  }
  next();
};
