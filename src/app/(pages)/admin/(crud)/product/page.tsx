import React,{Suspense} from "react";
import CreateProduct  from "@/components/example/createproduct";

const Page:React.FC=()=> {
  return (
    <Suspense fallback={<div>Loading...</div>}>
<div className="flex justify-center items-center ">
  

        <CreateProduct />
   
</div>
</Suspense>

  );
}
export default Page
