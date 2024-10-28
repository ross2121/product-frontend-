// src/app/(pages)/admin/listproduct/page.tsx
"use client";

import React from "react";
import { withAuth } from "./useauth";

function ListProductPage() {
  return <div>List of Products</div>;
}

export default withAuth(ListProductPage, "admin");
