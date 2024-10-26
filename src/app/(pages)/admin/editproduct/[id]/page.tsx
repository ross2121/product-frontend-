import React from "react";
import EditProduct from "@/components/example/updateproduct";

const page = async  ({ params }: { params: Promise<{ id: string }> }) => {
const id=(await params).id
  return (
    <div className="w-full px-28 py-24">
      <EditProduct productId={id} />
    </div>
  );
};

export default page;
