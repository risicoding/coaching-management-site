import { AddSubjectButton } from "../../admin/_components/add-subject-button";
import { SubjectCard, SubjectCardProps } from "./subject-card";

export const SubjectsList = ({
  subjects,
}: {
  subjects: SubjectCardProps[];
}) => {
  return (
    <div className="container py-0">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.id}
            classNo={12}
            id={subject.id}
            name={subject.name}
            time={subject.time}
          />
        ))}
       <AddSubjectButton/> 
      </div>
    </div>
  );
};
