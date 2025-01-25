"use client";

import CreativeCodeDisplay from "@/registry/default/ui/creative-code-display";

const sampleCode = `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate first 10 numbers
const sequence = Array.from(
  { length: 10 }, 
  (_, i) => fibonacci(i)
);
console.log(sequence);`;

const reactCode = `import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function AnimatedCounter() {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => (c + 1) % 100);
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <motion.div
      className="relative p-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <motion.span
        className="text-4xl font-bold text-white"
        key={count}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
      >
        {count}
      </motion.span>
    </motion.div>
  );
}`;

const terminalCode = `$ npm install @ui-canvas/components
✨ Installing UI Canvas components...
  ⠋ Resolving dependencies...
  ⠙ Fetching packages...
  ⠹ Linking dependencies...
  ⠸ Building fresh packages...
  ⠼ Generating types...
  ⠴ Optimizing...
✔️ Installation complete! 

$ npm run dev
🚀 Starting development server...
  ⚡️ Compiling...
  🎨 Loading styles...
  🔥 Hot reload active
  🌈 Theme support enabled
  📱 Mobile optimization ready

[SUCCESS] Server running at http://localhost:3000
         Ready for development! 🎉`;

export default function CreativeCodeDisplayDemo() {
  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 p-4">
      {/* Default variant with TypeScript */}
      <CreativeCodeDisplay
        code={sampleCode}
        language="typescript"
        title="Fibonacci Sequence - TypeScript"
        showControls
        variant="default"
        size="default"
        showLineNumbers={false}
      />

      {/* Glass variant with React/JSX */}
      <CreativeCodeDisplay
        code={reactCode}
        language="jsx"
        variant="glass"
        title="Animated Counter Component"
        size="sm"
      />

      {/* Terminal variant */}
      <CreativeCodeDisplay
        code={terminalCode}
        language="bash"
        variant="terminal"
        showLineNumbers={false}
        title="Installation & Setup"
        size="sm"
        showControls={false}
      />
    </div>
  );
}
