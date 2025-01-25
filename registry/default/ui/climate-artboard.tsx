"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";

interface WeatherData {
  condition: "sunny" | "rainy" | "cloudy" | "snowy";
  temperature: number;
  humidity: number;
  windSpeed: number;
  location?: string;
  time?: string;
  forecast?: Array<{
    condition: "sunny" | "rainy" | "cloudy" | "snowy";
    temperature: number;
    time: string;
  }>;
}

interface ClimateArtboardProps {
  className?: string;
  title?: string;
  subtitle?: string;
  showDetails?: boolean;
  autoAnimate?: boolean;
  theme?: "light" | "dark" | "glass";
  apiKey?: string;
  onWeatherChange?: (weather: WeatherData) => void;
}

interface ParticleConfig {
  count: number;
  velocity: number;
  size: number;
  opacity: number;
  color: string;
  drift?: number;
}

const weatherIcons = {
  sunny: (
    <motion.svg
      key="sun"
      className="h-16 w-16"
      viewBox="0 0 24 24"
      fill="none"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="12" cy="12" r="5" fill="currentColor" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <motion.line
          key={angle}
          x1="12"
          y1="4"
          x2="12"
          y2="2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ rotate: angle, originX: "12", originY: "12" }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: angle / 360 }}
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
    </motion.svg>
  ),
  rainy: (
    <motion.svg
      key="rain"
      className="h-16 w-16"
      viewBox="0 0 24 24"
      fill="none"
      initial={{ y: -5 }}
      animate={{ y: 0 }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {[4, 10, 16].map((x, i) => (
        <motion.path
          key={i}
          d={`M${x} 15v3`}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 5, opacity: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "linear",
          }}
        />
      ))}
    </motion.svg>
  ),
  cloudy: (
    <motion.svg
      key="cloud"
      className="h-16 w-16"
      viewBox="0 0 24 24"
      fill="none"
      initial={{ x: -5 }}
      animate={{ x: 5 }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
    >
      <motion.path
        d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.svg>
  ),
  snowy: (
    <motion.svg
      key="snow"
      className="h-16 w-16"
      viewBox="0 0 24 24"
      fill="none"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.circle
          key={i}
          cx="12"
          cy="7"
          r="1"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
          transform={`rotate(${angle} 12 12)`}
        />
      ))}
    </motion.svg>
  ),
};

const particleConfigs: Record<"rainy" | "snowy", ParticleConfig> = {
  rainy: {
    count: 150,
    velocity: 15,
    size: 2,
    opacity: 0.4,
    color: "#a3c5f7",
    drift: 0,
  },
  snowy: {
    count: 80,
    velocity: 3,
    size: 4,
    opacity: 0.8,
    color: "#ffffff",
    drift: 2,
  },
};

export default function ClimateArtboard({
  className,
  title = "Weather",
  subtitle = "Dynamic content that responds to local weather",
  showDetails = true,
  autoAnimate = true,
  theme = "glass",
  apiKey,
  onWeatherChange,
}: ClimateArtboardProps) {
  const [weather, setWeather] = useState<WeatherData>({
    condition: "sunny",
    temperature: 25,
    humidity: 65,
    windSpeed: 12,
    location: "Loading...",
    time: new Date().toLocaleTimeString(),
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [particles, setParticles] = useState<
    Array<{
      x: number;
      y: number;
      velocity: number;
      drift: number;
      size: number;
      opacity: number;
    }>
  >([]);
  const { theme: systemTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(autoAnimate);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const mouseSpeedRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      const dx = x - lastMousePosition.x;
      const dy = y - lastMousePosition.y;
      mouseSpeedRef.current = Math.sqrt(dx * dx + dy * dy);

      setLastMousePosition({ x, y });
      setMousePosition({ x, y });
    },
    [lastMousePosition]
  );

  // Geolocation and Weather Data Fetching
  const fetchWeatherData = useCallback(
    async (lat: number, lon: number) => {
      if (!apiKey) {
        // Fallback to mock data if no API key
        return {
          condition: "sunny" as const,
          temperature: 25,
          humidity: 65,
          windSpeed: 12,
          location: "New York, NY",
          time: new Date().toLocaleTimeString(),
          forecast: [
            { condition: "sunny", temperature: 26, time: "14:00" },
            { condition: "cloudy", temperature: 24, time: "17:00" },
            { condition: "rainy", temperature: 22, time: "20:00" },
            { condition: "snowy", temperature: 20, time: "23:00" },
          ],
        };
      }

      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=1`
        );
        const data = await response.json();

        if (!response.ok)
          throw new Error(
            data.error?.message || "Failed to fetch weather data"
          );

        return {
          condition: mapWeatherCondition(data.current.condition.code),
          temperature: data.current.temp_c,
          humidity: data.current.humidity,
          windSpeed: data.current.wind_kph,
          location: data.location.name,
          time: new Date().toLocaleTimeString(),
          forecast: data.forecast.forecastday[0].hour
            .filter((_: any, i: number) => i % 3 === 0)
            .map((hour: any) => ({
              condition: mapWeatherCondition(hour.condition.code),
              temperature: hour.temp_c,
              time: new Date(hour.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            })),
        };
      } catch (err) {
        console.error("Weather fetch error:", err);
        throw err;
      }
    },
    [apiKey]
  );

  const getLocation = useCallback(() => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    });
  }, []);

  // Initialize weather data and geolocation
  useEffect(() => {
    const initWeather = async () => {
      try {
        setLoading(true);
        const position = await getLocation();
        const weatherData = await fetchWeatherData(
          position.coords.latitude,
          position.coords.longitude
        );
        setWeather(weatherData);
        onWeatherChange?.(weatherData);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load weather data"
        );
        console.error("Weather initialization error:", err);
      } finally {
        setLoading(false);
      }
    };

    initWeather();

    // Update time every minute
    const timeInterval = setInterval(() => {
      setWeather((prev) => ({
        ...prev,
        time: new Date().toLocaleTimeString(),
      }));
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [fetchWeatherData, getLocation, onWeatherChange]);

  // Particle system animation
  useEffect(() => {
    if (
      !canvasRef.current ||
      !isAnimating ||
      !["rainy", "snowy"].includes(weather.condition)
    ) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = particleConfigs[weather.condition as "rainy" | "snowy"];
    let animationFrame: number;

    // Resize handler
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const initParticles = () => {
      const newParticles = Array.from({ length: config.count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        velocity: Math.random() * config.velocity + config.velocity / 2,
        drift:
          weather.condition === "snowy"
            ? Math.sin(Math.random() * Math.PI * 2) * (config.drift ?? 0)
            : 0,
        size:
          weather.condition === "snowy"
            ? Math.random() * 2 + config.size
            : config.size,
        opacity: Math.random() * 0.5 + config.opacity,
      }));
      setParticles(newParticles);
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        if (weather.condition === "rainy") {
          // Rain drop effect
          ctx.beginPath();
          ctx.strokeStyle = `rgba(163, 197, 247, ${particle.opacity})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particle.x + 1, particle.y + particle.velocity / 2);
          ctx.stroke();
        } else {
          // Snow flake effect
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
          ctx.arc(
            particle.x + Math.sin(particle.y / 30) * (particle.drift || 0),
            particle.y,
            particle.size / 2,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      });

      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          y: (particle.y + particle.velocity) % canvas.height,
          x:
            weather.condition === "snowy"
              ? (particle.x +
                  Math.sin(particle.y / 30) * (particle.drift || 0) +
                  canvas.width) %
                canvas.width
              : particle.x,
        }))
      );

      animationFrame = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
    };
  }, [weather.condition, isAnimating, particles]);

  const getWeatherBackground = useCallback(() => {
    const isDark = systemTheme === "dark";
    const timeOfDay = new Date().getHours();
    const isNight = timeOfDay < 6 || timeOfDay > 18;

    switch (weather.condition) {
      case "sunny":
        return isNight
          ? "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-indigo-950 via-purple-900 to-blue-950 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.03),transparent_50%)]"
          : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-300 via-orange-100 to-sky-300 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_70%)]";
      case "rainy":
        return isDark
          ? "bg-[conic-gradient(at_bottom,_var(--tw-gradient-stops))] from-slate-950 via-blue-900 to-slate-900 after:absolute after:inset-0 after:bg-[linear-gradient(0deg,rgba(0,0,0,0.3),transparent_70%)] after:opacity-75"
          : "bg-[linear-gradient(to_left,_var(--tw-gradient-stops))] from-slate-500 via-blue-600 to-slate-700 after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(255,255,255,0.1),transparent_50%)]";
      case "cloudy":
        return isDark
          ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-zinc-900 to-slate-950 after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_70%)]"
          : "bg-[linear-gradient(to_right,_var(--tw-gradient-stops))] from-gray-300 via-slate-400 to-zinc-400 after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(255,255,255,0.15),transparent_60%)]";
      case "snowy":
        return isDark
          ? "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-blue-950 to-slate-900 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.07),transparent_60%)]"
          : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-blue-50 to-slate-200 after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.3),transparent_80%)]";
      default:
        return "bg-gradient-to-br from-blue-200 to-blue-400";
    }
  }, [weather.condition, systemTheme]);

  const getThemeStyles = () => {
    switch (theme) {
      case "light":
        return "bg-white/80 text-gray-800 shadow-lg backdrop-blur-md";
      case "dark":
        return "bg-gray-900/80 text-white shadow-lg backdrop-blur-md";
      case "glass":
      default:
        return "bg-white/10 shadow-lg backdrop-blur-md text-white border border-white/20 hover:bg-white/20 transition-colors";
    }
  };

  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Loader2 className="mx-auto mb-4 animate-spin" />
        <p className="text-gray-500">Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          "relative min-h-[400px] w-full rounded-lg bg-red-50",
          className
        )}
      >
        <div className="flex h-full flex-col items-center justify-center p-4 text-center">
          <span className="mb-2 text-3xl">⚠️</span>
          <h3 className="mb-2 text-lg font-semibold text-red-800">
            Unable to load weather data
          </h3>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "relative min-h-[400px] w-full overflow-hidden rounded-2xl shadow-2xl transition-all duration-1000",
        "before:absolute before:inset-0 before:z-0",
        "after:z-0",
        getWeatherBackground(),
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
      <motion.div
        className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {weather.condition === "rainy" && (
        <>
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.2))]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1),transparent_70%)] mix-blend-multiply"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute inset-0 bg-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.1, 0.4, 0] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatDelay: Math.random() * 8 + 5,
              ease: [0.2, 0, 0.3, 1],
            }}
          />
        </>
      )}

      {weather.condition === "cloudy" && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_70%)]"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_70%)]"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {weather.condition === "sunny" && (
        <>
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_70%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,rgba(255,255,255,0),rgba(255,255,255,0.08),rgba(255,255,255,0))]"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          {/* Sun rays effect - more subtle and natural */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: 0.4 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="from-white/8 absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b to-transparent"
                style={{
                  transformOrigin: "50% 0%",
                  transform: `rotate(${i * 30}deg)`,
                }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 4,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </>
      )}

      {/* Snowy overlay effects */}
      {weather.condition === "snowy" && (
        <>
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05),transparent_70%)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Frost effect - more subtle and crystalline */}
          <motion.div
            className="from-white/8 absolute inset-0 bg-gradient-to-b via-transparent to-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Ice crystal patterns - more delicate movement */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="via-white/8 absolute left-1/2 top-1/2 h-3 w-[0.5px] bg-gradient-to-b from-white/30 to-transparent"
                style={{
                  transformOrigin: "50% 50%",
                  transform: `rotate(${i * 60}deg)`,
                }}
                initial={{ scale: 0.9 }}
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{
                  duration: 10,
                  delay: i * 0.4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </>
      )}

      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0"
        width={800}
        height={600}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={weather.condition}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center"
        >
          {weather.location && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "absolute left-4 top-4 rounded-full px-4 py-2",
                getThemeStyles()
              )}
            >
              <span className="mr-2 inline-block animate-bounce">📍</span>
              {weather.location}
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-bold tracking-tight text-white drop-shadow-lg"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8 max-w-md text-lg text-white/90 drop-shadow"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.4,
            }}
            className="mb-6 text-white"
          >
            {weatherIcons[weather.condition]}
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "rounded-full px-6 py-2 shadow-lg transition-all duration-300",
                getThemeStyles()
              )}
            >
              {weather.temperature}°C
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "rounded-full px-6 py-2 capitalize shadow-lg transition-all duration-300",
                getThemeStyles()
              )}
            >
              {weather.condition}
            </motion.div>
            {showDetails && (
              <>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "rounded-full px-6 py-2 shadow-lg transition-all duration-300",
                    getThemeStyles()
                  )}
                >
                  <span className="mr-2 inline-block animate-pulse">💨</span>
                  {weather.windSpeed} km/h
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={cn(
                    "rounded-full px-6 py-2 shadow-lg transition-all duration-300",
                    getThemeStyles()
                  )}
                >
                  <span className="mr-2 inline-block animate-pulse">💧</span>
                  {weather.humidity}%
                </motion.div>
              </>
            )}
          </div>

          {weather.time && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "mx-auto mt-8 flex w-fit items-center gap-2 rounded-full px-6 py-2 shadow-lg",
                getThemeStyles()
              )}
            >
              <span className="text-base">🕒</span>
              <span className="text-sm font-semibold">{weather.time}</span>
            </motion.div>
          )}

          {weather.forecast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="[&::-webkit-scrollbar-track]:transparent mt-8 flex w-full gap-4 overflow-x-auto whitespace-nowrap pb-4 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200/50 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300/50 dark:[&::-webkit-scrollbar-thumb]:bg-gray-700/50 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-600/50 [&::-webkit-scrollbar]:h-0"
            >
              {weather.forecast.map((item, index) => (
                <motion.div
                  key={item.time}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "flex min-w-[100px] shrink-0 flex-col items-center rounded-xl p-4 shadow-lg",
                    getThemeStyles()
                  )}
                >
                  <span className="text-sm font-medium">{item.time}</span>
                  <span className="my-2 text-2xl">
                    {weatherIcons[item.condition]}
                  </span>
                  <span className="text-sm font-bold">
                    {item.temperature}°C
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {isHovering && (
            <>
              {weather.condition === "sunny" && (
                <motion.div
                  className="pointer-events-none absolute z-50"
                  style={{
                    left: `${((mousePosition.x + 1) / 2) * 100}%`,
                    top: `${((mousePosition.y + 1) / 2) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    className="absolute h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,220,110,0.15),transparent_70%)]"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.6, 0.8, 0.6],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              )}

              {weather.condition === "rainy" && (
                <motion.div
                  className="pointer-events-none absolute z-50"
                  style={{
                    left: `${((mousePosition.x + 1) / 2) * 100}%`,
                    top: `${((mousePosition.y + 1) / 2) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    className="absolute h-40 w-40"
                    initial={false}
                    animate={{
                      background: `radial-gradient(circle, rgba(0,0,0,${Math.min(0.2 + mouseSpeedRef.current, 0.4)}), transparent 70%)`,
                    }}
                  />
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute h-12 w-[1px] bg-gradient-to-b from-white/20 to-transparent"
                      style={{
                        left: "50%",
                        transformOrigin: "50% 0%",
                        transform: `rotate(${75 + i * 7}deg)`,
                      }}
                      animate={{
                        opacity: [0, 0.5, 0],
                        y: [-10, 20],
                      }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.08,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </motion.div>
              )}

              {weather.condition === "snowy" && (
                <motion.div
                  className="pointer-events-none absolute z-50"
                  style={{
                    left: `${((mousePosition.x + 1) / 2) * 100}%`,
                    top: `${((mousePosition.y + 1) / 2) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    className="absolute h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.1),transparent_70%)]"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute left-1/2 top-1/2 h-3 w-[0.5px] bg-gradient-to-b from-white/30 to-transparent"
                      style={{
                        transformOrigin: "50% 50%",
                        transform: `rotate(${i * 60}deg)`,
                      }}
                      animate={{
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                    />
                  ))}
                </motion.div>
              )}

              {weather.condition === "cloudy" && (
                <motion.div
                  className="pointer-events-none absolute z-50"
                  style={{
                    left: `${((mousePosition.x + 1) / 2) * 100}%`,
                    top: `${((mousePosition.y + 1) / 2) * 100}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    className="absolute h-40 w-40"
                    animate={{
                      background: [
                        "radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)",
                        "radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)",
                        "radial-gradient(circle, rgba(255,255,255,0.1), transparent 70%)",
                      ],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute h-24 w-24 rounded-full bg-gradient-to-b from-white/5 to-transparent"
                    animate={{
                      x: [-20, 20, -20],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function mapWeatherCondition(
  code: number
): "sunny" | "rainy" | "cloudy" | "snowy" {
  if (code >= 1000 && code < 2000) return "sunny";
  if (code >= 2000 && code < 3000) return "cloudy";
  if (code >= 3000 && code < 4000) return "rainy";
  if (code >= 6000 && code < 7000) return "snowy";
  return "cloudy";
}
