import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedParams {
  id: string;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ mensagem: "Não autorizado" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ mensagem: "Token é obrigatório" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ mensagem: "Token inválido" });
  }

  jwt.verify(token, <string>process.env.SECRET, (err, decoded: any) => {
    if (err) {
      return res.status(401).json({ mensagem: "Sessão inválida" });
    }

    if (decoded && decoded.id) {
      const { id } = req.params;

      if (decoded.id !== id) {
        return res.status(401).json({ mensagem: "Não autorizado" });
      }

      req.body.user_id = decoded.id;
    }

    return next();
  });
};
