import { Response, Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Users, { IUserDocument } from "../models/Users";

export default {
  async sigIn(req: Request, res: Response) {
    const { email, senha } = req.body;

    let user = <IUserDocument>await Users.findOne({ email }).select("+senha");
    if (!user) {
      return res.status(401).send({ mensagem: "Usuário e/ou senha inválidos" });
    }

    if (user.senha && !(await bcrypt.compare(senha, user.senha))) {
      return res.status(401).send({ mensagem: "Usuário e/ou senha inválidos" });
    }

    user.senha = undefined;

    const token = generateToken({ id: user.id });

    user = user.toJSON();
    return res.status(200).json({ ...user, token });
  },

  async signUp(req: Request, res: Response) {
    const { nome, email, senha, telefones } = req.body;
    if (await Users.findOne({ email })) {
      return res.status(400).json({ mensagem: "E-mail já existente" });
    }
    let user = <IUserDocument>await Users.create({ nome, email, senha, telefones });

    // await Promise.all(
    //   telefones.map(async (phone: IPhone) => {
    //     const phoneSaved = <IPhone>await Phone.create({ ...phone, user: user._id });
    //     console.log(phoneSaved);
    //     user.telefones = [];
    //     user.telefones.push(phoneSaved);
    //   })
    // );

    user = user.toJSON();
    user.senha = undefined;

    const token = generateToken({ id: user.id });
    return res.status(201).json({ ...user, token });
  },

  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await Users.findById(id);
    return res.status(200).json(user);
  },
};

function generateToken(params = {}) {
  return jwt.sign(params, <string>process.env.SECRET, {
    expiresIn: 1800,
  });
}
