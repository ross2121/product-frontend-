import React from "react";
import EditProduct from "@/components/example/updateproduct";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full px-28 py-24">
      <EditProduct productId={params.id} />
    </div>
  );
};

export default page;
