import { Request, Response, NextFunction, Router } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.headers["content-type"] !== "application/json") {
    return res.status(400).json({ mensagem: "Aceito somente content-type no formato Json" });
  }
  return next();
};
