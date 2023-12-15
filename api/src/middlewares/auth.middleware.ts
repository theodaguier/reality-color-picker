import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "🚨 Token non fourni" });
  }

  jwt.verify(
    token,
    "votre-clé-secrète",
    (err: jwt.VerifyErrors | null, user: any) => {
      if (err) {
        return res.status(403).json({ message: "❌ Token invalide" });
      }

      if (!user.isAdmin) {
        return res
          .status(403)
          .json({ message: "🔒 Accès administrateur requis" });
      }

      next();
    }
  );
};
