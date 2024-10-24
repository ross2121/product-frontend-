import React from "react";
import SignUp from "@/components/example/userregister";
import { BackgroundLines } from "@/components/ui/background-lines";
const page = () => {
  return (
    <div>
        <BackgroundLines className="h-screen w-screen flex justify-center items-center">
      <SignUp />
      </BackgroundLines>
    </div>
  );
};

export default page;
