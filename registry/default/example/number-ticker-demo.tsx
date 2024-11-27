import NumberTicker from "@/registry/default/ui-canvas/number-ticker";

export default function NumberTickerDemo() {
  return (
    <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
      <NumberTicker value={100} />
    </p>
  );
}
