"use client";
import Header from '@/app/components/Header';
import ModalNewTask from '@/app/components/ModalNewTask';
import { useAppSelector } from '@/app/redux';
import { Priority, useGetTasksByUserQuery } from '@/state/api';
import React, { useState } from 'react'

type Props = {
    priority:Priority
}

const  ReusablePriorityPage = ( {priority}: Props) => {

   const[view , setView]= useState("list");
   const[isModalNewTaskOpen , setIsModalNewTaskOpen]= useState(false);
   const userId=1;
   const {data:tasks , isLoading , isError:isTaskError} =useGetTasksByUserQuery(userId ||0 , {
    skip:userId==null
   })
   const isDarkMode= useAppSelector((state)=>state.global.isDarkMode);
   const filteredTasks= tasks?.filter((task)=>task.priority===priority);
   if(isTaskError)
   {
    return (
        <div> Error occured while fetching tasks from database</div>
    )
   }
   
  return (
    <div className="m-5 p-4">
    <ModalNewTask
      isOpen={isModalNewTaskOpen}
      onClose={() => setIsModalNewTaskOpen(false)}
    />
    <Header
      name="Priority Page"
      buttonComponent={
        <button
          className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => setIsModalNewTaskOpen(true)}
        >
          Add Task
        </button>
      }
    />
   </div>
    
  )
}

export default ReusablePriorityPage