"use client";

import { Suspense } from "react";
import LoginCard from "../_components/login-card";

const Page = () => {
  return (
    <Suspense>
      <LoginCard />;
    </Suspense>
  );
};

export default Page;
