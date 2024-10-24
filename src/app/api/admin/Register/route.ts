"use server";

import { NextResponse } from 'next/server';
import { Register } from '@/controllers/admin';

export const POST = async (req: Request,res:Response,next:NextResponse) => {
  try {
    const response = await Register(req,res,next);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json(
      { message: 'Method not allowed', error },
      { status: 405 }
    );
  }
};
