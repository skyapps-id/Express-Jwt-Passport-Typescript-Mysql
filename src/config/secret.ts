import dotenv  from "dotenv";

dotenv.config();

const config = {
  jwt_encryption: process.env.JWT_ENCRYPTION || "",
  jwt_expiration: process.env.JWT_EXPIRATION || "10m",
  bcrypt_saltRounds: Number(process.env.BCRYPT_SALTROUNDS) || 10,
};

export default config;