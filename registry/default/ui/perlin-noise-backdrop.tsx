import React from "react";
import { cn } from "@/lib/utils";

interface PerlinNoiseBackdropProps
  extends React.HTMLAttributes<HTMLDivElement> {
  size?: string;
  text?: string;
}

export default function PerlinNoiseBackdrop({
  className,
  size = "20px",
  text = "Noise",
  ...props
}: PerlinNoiseBackdropProps) {
  return (
    <div
      className={cn(
        "relative h-full min-h-[400px] w-full overflow-hidden bg-[hsl(0_0%_6%)]",
        className,
      )}
      {...props}
    >
      <div
        className="absolute inset-0 h-full w-full animate-flicker"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 70%, hsla(0,0%,98%,1) 0deg, #eec32d 72.0000010728836deg, #ec4b4b 144.0000021457672deg, #709ab9 216.00000858306885deg, #4dffbf 288.0000042915344deg, hsla(0,0%,98%,1) 1turn)",
          WebkitMaskImage: `radial-gradient(circle at 50% 50%, white 2px, transparent 2.5px), url("https://assets.codepen.io/605876/noise-mask.png")`,
          WebkitMaskSize: `${size} ${size}, 256px 256px`,
          WebkitMaskPosition: "50% 50%, 256px 50%",
          WebkitMaskComposite: "intersect",
          maskImage: `radial-gradient(circle at 50% 50%, white 2px, transparent 2.5px), url("https://assets.codepen.io/605876/noise-mask.png")`,
          maskSize: `${size} ${size}, 256px 256px`,
          maskPosition: "50% 50%, 256px 50%",
          maskComposite: "intersect",
        }}
      />
      <h1 className="font-geist absolute left-1/2 top-1/2 m-0 -translate-x-1/2 -translate-y-1/2 text-[clamp(6rem,8vw+1rem,14rem)] font-[140] text-[hsl(0_0%_2%)] mix-blend-soft-light drop-shadow-[0_0_2px_white] [text-shadow:2px_2px_white]">
        {text}
      </h1>
    </div>
  );
}
