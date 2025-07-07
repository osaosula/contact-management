"use client";

import * as React from "react";
import Link from "next/link";
//import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"; //
type fullnameProp = {
  fullname: string | null;
};

export const NavigationHeaderMenu: React.FC<fullnameProp> = ({ fullname }) => {
  return (
    <div className="flex items-center justify-between w-full p-4 bg-gray-100 border-b border-gray-200">
      {" "}
      {/* Added some background and border to the main container */}
      {/* Message with enhanced styling */}
      <div className="flex-grow text-center font-bold text-gray-800 tracking-wide font-[family-name:var(--font-geist-mono)] ml-[20%]">
        Welcome {`${fullname !== null ? fullname + "," : ""}`} to your Contact
        Management Platform!
      </div>
      {/* Navigation Menu aligned right */}
      <div className="flex-shrink-0 pr-8">
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Contacts</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[127px] gap-1">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/contacts">View contacts</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="/contacts/add">Add new contact</Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Account</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[127px] gap-1">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/account">Update profile</Link>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <Link href="#">Change password</Link>
                    </NavigationMenuLink>
                    <form action="/auth/signout" method="post">
                      <NavigationMenuLink asChild>
                        <button type="submit">Logout</button>
                      </NavigationMenuLink>
                    </form>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};
