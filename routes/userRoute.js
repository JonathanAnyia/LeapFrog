import express from "express";
const router = express.Router()
import { deleteAllUsers,deleteSingleUser,getAllUsers,getSingleUser,updateUser } from "../../controllers/usercontroller.js";


router.get("/", getAllUsers)
router.get("/:id",getSingleUser)
router.delete("/delete", deleteAllUsers)
router.patch('/update/:id', updateUser)
router.delete("/delete/:id", deleteSingleUser)

export default router;