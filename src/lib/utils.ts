import axios from "axios";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetcher = (url: any, method: string = "GET", payload: any) => axios.request({ method, url, ...(payload && { data: payload }) }).then(e => e.data);