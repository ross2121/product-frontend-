import React from "react";
import ProductList from "@/components/example/productuser";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params; // Await `params` to access `id` properly
  
  return (
    <div className="w-full px-28 py-24">
      <ProductList productId={id} />
    </div>
  );
};

export default Page;
