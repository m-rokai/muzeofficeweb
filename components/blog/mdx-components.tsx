import type { ComponentProps } from "react";
import Image from "next/image";
import Link from "next/link";

type AnchorProps = ComponentProps<"a">;
type ImgProps = ComponentProps<"img">;

function A({ href, children, ...props }: AnchorProps) {
  const url = href || "";
  const isInternal = url.startsWith("/") || url.startsWith("#");
  if (isInternal) {
    return (
      <Link href={url} {...(props as object)}>
        {children}
      </Link>
    );
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

function Img(props: ImgProps) {
  const { src, alt, width, height } = props;
  if (!src || typeof src !== "string") return null;

  // Local image: use next/image with fill inside a sized wrapper
  if (src.startsWith("/")) {
    return (
      <span className="my-6 block">
        <Image
          src={src}
          alt={alt || ""}
          width={Number(width) || 1200}
          height={Number(height) || 800}
          sizes="(min-width: 760px) 760px, 100vw"
          className="h-auto w-full rounded-xl"
        />
      </span>
    );
  }

  // External image fallback (shouldn't happen post-migration but safe)
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt || ""} className="h-auto w-full rounded-xl" />;
}

export const mdxComponents = {
  a: A,
  img: Img,
};
