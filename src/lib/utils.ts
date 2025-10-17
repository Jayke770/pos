import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: any, method: string = "GET", payload: any) =>
  axios
    .request({ method, url, ...(payload && { data: payload }) })
    .then((e) => e.data);
