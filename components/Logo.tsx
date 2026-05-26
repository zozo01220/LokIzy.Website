import Image from "next/image";

type LogoProps = {
  variant?: "nav" | "footer";
};

const logoSizes = {
  nav: {
    width: 1187,
    height: 908,
    sizes: "131px",
  },
  footer: {
    width: 1187,
    height: 908,
    sizes: "131px",
  },
} as const;

export default function Logo({ variant = "nav" }: LogoProps) {
  const { width, height, sizes } = logoSizes[variant];
  const className = "h-[100px] w-auto shrink-0 object-contain";

  return (
    <Image
      src="/lokiz-logo.png"
      alt="LokIzy Gestion Locative"
      width={width}
      height={height}
      sizes={sizes}
      priority={variant === "nav"}
      loading={variant === "nav" ? "eager" : "lazy"}
      className={className}
    />
  );
}
