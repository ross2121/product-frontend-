import OTPPage from "@/components/example/userotp"
import { BackgroundLines } from "@/components/ui/background-lines";
import React from "react";

const page = () => {
  return (
    <div className="">
      <BackgroundLines className="h-screen w-screen flex justify-center items-center">
        <OTPPage />
      </BackgroundLines>
    </div>
  );
};

export default page;
