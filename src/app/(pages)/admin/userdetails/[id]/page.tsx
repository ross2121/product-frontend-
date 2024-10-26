import ProductList from "@/components/example/productuser";
const  Page=async({ params }: { params: Promise<{ id: string }> }) =>{
  const id = (await params).id; 
  return <ProductList productId={id}></ProductList>
}

export default Page;




