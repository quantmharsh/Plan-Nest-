import { useAppSelector } from '@/app/redux';
import { useGetTasksQuery } from '@/state/api';
import { Table } from 'lucide-react';
import React from 'react'

type Props = {
    id:string ,
    setIsModalNewTaskOpen:(isOpen:boolean)=>void;
}

const TableView = ({id ,setIsModalNewTaskOpen}: Props) => {
    const isDarkMode=useAppSelector((state)=>state.global.isDarkMode);
    //getting data from hitting  our api useGetTasksQuery and passing id as an argument
 const{data:tasks ,
   error,
   isLoading
 }=useGetTasksQuery({projectId:Number(id)})
 if(isLoading)
    {
      return (
        <div> Loading...</div>
      )
    }
    if(error)
  
  {
    return (
      <div> Error</div>
    )
  } 
  return (
    <div>TableView </div>
  )
}
export default TableView;