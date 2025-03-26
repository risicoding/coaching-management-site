"use client";
import { Suspense } from "react";
import SignupCard from "../_components/signup-card";

const Page = () => {
  return (
    <Suspense>
      <SignupCard />
    </Suspense>
  );
};

export default Page;
