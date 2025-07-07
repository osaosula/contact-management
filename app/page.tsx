import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div className="flex items-center justify-center  bg-gray-50 p-24">
      {/* Centering container */}
      <div className="max-w-2xl text-center p-8 bg-white rounded-lg shadow-xl border border-gray-200">
        {/* Content container */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Welcome to Your Contact Management Platform!
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          This is your personalized home page. From here, you can effortlessly
          manage all your contacts. To get started, simply click on the
          &quotManage Contacts&quot link below or navigate using the
          &quot;Contacts&quot; menu in the header.
        </p>
        <Link
          href="/contacts" // Assuming you have a /contacts page to manage contacts
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-150 ease-in-out"
        >
          Manage Your Contacts
          {/* Optional: Add an icon here, e.g., using lucide-react or inline SVG */}
          <svg
            className="ml-2 -mr-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
            <path
              fillRule="evenodd"
              d="M4.293 15.707a1 1 0 010-1.414L8.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
