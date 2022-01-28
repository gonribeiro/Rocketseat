export default {
  jwt: {
    secret: (process.env.JWT_SECRET as string) || "ignite",
    expiresIn: "1d",
  },
};
