import MotionText from "@/registry/default/ui/motion-text";

export default function MotionTextDemo() {
  return (
    <div className="z-30 flex h-[400px] flex-col items-start justify-center space-y-16">
      <div>
        {/* <h3 className="mb-4 text-lg font-medium">Fade Effect</h3> */}
        <div className="text-5xl font-bold">
          <MotionText
            text="Character by Character Fade In"
            effect="fade"
            stagger={0.1}
          />
        </div>
      </div>

      <div>
        {/* <h3 className="mb-4 text-lg font-medium">Glitch Effect</h3> */}
        <div className="font-mono text-5xl font-bold text-purple-600">
          <MotionText
            text="Individual Character Glitch Effect"
            effect="glitch"
            stagger={0.02}
          />
        </div>
      </div>

      <div>
        {/* <h3 className="mb-4 text-lg font-medium">Slide Effect</h3> */}
        <div className="text-5xl font-bold text-green-500">
          <MotionText
            text="Characters Sliding One By One"
            effect="slide"
            stagger={0.08}
          />
        </div>
      </div>
    </div>
  );
}
