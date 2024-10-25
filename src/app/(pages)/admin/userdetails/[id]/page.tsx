
// import ProductList from "@/components/example/productu";
import ProductList from "@/components/example/productuser";
// page.tsx (Server Component)
import * as React from "react";

interface PageProps {
  params?: Promise<{ id: string }>;
  searchParams?: undefined;
}

async function Page({ params }: PageProps) {
  const resolvedParams = await params; // Await the promise
  const id = resolvedParams?.id;

  return <ProductList productId={id}></ProductList>
}

export default Page;




