"use client";

import { navLinks } from "@/constants";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";
import { DrawerDemo } from "./profile_drawer";
import { DropdownMenuDemo } from "./tool_dropdown";
import { ScrollArea } from "../ui/scroll-area";

const Sidebar = () => {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-2">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/logo-text.png"
            alt="logo"
            width={90}
            height={90}
          />
          <text className="text-4xl font-bold text-purple-700">ODYSSEY</text>
        </Link>

        <nav className="sidebar-nav">
          <SignedIn>
            <ScrollArea className="h-120 w-90 rounded-md border">
              <ul className="sidebar-nav_elements">
                {navLinks.slice(0, 6).map((link) => {
                  const isActive = link.route === pathname;

                  return (
                    <li
                      key={link.route}
                      className={`sidebar-nav_element group ${
                        isActive
                          ? "bg-purple-gradient text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {link.route==="New Dropdown" && <DropdownMenuDemo />}
                      <Link className="sidebar-link" href={link.route}>
                        <Image
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                          className={`${isActive && "brightness-200"}`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <ul className="sidebar-nav_elements">
                {navLinks.slice(6).map((link) => {
                  const isActive = link.route === pathname;

                  return (
                    <li
                      key={link.route}
                      className={`sidebar-nav_element group ${
                        isActive
                          ? "bg-purple-gradient text-white"
                          : "text-gray-700"
                      }`}
                    >
                      
                      <Link className="sidebar-link" href={link.route}>
                        <Image
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                          className={`${isActive && "brightness-200"}`}
                        />
                        {link.label}
                      </Link>
                      {link.dropdownItems && (
                        <ul className="dropdown flex flex-col">
                          {link.dropdownItems.map((item, index) => (
                            <li key={index}>
                              <Link className="dropdown-link" href={item.route}>
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
                <DrawerDemo />
                <li className="flex-center cursor-pointer gap-2 p-4">
                  <UserButton afterSignOutUrl="/" showName />
                </li>
              </ul>
            </ScrollArea>
          </SignedIn>

          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
