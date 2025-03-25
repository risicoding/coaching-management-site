"use client";

import React from "react";
import InfoBar from "../../_components/info-bar";
import { CirclePlus, School } from "lucide-react";

const Page = () => {
  return (
    <div>
      <InfoBar
        icon={School}
        header="Classes"
        buttonText="Add class"
        buttonIcon={CirclePlus}
        onButtonClick={() => {
          console.log("clicked");
        }}
      />
    </div>
  );
};

export default Page;
