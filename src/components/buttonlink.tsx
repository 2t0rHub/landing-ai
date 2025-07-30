import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";

export default function ButtonLink({
  className,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={clsx(
        "relative inline-flex h-fit w-fit rounded-full border border-blue-900 bg-[#10122a] px-4 py-2 text-blue-100 transition-colors outline-none hover:border-[#7a7758] hover:bg-[#23221a] hover:text-[#c6b143] focus:ring-2",
        className
      )}
      {...restProps}
    />
  );
}
