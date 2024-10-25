"use client";
import React from "react";
import { RecoilRoot } from "recoil";
import { Createproduct } from "@/components/example/createproductIM";
// import ProtectedRoute from "@/components/atoms/protecting";

// import CreateCinemaPage from "@/components/temp/createc";
function Cinema() {
  return (
    <RecoilRoot>
      {/* <ProtectedRoute requiredRole="Customer">
     
      </ProtectedRoute> */}
        <div className="flex justify-center items-center ">
     <Createproduct>
     </Createproduct>
     </div>
    </RecoilRoot>
  );
}
export default Cinema;
