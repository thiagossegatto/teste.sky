import { Router } from "express";

const routeNotFound = Router();

routeNotFound.all("*", (req, res) => {
  return res.status(404).json({ mensagem: "Página não encontrada" });
});

export default routeNotFound;
