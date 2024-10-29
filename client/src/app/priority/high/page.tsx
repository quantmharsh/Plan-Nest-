import React from 'react'
import ReusablePriorityPage from '../reusablePriorityPage'
import { Priority } from '@/state/api'

type Props = {}

const High = (props: Props) => {
  return (

     <div>


   <ReusablePriorityPage priority={Priority.High} />
   High Priority task  page 
   </div>
  )
}

export default  High 