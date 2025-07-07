"use client";

import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("c");
  const errorMessage = searchParams.get("m");

  return (
    <div>
      <div className="flex flex-col items-center justify-center mx-auto my-3 text-red-600">
        <h2>Sorry, something went wrong</h2>;
        <div>
          {errorCode} : {errorMessage}
        </div>
        <Button>Try again</Button>
      </div>
    </div>
  );
}
