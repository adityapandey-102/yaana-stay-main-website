import Image from "next/image";

type Props = {
  className?: string;
  imageClassName?: string;
  opacityClassName?: string;
};

export function LavenderWallpaper({
  className = "",
  imageClassName = "",
  opacityClassName = "opacity-20",
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      <Image
        src="/assets/flower-cutouts/wallpaper.png"
        alt=""
        fill
        sizes="100vw"
        className={`select-none object-cover object-center ${opacityClassName} ${imageClassName}`}
      />
    </div>
  );
}
