"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const router = useRouter();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, phone, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setPhone(data.phone);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.log(error);
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    phone,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    phone: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        phone,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      console.log(error);
      alert("Error updating the data!");
    } finally {
      setLoading(false);
      router.push("/");
    }
  }

  return (
    <div className="flex justify-center  min-h-fit bg-gray-50 p-8 w-full top-5">
      {/* Centering container */}
      <div className="w-full p-20 space-y-6 bg-white rounded-lg ">
        {/* Form container */}
        <h2 className="text-2xl font-bold text-gray-900">
          Update your account details
        </h2>
        <div className="space-y-4">
          {" "}
          {/* Container for form fields */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              value={user?.email}
              disabled
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  bg-gray-100 text-gray-600 cursor-not-allowed focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullname || ""}
              onChange={(e) => setFullname(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              id="website"
              type="url"
              value={phone || ""}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="space-y-4">
          {" "}
          {/* Container for buttons */}
          <Button
            className=" flex w-[400px] justify-center py-2 px-4 border border-transparent rounded-md  text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() =>
              updateProfile({ fullname, username, phone, avatar_url })
            }
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
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
