import BeamPortal from "@/registry/default/ui/beam-portal";
import { Button } from "@/components/ui/button";

export default function BeamPortalDemo() {
  return (
    <div className="z-30 space-y-32">
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-black dark:text-white">
          Hero Section Examples
        </h2>
        <div className="grid gap-8">
          <BeamPortal
            colorScheme="aurora"
            pattern="radial"
            intensity="active"
            shimmer={true}
            className="min-h-[400px]"
          >
            <div className="max-w-2xl space-y-6 text-center">
              <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white">
                Next Generation{" "}
                <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  AI Platform
                </span>
              </h1>
              <p className="text-xl text-zinc-700 dark:text-zinc-300">
                Transform your workflow with cutting-edge artificial
                intelligence and machine learning solutions.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" variant="default">
                  Get Started
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </BeamPortal>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-black dark:text-white">
          Feature Cards
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <BeamPortal
            colorScheme="cyber"
            pattern="wave"
            intensity="calm"
            shimmer={true}
          >
            <div className="space-y-4 text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-cyan-500/20 p-2">
                <svg
                  className="h-8 w-8 text-cyan-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-cyan-400">
                Fast Processing
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300">
                Process data at lightning speed with our optimized algorithms
              </p>
            </div>
          </BeamPortal>
          <BeamPortal
            colorScheme="fire"
            pattern="pulse"
            intensity="active"
            pulse={true}
          >
            <div className="space-y-4 text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-orange-500/20 p-2">
                <svg
                  className="h-8 w-8 text-orange-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-orange-400">
                Advanced Security
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300">
                Enterprise-grade security with end-to-end encryption
              </p>
            </div>
          </BeamPortal>
          <BeamPortal
            colorScheme="frost"
            pattern="zigzag"
            intensity="calm"
            shimmer={true}
          >
            <div className="space-y-4 text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-500/20 p-2">
                <svg
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-400">
                Smart Analytics
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300">
                Gain insights with real-time data analysis
              </p>
            </div>
          </BeamPortal>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-black dark:text-white">
          Testimonials
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <BeamPortal
            colorScheme="aurora"
            pattern="wave"
            intensity="calm"
            shimmer={true}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-emerald-500/20">
                  <span className="flex h-full w-full items-center justify-center text-lg font-bold text-emerald-400">
                    JD
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-emerald-400">John Doe</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    CEO, TechCorp
                  </p>
                </div>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300">
                &quot;This platform has revolutionized how we handle our data
                processing. The speed and accuracy are unmatched.&quot;
              </p>
            </div>
          </BeamPortal>
          <BeamPortal
            colorScheme="sunset"
            pattern="pulse"
            intensity="calm"
            shimmer={true}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-orange-500/20">
                  <span className="flex h-full w-full items-center justify-center text-lg font-bold text-orange-400">
                    JS
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-orange-400">Jane Smith</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    CTO, DataFlow
                  </p>
                </div>
              </div>
              <p className="text-zinc-700 dark:text-zinc-300">
                &quot;The security features and analytics capabilities have
                exceeded our expectations. Highly recommended!&quot;
              </p>
            </div>
          </BeamPortal>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-black dark:text-white">
          Pricing Plans
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <BeamPortal
            colorScheme="frost"
            pattern="linear"
            intensity="calm"
            shimmer={true}
          >
            <div className="space-y-4 text-center">
              <h3 className="text-xl font-bold text-blue-400">Starter</h3>
              <div className="text-3xl font-bold text-black dark:text-white">
                $29/mo
              </div>
              <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                <li>5 Projects</li>
                <li>10GB Storage</li>
                <li>Basic Analytics</li>
              </ul>
              <Button className="w-full" variant="outline">
                Get Started
              </Button>
            </div>
          </BeamPortal>
          <BeamPortal
            colorScheme="cyber"
            pattern="pulse"
            intensity="active"
            pulse={true}
            shimmer={true}
          >
            <div className="space-y-4 text-center">
              <h3 className="text-xl font-bold text-cyan-400">Pro</h3>
              <div className="text-3xl font-bold text-black dark:text-white">
                $99/mo
              </div>
              <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                <li>Unlimited Projects</li>
                <li>100GB Storage</li>
                <li>Advanced Analytics</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>
          </BeamPortal>
          <BeamPortal
            colorScheme="void"
            pattern="linear"
            intensity="calm"
            shimmer={true}
          >
            <div className="space-y-4 text-center">
              <h3 className="text-xl font-bold text-purple-400">Enterprise</h3>
              <div className="text-3xl font-bold text-black dark:text-white">
                Custom
              </div>
              <ul className="space-y-2 text-zinc-700 dark:text-zinc-300">
                <li>Custom Solutions</li>
                <li>Unlimited Storage</li>
                <li>Premium Support</li>
              </ul>
              <Button className="w-full" variant="outline">
                Contact Sales
              </Button>
            </div>
          </BeamPortal>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-black dark:text-white">
          Call to Action
        </h2>
        <BeamPortal
          colorScheme="matrix"
          pattern="zigzag"
          intensity="intense"
          pulse={true}
          shimmer={true}
          className="min-h-[300px]"
        >
          <div className="max-w-2xl space-y-6 text-center">
            <h3 className="text-3xl font-bold text-green-400">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-zinc-700 dark:text-zinc-300">
              Join thousands of companies already using our platform to
              transform their business.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg">Start Free Trial</Button>
              <Button size="lg" variant="outline">
                Schedule Demo
              </Button>
            </div>
          </div>
        </BeamPortal>
      </section>

      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-black dark:text-white">
          Key Metrics
        </h2>
        <div className="grid gap-8 md:grid-cols-4">
          {[
            {
              label: "Active Users",
              value: "100K+",
              color: "cyber",
            },
            {
              label: "Data Processed",
              value: "1PB+",
              color: "fire",
            },
            {
              label: "Uptime",
              value: "99.99%",
              color: "aurora",
            },
            {
              label: "Cost Saved",
              value: "$2M+",
              color: "cosmic",
            },
          ].map((stat, index) => (
            <BeamPortal
              key={index}
              colorScheme={stat.color as any}
              pattern="pulse"
              intensity="active"
              pulse={true}
            >
              <div className="space-y-2 text-center">
                <div className="text-3xl font-bold text-black dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {stat.label}
                </div>
              </div>
            </BeamPortal>
          ))}
        </div>
      </section>
    </div>
  );
}
