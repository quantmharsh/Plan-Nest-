import React from 'react'


type BoardProps={
    id:string ,
    setIsModalNewTaskOpen:(isOpen:boolean)=>void;
};

const taskStatus=["To Do" ,"Work In Progress" , "Under Review" , "Completed"];
const BoardView = ({id ,setIsModalNewTaskOpen}:BoardProps) => {
  return (
    <div>
      
    </div>
  )
}

export default BoardView
