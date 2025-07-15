"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { saveContact } from "@/app/contacts/add/actions";
import SubmitButton from "./submit-button";
import { useActionState } from "react";
import toast from "react-hot-toast";

interface FormState {
  success: boolean | null;
  message: string;
}

export default function ContactForm() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [state, formAction] = useActionState<FormState, FormData>(saveContact, {
    success: null,
    message: "",
  });

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message);
      setName("");
      setEmail("");
      router.push("/contacts");
    } else if (state.success === false) {
      toast.error(state.message);
    }
  }, [state, router]);

  return (
    <div className="flex justify-center  min-h-fit bg-gray-50 p-8 w-full top-5">
      <div className="w-full p-20 space-y-6 bg-white rounded-lg ">
        <form action={formAction}>
          <h2 className="text-2xl font-bold text-gray-900">
            Enter your contact details
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <Input
                id="full_name"
                type="text"
                name="full_name"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <Input
                id="email"
                name="email" // Ensure name attribute matches formData.get() in Server Action
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="one@example.com"
                autoComplete="email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            {/* Container for buttons */}
            <SubmitButton
              className=" flex w-[400px] justify-center py-2 px-4 border border-transparent rounded-md  text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              formAction={formAction} // Use formAction from useActionState
            >
              Save
            </SubmitButton>
            <Button
              className=" flex w-[400px] justify-center py-2 px-4 border border-gray-300 rounded-md  text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              type="button"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
