import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
