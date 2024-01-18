import express from "express";
import usersController from "../controllers/userController.js";

const router = express.Router();

router.get("/", usersController.getUsers).post("/", usersController.createUser);

router
  .get("/:id", usersController.getUser)
  .delete("/:id", usersController.deleteUser)
  .put("/:id", usersController.updateUser);

// dummy post to add data to the db
router.post("/all", usersController.addAll);

export default router;
