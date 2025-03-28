"use client";

import Image from "next/image";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import HamburgerMenu from "./hamburger-menu";
import { IoMdArrowRoundUp } from "react-icons/io";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
  { name: "About us", href: "/about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed z-20 w-full bg-black bg-opacity-20 backdrop-blur-md border border-neutral-800">
      <nav className="mx-auto flex w-full items-center justify-between gap-4 px-8 py-4">
        <Logo />
        <NavItems items={navItems} />
        <AuthButton />
        <div onClick={() => setIsOpen((prev) => !prev)} className="sm:hidden">
          <HamburgerMenu isOpen={isOpen} />
        </div>
      </nav>

      {isOpen && <MobileMenu onClose={() => setIsOpen(false)} />}
    </div>
  );
};

const Logo = () => (
  <div className="flex gap-2">
    <Image src="/logo.svg" width={20} height={20} alt="radison-logo" />
    <span className="hidden sm:flex text-md font-semibold">Radison</span>
  </div>
);

const NavItems = ({ items, className, variant = "full" }: NavItemsProps) => (
  <ul
    className={cn(
      "flex items-center gap-4 text-neutral-300",
      variant === "full" ? "hidden sm:flex" : "flex-col sm:hidden",
      className
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
  <Button className="hidden rounded-full border-2 border-primary bg-transparent sm:flex">
    Sign In
  </Button>
);

const MobileMenu = ({ onClose }: { onClose: () => void }) => (
  <div className="mx-auto mt-4 flex flex-col items-center gap-6 rounded-[30px] border border-neutral-800 bg-black bg-opacity-20 px-8 py-4 sm:hidden">
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

