"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AnimatedContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  useGSAP(
    () => {
      // Accesibility feature
      if (prefersReducedMotion) {
        gsap.set(container.current, { y: 0 });
        return;
      }

      gsap.fromTo(
        container.current,
        // from
        { y: 100 },

        // to
        {
          y: 0,
          ease: "power2.inOut",
          duration: 1,
          scrollTrigger: {
            trigger: container.current,
            start: "top bottom-=40%",
            toggleActions: "play pause resume reverse",
            // uncomment for debug: markers: true,
          },
        }
      );
    },
    { scope: container }
  );

  return <div ref={container}>{children}</div>;
}
