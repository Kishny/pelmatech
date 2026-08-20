import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes safely, resolving conflicting utility classes.
 * Standard shadcn-ui `cn` helper.
 */
export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs));
}
