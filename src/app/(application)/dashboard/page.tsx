"use client";
import React from 'react'

const Page = () => {
  return (
    <div>Page</div>
  )
}

export default Page
// import { api } from "@/trpc/react";
// import { SubjectCard } from "@/components/subjects/subject-card";
// import { FolderOpen } from "lucide-react";
// import { InfoBar } from "@/components/info-bar";
//
// const Page = () => {
//   const { data } = useEnrolledSubject()
//
//   return (
//     <div className="space-y-4">
//       <InfoBar header="Subjects" Icon={FolderOpen} />
//       <div className="space-y-2">
//         {data?.map((sub) => (
//           <SubjectCard
//             key={sub.id}
//             id={sub.id}
//             name={sub.name}
//             classNo={12}
//             time={sub.time}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };
//
// export default Page;
