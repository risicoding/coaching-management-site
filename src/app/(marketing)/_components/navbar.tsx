"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import HamburgerMenu from "./hamburger-menu";
import { useSession } from "@clerk/nextjs";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/pricing" },
  { name: "Gallery", href: "/gallery" },
  { name: "About us", href: "/about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

  return (
    <div className="fixed z-20 w-full bg-opacity-20 backdrop-blur-md">
      <nav className="mx-auto flex w-full items-center justify-between gap-4 border-2 px-8 py-4">
        <Logo />
        <div className="flex items-center gap-4">
          <NavItems items={navItems} />
          {!session.isSignedIn ? (
            <AuthButton />
          ) : (
              <Link href='/api/onboarding'>

            <Button variant="outline">Dashboard</Button>
              </Link>
          )}
          <div onClick={() => setIsOpen((prev) => !prev)} className="sm:hidden">
            <HamburgerMenu isOpen={isOpen} />
          </div>
        </div>
      </nav>

      {isOpen && <MobileMenu onClose={() => setIsOpen(false)} />}
    </div>
  );
};

const Logo = () => (
  <div className="flex gap-2">
    <Image
      src="/logo.svg"
      className=""
      width={80}
      height={30}
      alt="radison-logo"
    />
  </div>
);

const NavItems = ({ items, className, variant = "full" }: NavItemsProps) => (
  <ul
    className={cn(
      "flex items-center gap-4 text-black",
      variant === "full" ? "hidden sm:flex" : "flex-col sm:hidden",
      className,
    )}
  >
    {items.map(({ name, href }, index) => (
      <Link href={href} key={index}>
        <li>{name}</li>
      </Link>
    ))}
  </ul>
);

const AuthButton = () => (
  <Link href="/sign-in">
    <Button variant="outline" className="rounded-full border-2 border-black">
      Sign In
    </Button>
  </Link>
);

const MobileMenu = ({ onClose }: { onClose: () => void }) => (
  <div className="mx-auto mt-4 flex flex-col items-center gap-6 rounded-[30px] border border-neutral-200 bg-opacity-20 px-8 py-4 sm:hidden">
    <NavItems variant="sm" items={navItems} />
    <div className="flex gap-3">
      <Button className="rounded-full border-2 border-primary">Sign in</Button>
      <Button
        variant="outline"
        className="rounded-full border-2 border-primary bg-transparent"
      >
        Sign up
      </Button>
    </div>
  </div>
);

type NavItemsProps = {
  items: { name: string; href: string }[];
  className?: string;
  variant?: "full" | "sm";
};

export default Navbar;
