"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface ArtisticNavigationProps {
  items: NavItem[];
  className?: string;
}

export default function ArtisticNavigation({
  items,
  className = "",
}: ArtisticNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const { scrollYProgress } = useScroll();

  const brushStrokeScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.1, 1.05],
  );
  const brushStrokeRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 5, -2],
  );
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.15, 0.2, 0.25],
  );
  const navScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1]);
  const navY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -4, -2]);
  const blurStrength = useTransform(scrollYProgress, [0, 1], [0, 2]);

  const floatingAnimation = {
    y: [0, -8, 0],
    rotate: [0, 0.5, 0],
    scale: [1, 1.02, 1],
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const inkDropVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      filter: "blur(0px)",
    },
    animate: {
      scale: 1,
      opacity: [0, 0.8, 0],
      filter: "blur(10px)",
      transition: {
        scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 1.2, times: [0, 0.2, 1] },
        filter: { duration: 0.8 },
      },
    },
    exit: {
      scale: 1.2,
      opacity: 0,
      filter: "blur(20px)",
      transition: { duration: 0.5 },
    },
  };

  const springConfig = { stiffness: 150, damping: 15 };
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  const getMagneticValues = (index: number) => {
    if (!itemRefs.current[index] || hoveredIndex !== index)
      return { x: 0, y: 0, rotateX: 0, rotateY: 0 };

    const rect = itemRefs.current[index]!.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = mousePosition.x - centerX;
    const deltaY = mousePosition.y - centerY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = 100;

    if (distance > maxDistance) return { x: 0, y: 0, rotateX: 0, rotateY: 0 };

    const strength = (maxDistance - distance) / maxDistance;

    return {
      x: deltaX * 0.2 * strength,
      y: deltaY * 0.2 * strength,
      rotateX: (deltaY / maxDistance) * 20 * strength,
      rotateY: -(deltaX / maxDistance) * 20 * strength,
    };
  };

  return (
    <motion.nav
      ref={containerRef}
      className={`fixed inset-x-0 top-4 z-50 mx-auto max-w-2xl py-3${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ y: navY }}
    >
      <motion.div
        className="absolute -inset-6 rounded-2xl bg-background/20 backdrop-blur-xl dark:bg-background/10"
        animate={floatingAnimation}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="bg-gradient-radial absolute -inset-2 rounded-xl from-primary/20 via-primary/5 to-transparent opacity-75 dark:from-primary/10 dark:via-primary/5"
        animate={{
          ...floatingAnimation,
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute -inset-[1px] rounded-xl"
        style={{
          background:
            "linear-gradient(45deg, transparent, var(--primary), transparent)",
          opacity: 0.1,
          filter: "blur(1px)",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-background/90 via-background/70 to-background/90 backdrop-blur-[1px] dark:from-background/80 dark:via-background/60 dark:to-background/80"
        style={{
          scale: brushStrokeScale,
          rotate: brushStrokeRotate,
          opacity: backgroundOpacity,
          filter: `blur(${blurStrength}px)`,
        }}
      />

      <motion.div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent dark:via-primary/20"
        style={{ opacity: backgroundOpacity }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.ul
        className="relative flex items-center justify-center gap-12"
        style={{ scale: navScale }}
      >
        {items.map((item, index) => {
          const magneticValues = getMagneticValues(index);

          return (
            <motion.li
              key={item.label}
              ref={(el) => (itemRefs.current[index] = el)}
              variants={itemVariants}
              onMouseEnter={() => {
                setX(magneticValues.x);
                setY(magneticValues.y);
                setRotateX(magneticValues.rotateX);
                setRotateY(magneticValues.rotateY);
                setHoveredIndex(index);
              }}
              onMouseLeave={() => {
                setX(0);
                setY(0);
                setRotateX(0);
                setRotateY(0);
                setHoveredIndex(null);
              }}
              style={{
                x: springX,
                y: springY,
                rotateX: springRotateX,
                rotateY: springRotateY,
              }}
              initial="rest"
              whileHover="hover"
              animate={hoveredIndex === index ? "hover" : "rest"}
            >
              <motion.a
                href={item.href}
                className="group relative flex flex-col items-center gap-3 text-foreground/70 transition-colors hover:text-foreground dark:text-foreground/60 dark:hover:text-foreground"
                whileHover={{
                  scale: 1.1,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
              >
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute -inset-4 rounded-full bg-primary/20"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={inkDropVariants}
                    style={{
                      background: `radial-gradient(circle, var(--primary) 0%, transparent 70%)`,
                    }}
                  />
                )}
                {item.icon && (
                  <motion.div
                    className="relative text-2xl"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {item.icon}
                  </motion.div>
                )}
                <span className="relative text-sm font-medium tracking-wide">
                  {item.label}
                </span>
              </motion.a>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.nav>
  );
}
