import jwt from "jsonwebtoken";

const verifyUser = async (req, res) => {
  const { token } = req.query;
  try {
    jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
      } else {
        return res.status(200).json(decoded.username);
      }
    });
  } catch (error) {
    console.error("Error verifying JWT:", error);
  }
};

export default verifyUser;
