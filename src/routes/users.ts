import { Router } from "express";
import { User } from "../entities/User";
import bcrypt from "bcrypt";

const router = Router();

router.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(404).send({ message: "data is required" });
    }
    if (password.length < 8) {
      return res
        .status(404)
        .send({ message: "password is less than 8 character" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);
    const user = User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ message: "user not found" });
    }
    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(400).send({ message: "password is not correct" });
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});

export default router;
