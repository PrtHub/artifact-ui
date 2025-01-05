import PrismHero from "@/registry/default/ui/prism-hero";

export default function PrismHeroDemo() {
  return (
    <div className="w-full">
      <PrismHero
        texts={[
          "Design with Purpose",
          "Create with Passion",
          "Build the Future",
          "Artifact UI",
        ]}
        animationStyle="typing"
        backgroundColors={[
          "rgba(17, 24, 39, 0.8)",
          "rgba(31, 41, 55, 0.85)",
          "rgba(55, 65, 81, 0.9)",
          "rgba(75, 85, 99, 0.95)",
        ]}
        overlayColor="rgba(129, 140, 248, 0.3)"
        textGradient={{
          from: "#ffffff",
          to: "#e2e8f0",
        }}
      />
    </div>
  );
}
