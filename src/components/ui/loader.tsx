import { Loader2 } from "lucide-react";
export function AppLoader({ className }: { className?: string }) {
  return (
    <div
      className={
        className || "p-4 h-screen w-screen flex justify-center items-center"
      }
    >
      <Loader2 className=" size-12 animate-spin " />
    </div>
  );
}
