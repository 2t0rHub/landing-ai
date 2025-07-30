import { FC } from "react";
import { Content } from "@prismicio/client";
import { PiArrowsClockwise, PiGear, PiStarFourDuotone } from "react-icons/pi";

import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import Bounded from "@/components/bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import ButtonLink from "@/components/buttonlink";
import clsx from "clsx";

const icons = {
  gear: <PiGear />,
  cycle: <PiArrowsClockwise />,
  star: <PiStarFourDuotone />,
};

/**
 * Props for `Showcase`.
 */
export type HeroWithCodeAndCtaProps =
  SliceComponentProps<Content.HeroWithCodeAndCtaSlice>;

const HeroWithCodeAndCta: FC<HeroWithCodeAndCtaProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
    >
      <div className="glow absolute -z-10 aspect-square w-full max-w-xl rounded-full bg-blue-400/30 blur-3xl filter" />

      {/* Heading */}
      <PrismicRichText
        field={slice.primary.heading}
        components={{
          heading2: ({ children }) => (
            <h2 className="text-center text-5xl font-medium text-balance md:text-7xl">
              {children}
            </h2>
          ),
        }}
      />

      {/* Showcase */}
      <div className="mt-16 grid items-center gap-8 rounded-xl border border-blue-50/20 bg-gradient-to-b from-slate-50/15 to-slate-50/5 px-8 py-8 backdrop-blur-sm lg:grid-cols-3 lg:gap-0 lg:py-12">
        <div>
          {/* Icon */}
          <div className="w-fit rounded-lg bg-blue-500/35 p-4 text-3xl">
            <>
              {slice.primary.icon &&
                icons[slice.primary.icon as keyof typeof icons]}
            </>
          </div>

          {/* Title */}
          <div className="mt-6 text-2xl font-normal">
            <PrismicRichText field={slice.primary.title} />
          </div>

          {/* Body */}
          <div className="prose prose-invert mt-4 max-w-xl">
            <PrismicRichText field={slice.primary.body} />
          </div>

          {/* Button */}
          <ButtonLink
            field={slice.primary.button_link || "Learn More"}
            className="mt-6"
          >
            {slice.primary.button_label}
          </ButtonLink>
        </div>
        <PrismicNextImage
          field={slice.primary.image}
          className={clsx(
            "opacity-90 shadow-2xl lg:col-span-2 lg:pt-0",
            "lg:-order-1 lg:translate-x-[-15%]"
          )}
        />
      </div>
    </Bounded>
  );
};

export default HeroWithCodeAndCta;
