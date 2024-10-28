import React from "react";
import EditProduct from "@/components/example/updateproductuser";

const page = async  ({ params }: { params: Promise<{ id: string }> }) => {
const id=(await params).id
// const Fid=parseInt(id,10);
  return (
    <div className="w-full px-28 py-24">
      <EditProduct productId={id} />
    </div>
  );
};

export default page;
