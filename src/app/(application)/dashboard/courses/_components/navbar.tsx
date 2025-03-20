import { FaGraduationCap } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex items-center py-2 justify-between border-b">
      {/* Left Side: Icon + Text */}
      <div className="flex items-center gap-2">
        <FaGraduationCap className="text-md" />
        <span className="text-sm font-semibold">Courses</span>
      </div>

    </nav>
  );
};

export default Navbar;
