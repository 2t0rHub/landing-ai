import { FC } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";

import Image from "next/image";
import background from "./background.jpg";
import Bounded from "@/components/bounded";
import StarBackground from "./starbackground";

import AnimatedContent from "./animatedcontent";

export type IntegrationsProps = SliceComponentProps<Content.IntegrationsSlice>;

const Integrations: FC<IntegrationsProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative overflow-hidden"
    >
      <Image
        src={background}
        alt=""
        fill
        className="object-cover"
        quality={90}
      />
      <StarBackground />

      <div className="relative">
        {/* Heading  */}
        <h2 className="mx-auto max-w-2xl text-center text-5xl font-medium text-balance md:text-7xl">
          <PrismicText field={slice.primary.heading} />
        </h2>

        {/* Body */}
        <div className="prose prose-invert mx-auto mt-6 max-w-md text-center text-balance text-slate-300">
          <PrismicRichText field={slice.primary.body} />
        </div>

        {/* Animations */}
        <AnimatedContent slice={slice} />
      </div>
    </Bounded>
  );
};

export default Integrations;
