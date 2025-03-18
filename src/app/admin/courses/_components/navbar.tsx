import { FaGraduationCap } from "react-icons/fa";
import AddCourseDialog from "./add-course";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center py-2 justify-between border-b">
      {/* Left Side: Icon + Text */}
      <div className="flex items-center gap-2">
        <FaGraduationCap className="text-md" />
        <span className="text-sm font-semibold">Courses</span>
      </div>

      {/* Right Side: Create Button inside Dialog */}
      <AddCourseDialog>
        <Button className="flex items-center gap-2">
          Create
          <Plus className="size-1 text-sm" />
        </Button>
      </AddCourseDialog>
    </nav>
  );
};

export default Navbar;
