import { InfiniteScroll } from "@/registry/default/ui/infinite-scroll";

const tags = [
  { id: "1", label: "React" },
  { id: "2", label: "TypeScript" },
  { id: "3", label: "Next.js" },
  { id: "4", label: "Tailwind" },
  { id: "5", label: "Radix UI" },
  { id: "6", label: "Framer Motion" },
  { id: "7", label: "Prisma" },
  { id: "8", label: "tRPC" },
];

export default function InfiniteScrollDemo() {
  return (
    <div className="flex w-full flex-col">
      {/* Normal direction */}
      <InfiniteScroll tags={tags} duration={20000} direction="normal" />

      {/* Reverse direction */}
      <InfiniteScroll tags={tags} duration={25000} direction="reverse" />

      {/* Faster scroll */}
      <InfiniteScroll tags={tags} duration={15000} direction="normal" />
    </div>
  );
}
