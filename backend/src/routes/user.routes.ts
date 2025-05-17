import { Request, Response, Router } from "express";
import { User } from "../model/User";

export const userRoutes = (): Router => {
  const router = Router();

  router.get("/getAllUsers", (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      res.status(401).send("User is not authenticated.");
    } else {
      const users = User.find();
      users
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  });

  router.get("/getUserById/:id", (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      res.status(401).send("User is not authenticated.");
    } else {
      const user = User.findById(req.params.id);
      user
        .then((data) => {
          res.status(200).send(data);
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    }
  });

  router.get("/getCurrentUser", (req: Request, res: Response) => {
    if (!req.isAuthenticated()) {
      res.status(401).send("User is not authenticated.");
    } else {
      res.status(200).send(req.user);
    }
  });

  router.put("/updateUser/:id", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) res.status(401).send("Unauthorized");
    try {
      const updated = await User.findByIdAndUpdate(
        req.params.id,
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
        },
        { new: true }
      );
      res.status(200).json(updated);
    } catch {
      res.status(500).send("Error updating project.");
    }
  });

  router.delete("/deleteUser/:id", async (req: Request, res: Response) => {
    if (!req.isAuthenticated()) res.status(401).send("Unauthorized");
    try {
      const deleted = await User.findByIdAndDelete(req.params.id);
      if (!deleted) res.status(404).send("User not found.");
      res.status(200).send("User deleted successfully.");
    } catch {
      res.status(500).send("Error deleting user.");
    }
  });

  return router;
};
