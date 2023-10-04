import jwt from "jsonwebtoken";

const verifyUser = async (req, res) => {
  const {username, token} = req.query
      try {
        jwt.verify(
          token, 
          process.env.NEXT_PUBLIC_JWT_SECRET,
          (err) => {
            if (err) {
              console.log(err)
            } else {
              return res.status(200).json(username)
            }
          }
        );
      } catch (error) {
        console.error("Error verifying JWT:", error);
      }
    }

export default verifyUser;
