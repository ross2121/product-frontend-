import QuantityChart from "@/components/example/chart";
import React from "react";


const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
const id=(await params).id
const productid=parseInt(id,10);
  return (
    <div className="py-10 flex justify-center  ">
      <QuantityChart ProductId={productid} />
    </div>
  );
};

export default Page;
