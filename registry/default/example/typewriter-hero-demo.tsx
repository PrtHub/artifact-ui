import TypewriterHero from "@/registry/default/ui/typewriter-hero";

export default function TypewriterHeroDemo() {
  return (
    <div className="z-30 h-[350px] w-full">
      <TypewriterHero
        title="Build"
        description="Create stunning user interfaces with modern components and beautiful animations."
        words={["Faster", "Better", "Smarter", "Together", "Beautifully"]}
        typingSpeed={80}
        deletingSpeed={40}
        pauseDuration={2000}
        cursorClassName="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400"
        titleClassName="text-gray-900 dark:text-white"
        descriptionClassName="text-gray-600 dark:text-gray-300"
        typingClassName="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400"
      />
    </div>
  );
}
