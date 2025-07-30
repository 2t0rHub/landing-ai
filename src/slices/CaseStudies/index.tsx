import { FC, JSX } from "react";
import { Content, isFilled } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { createClient } from "@/prismicio";
import Bounded from "@/components/bounded";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { HiH3 } from "react-icons/hi2";
import clsx from "clsx";

/**
 * Props for `CaseStudies`.
 */
export type CaseStudiesProps = SliceComponentProps<Content.CaseStudiesSlice>;

/* Fetch the studies from the repeatable zone */
const CaseStudies = async ({
  slice,
}: CaseStudiesProps): Promise<JSX.Element> => {
  const client = createClient();
  const caseStudies = await Promise.all(
    slice.primary.studies.map(async (item) => {
      if (isFilled.contentRelationship(item.case_study)) {
        return await client.getByID<Content.CaseStudyDocument>(
          item.case_study.id
        );
      }
    })
  );
  console.log(caseStudies);
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* Heading  */}
      <h2 className="max-w-2xl text-center text-5xl font-medium text-balance md:text-7xl">
        <PrismicText field={slice.primary.heading} />
      </h2>
      {/* Body */}
      <div className="prose prose-invert mx-auto mt-6 max-w-md text-center text-balance text-slate-300">
        <PrismicRichText field={slice.primary.body} />
      </div>
      {/* Case Studies list */}
      <div className="mt-20 grid gap-16">
        {caseStudies.map(
          (caseStudy, index) =>
            caseStudy && (
              <div
                key={caseStudy.id}
                className="relative grid gap-4 opacity-85 transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
              >
                {/* Company name */}
                <div className="cols-span-1 flex flex-col justify-center gap-4">
                  {/* Make sure the company name is rendered as an h3. */}
                  <h3 className="text-4xl">
                    <PrismicRichText
                      field={caseStudy.data.company}
                      components={{
                        heading1: ({ children }) => <span>{children}</span>,
                        heading2: ({ children }) => <span>{children}</span>,
                        heading3: ({ children }) => <span>{children}</span>,
                      }}
                    />
                  </h3>
                  {/* Company description */}
                  <div className="prose prose-invert max-w-md">
                    <PrismicRichText field={caseStudy.data.description} />
                  </div>
                  {/* Link to the corresponding case study page */}
                  <PrismicNextLink
                    document={caseStudy}
                    className="after:absolute after:inset-0 hover:underline"
                  >
                    Read <PrismicText field={caseStudy.data.company} /> Case
                    Study
                  </PrismicNextLink>
                </div>
                <PrismicNextImage
                  field={caseStudy.data.logo_image}
                  quality={100}
                  className={clsx(
                    "rounded-xl lg:col-span-2",
                    index % 2 && "md:-order-1"
                  )}
                />
              </div>
            )
        )}
      </div>
    </Bounded>
  );
};

export default CaseStudies;
