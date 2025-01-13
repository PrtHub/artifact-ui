import React from "react";
import CosmicScene from "@/registry/default/ui/cosmic-scene";

export default function CosmicSceneDemo() {
  return (
    <div className="space-y-8">
      {/* Hero Section Example */}
      <div className="relative h-[600px] w-full">
        <CosmicScene colorScheme="sunset" overlayOpacity={0.2}>
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl">
              Transform Your Ideas
              <br />
              Into Reality
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-gray-200">
              We craft digital experiences that inspire, innovate, and elevate
              your brand to new heights. Lets create something extraordinary
              together.
            </p>
            <div className="flex gap-4">
              <button className="rounded-lg bg-white px-6 py-2.5 font-medium text-black transition hover:bg-gray-100">
                Get Started
              </button>
              <button className="rounded-lg border border-white/30 px-6 py-2.5 font-medium text-white backdrop-blur transition hover:bg-white/10">
                Learn More
              </button>
            </div>
          </div>
        </CosmicScene>
      </div>

      {/* Card with Backdrop Example */}
      <div className="grid gap-6 px-4 md:grid-cols-2">
        <div className="relative h-[400px] overflow-hidden rounded-xl">
          <CosmicScene colorScheme="ocean" size="15px">
            <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
              <h3 className="mb-2 text-2xl font-semibold">Design Services</h3>
              <p className="mb-4 text-gray-200">
                From concept to creation, we bring your vision to life with
                cutting-edge design solutions.
              </p>
              <a
                href="#"
                className="text-sm font-medium text-blue-300 hover:text-blue-200"
              >
                Explore Services →
              </a>
            </div>
          </CosmicScene>
        </div>

        <div className="relative h-[400px] overflow-hidden rounded-xl">
          <CosmicScene colorScheme="sunset" size="15px">
            <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
              <h3 className="mb-2 text-2xl font-semibold">Development</h3>
              <p className="mb-4 text-gray-200">
                Powerful, scalable solutions built with modern technologies and
                best practices.
              </p>
              <a
                href="#"
                className="text-sm font-medium text-purple-300 hover:text-purple-200"
              >
                View Projects →
              </a>
            </div>
          </CosmicScene>
        </div>
      </div>
    </div>
  );
}
