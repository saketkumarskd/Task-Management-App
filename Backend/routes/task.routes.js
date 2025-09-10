import express from 'express';
import createTask, { deleteTask, getTasks, updateTask } from '../controller/task.controller.js';

const router=express.Router();

router.post("/create",createTask);
router.get("/fetch",getTasks)
router.put("/update/:id", updateTask)
router.delete("/delete:id",deleteTask)

export default router;