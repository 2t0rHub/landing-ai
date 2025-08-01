"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import StylizedLogoMark from "./stylizedlogomark";
import clsx from "clsx";
import { Content } from "@prismicio/client";
import {
  FaCloudflare,
  FaDigitalOcean,
  FaNpm,
  FaGithub,
  FaFigma,
  FaFly,
} from "react-icons/fa6";

export default function AnimatedContent({
  slice,
}: {
  slice: Content.IntegrationsSlice;
}) {
  // GSAP
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP);

  const icons = {
    cloudflare: <FaCloudflare />,
    digitalocean: <FaDigitalOcean />,
    npm: <FaNpm />,
    github: <FaGithub />,
    figma: <FaFigma />,
    fly: <FaFly />,
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "power2.inOut" },
      });
      // Pulsing logo
      tl.to(".pulsing-logo", {
        keyframes: [
          {
            filter: "brightness(2)",
            opacity: 1,
            duration: 0.4,
            ease: "power2.in",
          },
          {
            filter: "brightness(1)",
            opacity: 0.7,
            duration: 0.9,
          },
        ],
      });
      // Signal lines
      tl.to(
        ".signal-line",
        {
          keyframes: [
            {
              backgroundPosition: "0% 0%",
            },
            {
              backgroundPosition: "100% 100%",
              stagger: {
                from: "center",
                each: 0.3,
              },
              duration: 1,
            },
          ],
        },
        "-=1.6"
      );
      // Icons
      tl.to(
        ".pulsing-icon",
        {
          keyframes: [
            {
              opacity: 1,
              duration: 1,
              stagger: {
                from: "center",
                each: 0.3,
              },
            },
            {
              opacity: 0.4,
              duration: 1,
              stagger: {
                from: "center",
                each: 0.3,
              },
            },
          ],
        },
        "-=2"
      );
    },
    { scope: container }
  );
  return (
    <div
      ref={container}
      className="mt-20 flex flex-col items-center md:flex-row"
    >
      {slice.primary.icons.map((item, index) => (
        <React.Fragment key={index}>
          {index == Math.floor(slice.primary.icons.length / 2) && (
            <>
              <StylizedLogoMark />
              <div className="signal-line rotate-180 bg-gradient-to-t" />
            </>
          )}
          <div className="pulsing-icon flex aspect-square shrink-0 items-center justify-center rounded-full border border-blue-50 bg-blue-50/25 p-3 text-3xl text-blue-100 opacity-40 md:text-4xl lg:text-5xl">
            {item.icon && icons[item.icon]}
          </div>
          {index !== slice.primary.icons.length - 1 && (
            <div
              className={clsx(
                "signal-line",
                index >= Math.floor(slice.primary.icons.length / 2)
                  ? "rotate-180"
                  : "rotate-0"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
