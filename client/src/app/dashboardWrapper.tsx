"use client";
import React, { useEffect } from 'react'
import  {Navbar} from "@/app/components/Navbar";
import Sidebar from './components/Sidebar';
import StoreProvider, { useAppSelector } from './redux';

const DashboardLayout = ({children}:{ children:React.ReactNode}) => {
  //from redux store getting  the current state values
  const isSidebarCollapsed=useAppSelector((state)=>state.global.isSidebarCollapsed);
  const isDarkMode=useAppSelector((state)=>state.global.isDarkMode);  
  //updating theme by adding or removing class name 
  //doing this here instead of in base layout component to avoid hydration error and cant make it client component 
useEffect(() => {
  if(isDarkMode){

    document.documentElement.classList.add("dark");
  }
  else{
    document.documentElement.classList.remove("dark");
  }
 
}, [isDarkMode])


  return (
    <div className=' flex  min-h-screen w-full bg-gray-50 text-gray-900 '>
     
       {/* sidebar component */}
       <Sidebar/>
       <main className={`dark:bg-dark-bg  flex w-full  flex-col bg-gray-50 ${ isSidebarCollapsed ?"": "md:pl-64"}`}>
        {/* navbar component  */}
      
        {/* all main , child components */}
       <Navbar/>
       <div>  {children}</div>
       </main>
    </div>
  )
}
const DashboardWrapper = ({children}:{ children:React.ReactNode}) => {
  return (
    <StoreProvider>
    <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
   
  )
}

export default DashboardWrapper
