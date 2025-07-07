"use client";
import { useState } from "react";

import { type User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { saveContact } from "@/utils/utility";

export default function ContactForm({ user }: { user: User | null }) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const router = useRouter();
  const user_id = user?.id;

  async function createContact({
    name,
    email,
  }: {
    name: string | null;
    email: string;
  }) {
    try {
      setLoading(true);
      if (user_id === null || user_id === undefined) throw new Error();
      if (name === null || name === undefined) throw new Error();
      if (email === null || email === undefined) throw new Error();
      const contactData = {
        id: null,
        user_id: user_id,
        email: email,
        name: name,
        created_at: "",
      };

      saveContact(contactData);

      alert("Contact saved!");
    } catch (error) {
      console.log(error);
      alert("Error saving the contact!");
    } finally {
      setLoading(false);
      router.push("/contacts");
    }
  }

  return (
    <div className="flex justify-center  min-h-fit bg-gray-50 p-8 w-full top-5">
      {/* Centering container */}
      <div className="w-full p-20 space-y-6 bg-white rounded-lg ">
        {/* Form container */}
        <h2 className="text-2xl font-bold text-gray-900">
          Enter your contact details
        </h2>
        <div className="space-y-4">
          {/* Container for form fields */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>{" "}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="space-y-4">
          {" "}
          {/* Container for buttons */}
          <Button
            className=" flex w-[400px] justify-center py-2 px-4 border border-transparent rounded-md  text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => createContact({ name, email })}
            disabled={loading}
          >
            {loading ? "Loading ..." : "Save"}
          </Button>
          <Button
            className=" flex w-[400px] justify-center py-2 px-4 border border-gray-300 rounded-md  text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            type="button"
            onClick={() => router.push("/")}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
