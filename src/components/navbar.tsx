"use client";
import React from "react";
import { useState } from "react";
import WordMark from "./WordMark";
import { asLink, Client, Content } from "@prismicio/client";
import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";

import ButtonLink from "@/components/buttonlink";
import { MdMenu, MdClose } from "react-icons/md";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type NavbarProps = {
  settings: Content.SettingsDocument["data"];
};

export default function NavBar({ settings }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <nav className="px4- py-4 md:px-6 md:py-6" aria-label="Main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        {/* Navbar logo */}
        <div className="flex items-center justify-between">
          <Link className="z-50" onClick={() => setOpen(false)} href="/">
            <WordMark />
            <span className="sr-only">Glisten.ai Home Page</span>
          </Link>
          {/* Logo Icon */}
          <button
            type="button"
            className="block p-2 text-3xl text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MdMenu />
            <span className="sr-only">Open Menu</span>
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={clsx(
            "fixed top-0 right-0 bottom-0 left-0 z-40 flex flex-col items-end gap-4 bg-[#070815] pt-14 pr-4 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden",
            open ? "translate-0" : "translate-x-[100%]"
          )}
        >
          {/* Logo Icon */}
          <button
            type="button"
            className="fixed top-4 right-4 mb-4 block p-2 text-3xl text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(false)}
          >
            <MdClose />
            <span className="sr-only">Close Menu</span>
          </button>
          <div className="grid justify-end gap-8">
            {settings.navigation.map((item) => {
              if (item.cta_button) {
                return (
                  <ButtonLink
                    key={item.label}
                    field={item.link}
                    onClick={() => setOpen(false)}
                    // Accesibility features
                    aria-current={
                      pathname.includes(asLink(item.link) as string)
                        ? "page"
                        : undefined
                    }
                  >
                    {item.label}
                  </ButtonLink>
                );
              }
              return (
                <PrismicNextLink
                  key={item.label}
                  className="block px-3 text-3xl first:mt-8"
                  field={item.link}
                  onClick={() => setOpen(false)}
                  // Accesibility features
                  aria-current={
                    pathname.includes(asLink(item.link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </PrismicNextLink>
              );
            })}
          </div>
        </div>
        {/* Desktop Nav */}
        <ul className="hidden gap-6 md:flex">
          {settings.navigation.map((item) => {
            if (item.cta_button) {
              return (
                <li key={item.label}>
                  <ButtonLink
                    field={item.link}
                    // Accesibility features
                    aria-current={
                      pathname.includes(asLink(item.link) as string)
                        ? "page"
                        : undefined
                    }
                  >
                    {item.label}
                  </ButtonLink>
                </li>
              );
            }

            return (
              <li key={item.label} className="text-white hover:text-slate-400">
                <PrismicNextLink
                  className="inline-flex min-h-11 items-center"
                  field={item.link}
                  // Accesibility features
                  aria-current={
                    pathname.includes(asLink(item.link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </PrismicNextLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
