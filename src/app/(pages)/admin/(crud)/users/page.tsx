// pages/admin/users/page.tsx
import { UserTable } from "@/components/example/userdetails";
import React from "react";

const Page = () => {
  return (
    // <Suspense fallback={<div>Loading...</div>}>
      <div className="py-10 flex justify-center">
        <UserTable />
      </div>
    // </Suspense>
  );
};

export default Page;
