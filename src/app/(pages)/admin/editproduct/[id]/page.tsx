import React from "react";
import EditProduct from "@/components/example/updateproduct";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params; // Await `params` to access `id` properly
  
  return (
    <div className="w-full px-28 py-24">
      <EditProduct productId={id} />
    </div>
  );
};

export default Page;
