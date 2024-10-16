import {Router} from 'express';
import {  createTask, getTasks, updateTask} from '../controllers/taskController';

const router=Router();
router.get('/',getTasks);
router.post("/",createTask);
router.patch("/:taskId/status" ,updateTask);
export default router;