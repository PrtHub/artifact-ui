import { InfiniteScroll } from "@/registry/default/ui/infinite-scroll";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    id: "1",
    name: "Sarah Chen",
    company: "TechVision Inc",
    message:
      "The UI components are incredibly polished and the documentation is top-notch. A game-changer for our design system.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces",
    role: "Lead Designer",
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    company: "InnovateLabs",
    message:
      "Perfect balance of flexibility and ease of use. Saved us countless hours in development time.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
    role: "Senior Developer",
  },
  {
    id: "3",
    name: "Emily Thompson",
    company: "DesignCraft",
    message:
      "The attention to detail in animations and interactions is remarkable. Our clients love the results!",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces",
    role: "UX Director",
  },
  {
    id: "4",
    name: "David Kim",
    company: "StartupFlow",
    message:
      "Best-in-class components that work seamlessly together. The dark mode implementation is flawless.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
    role: "Frontend Architect",
  },
  {
    id: "5",
    name: "Alexandra Wright",
    company: "CreativeEdge",
    message:
      "The accessibility features are outstanding. Finally, a component library that takes a11y seriously!",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
    role: "Accessibility Specialist",
  },
  {
    id: "6",
    name: "James Foster",
    company: "CloudScale",
    message:
      "Impressive performance optimizations out of the box. Our load times improved significantly.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
    role: "Performance Engineer",
  },
  {
    id: "7",
    name: "Sofia Martinez",
    company: "DesignSphere",
    message:
      "The customization options are endless. We built our entire design system on top of these components.",
    avatar:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=faces",
    role: "Design Systems Lead",
  },
  {
    id: "8",
    name: "Lucas Anderson",
    company: "TechFlow",
    message:
      "Integration was a breeze. The TypeScript support is exceptional and caught many potential issues early.",
    avatar:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=faces",
    role: "Tech Lead",
  },
  {
    id: "9",
    name: "Nina Patel",
    company: "WebCraft",
    message:
      "The motion design is subtle yet effective. Creates a premium feel that our users appreciate.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=faces",
    role: "Motion Designer",
  },
  {
    id: "10",
    name: "Thomas Weber",
    company: "DevForge",
    message:
      "Excellent state management and event handling. Complex interactions become simple to implement.",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces",
    role: "Senior Frontend Dev",
  },
];

const technologies = [
  { id: "1", name: "React", icon: "⚛️", color: "bg-blue-500" },
  { id: "2", name: "TypeScript", icon: "📘", color: "bg-blue-600" },
  { id: "3", name: "Next.js", icon: "▲", color: "bg-black" },
  { id: "4", name: "Tailwind", icon: "🎨", color: "bg-cyan-500" },
  { id: "5", name: "Framer", icon: "🎭", color: "bg-purple-500" },
  { id: "6", name: "JavaScript", icon: "🔁", color: "bg-yellow-500" },
  { id: "7", name: "Node.js", icon: "🤖", color: "bg-green-500" },
  { id: "8", name: "Python", icon: "🐍", color: "bg-blue-500" },
  { id: "9", name: "React Native", icon: "🧁", color: "bg-red-500" },
];

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <div className="group relative mx-3 flex w-[350px] flex-col gap-4 rounded-xl border border-gray-200 bg-white/50 p-6 shadow-sm transition-all hover:border-purple-200 hover:bg-white hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-purple-900 dark:hover:bg-gray-900">
      <div className="flex items-start gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-purple-100 ring-offset-2 ring-offset-white transition-all group-hover:ring-purple-200 dark:ring-purple-900/20 dark:ring-offset-gray-900 dark:group-hover:ring-purple-900/30">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h4 className="font-semibold text-gray-900 dark:text-white">
            {testimonial.name}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
      </div>
      <div className="relative">
        <svg
          className="absolute -left-2 -top-2 h-6 w-6 text-purple-200 dark:text-purple-900/30"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="pl-4 text-gray-600 dark:text-gray-300">
          {testimonial.message}
        </p>
      </div>
    </div>
  );
}

const TechBadge = ({ tech }: { tech: (typeof technologies)[0] }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="mr-4 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:bg-gray-800"
  >
    <span className="flex h-8 w-8 items-center justify-center rounded-full text-lg">
      {tech.icon}
    </span>
    <span className="font-medium text-gray-800 dark:text-white">
      {tech.name}
    </span>
  </motion.div>
);

export default function InfiniteScrollDemo() {
  return (
    <div className="z-30 flex w-full flex-col gap-12 py-8">
      <div className="">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Technologies
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Powered by modern web technologies
          </p>
        </div>
        <InfiniteScroll duration={25000} direction="normal">
          {technologies.map((tech) => (
            <TechBadge key={tech.id} tech={tech} />
          ))}
        </InfiniteScroll>
        <InfiniteScroll duration={25000} direction="reverse">
          {technologies.map((tech) => (
            <TechBadge key={tech.id} tech={tech} />
          ))}
        </InfiniteScroll>
        <InfiniteScroll duration={25000} direction="normal">
          {technologies.map((tech) => (
            <TechBadge key={tech.id} tech={tech} />
          ))}
        </InfiniteScroll>
      </div>

      <div className="">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            What People Say
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Trusted by developers worldwide
          </p>
        </div>
        <InfiniteScroll duration={30000} direction="reverse">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </InfiniteScroll>
        <InfiniteScroll duration={30000} direction="normal">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
