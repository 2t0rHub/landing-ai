import { Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { PrismicText, SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import Bounded from "@/components/bounded";
import StarGrid from "@/components/stargrid";
import { PrismicNextImage } from "@prismicio/next";

// Parameters received from the URL
type Params = { uid: string };

// Fetch the case study page
export default async function Page({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("case_study", uid).catch(() => notFound());

  // Render the case study page with the slices
  return (
    <Bounded as="article">
      <div className="relative grid place-items-center text-center">
        <StarGrid />
        {/* Company name */}
        <h1 className="text-7xl font-medium">
          <PrismicText field={page.data.company} />
          <p className="text-lg text-yellow-500"> Case study</p>
        </h1>
        {/* Description */}
        <p className="mt-8 mb-4 max-w-xl text-lg text-slate-300">
          <PrismicText field={page.data.description} />
        </p>
        {/* Logo */}
        <PrismicNextImage
          field={page.data.logo_image}
          quality={100}
          className="rounded-lg"
        />
      </div>
      <div className="mx-auto">
        <SliceZone slices={page.data.slices} components={components} />
      </div>
    </Bounded>
  );
}

// Generate metadata for the case study page
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("case_study", uid).catch(() => notFound());

  // Generate metadata for the case study page
  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

// Generate static params for the case study page
export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("case_study");

  return pages.map((page) => ({ uid: page.uid }));
}
