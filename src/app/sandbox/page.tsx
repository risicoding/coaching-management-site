import { AttendancePieChart } from '@/components/subjects/attendance/attendance-pie-chart'
import React from 'react'

const Page = () => {
  return (
  <AttendancePieChart present={20} totalCount={30}/>
  )
}

export default Page
