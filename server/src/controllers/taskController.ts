import {Request , Response} from "express";
import { PrismaClient } from "@prisma/client";

const prisma= new PrismaClient();
export const getTasks=async(req:Request , res:Response) :Promise<void>=>{
    const{projectId}=req.query;
    try {
        // project is a table that we have made in schema.prisma
        const tasks = await prisma.task.findMany({
            where:{
                projectId:Number(projectId),
            },
            include:{
                author:true,
                assignee:true,
                comments:true,
                attachments:true
            }
        });
         res.json(tasks);
    } catch (error:any) {
        res.status(500).json({message:`Something went wrong while getting tasks ${error.message}`})
        
    }


}
export const createTask=async(req:Request , res:Response) :Promise<void>=>{
    const{
        title,
        description,
        status,
        priority,
        tags,
        startDate ,
        dueDate ,
        points,
        projectId,
        authorUserId,
        assignedUserId
    }=req.body;

    try {
        // project is a table that we have made in schema.prisma
        const newTask = await prisma.task.create(
            {
                data:{
                    title,
                    description,
                    status,
                    priority,
                    tags,
                    startDate ,
                    dueDate ,
                    points,
                    projectId,
                    authorUserId,
                    assignedUserId
                }
            }
        );
         res.status(201).json(newTask);
    } catch (error:any) {
        res.status(500).json({message:`Something went wrong while Creating Task ${error.message}`})
        
    }


}
export const updateTask=async(req:Request , res:Response) :Promise<void>=>{
   const {taskId}=req.params;
   const{status}=req.body;
    try {
        // project is a table that we have made in schema.prisma
        const updatedTask = await prisma.task.update({
            where:{
                id:Number(taskId)
            },
            data:{
                status:status
            }
           
        });
         res.json(updatedTask);
    } catch (error:any) {
        res.status(500).json({message:`Something went wrong while Updating tasks ${error.message}`})
        
    }


}