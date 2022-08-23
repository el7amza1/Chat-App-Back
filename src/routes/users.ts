import { Message } from "./../entities/Message";
import { Router } from "express";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import { auth } from "../middlewares/auth";
import { generateAuth } from "../utiles";
import { RequestAuth } from "../typies";
import { notEqual } from "assert";
import { Not } from "typeorm";

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
    const token = generateAuth(user.email);
    res.send({ user, token });
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

    const token = generateAuth(user.email);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});

router.get("/me", auth, async (req: RequestAuth, res) => {
  res.json({ user: req.user });
});

router.get("/", auth, async (req: RequestAuth, res) => {
  try {
    const userAdmin = req.user!;
    if (!userAdmin) {
      return res.status(404).send({ message: "user Admin is not found" });
    }
    const users = await User.find({
      where: { id: Not(userAdmin.id) },
      select: ["id","firstName", "lastName", "image"],
      relations: { message: true },
    });
    res.send({users:users});
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
});

export default router;
