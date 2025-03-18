import { FaGraduationCap } from "react-icons/fa";
import AddCourseDialog from "./add-course";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b p-2">
      {/* Left Side: Icon + Text */}
      <div className="flex items-center gap-2">
        <FaGraduationCap className="text-md" />
        <span className="text-sm font-semibold">Add Courses</span>
      </div>

      {/* Right Side: Create Button inside Dialog */}
      <AddCourseDialog>
        <Button>Create</Button>
      </AddCourseDialog>
    </nav>
  );
};

export default Navbar;
