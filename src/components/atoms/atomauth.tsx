"use client"
import { atom } from "recoil";

interface AuthState {
  isAuthenticated: boolean;
  user: unknown;  // Replace `any` with the actual type of your user object if available
  token: string | null;
  role:string| null
}

export const authState = atom<AuthState>({
  key: "authState",
  default: {
    isAuthenticated: false,
    token: null,
	user:null,
	role:"Customer"
  },
});

