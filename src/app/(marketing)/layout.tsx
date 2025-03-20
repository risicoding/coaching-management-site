import Navbar from "./_components/navbar";
import React from "react";

const Layout = ({ children }: { children:React.ReactNode }) => {
  return <div>
<Navbar/>
    {children}</div>;
};

export default Layout;
