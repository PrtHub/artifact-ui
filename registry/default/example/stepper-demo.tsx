"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Stepper } from "@/registry/default/xanthic/stepper";

const steps = [
  {
    label: "Account Details",
    description: "Enter your account information",
  },
  {
    label: "Personal Info",
    description: "Tell us about yourself",
  },
  {
    label: "Review",
    description: "Review your information",
    optional: true,
  },
];

export default function StepperDemo() {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div className="relative w-full max-w-3xl space-y-8 p-8">
      <Stepper
        currentStep={currentStep}
        steps={steps}
        className="mx-auto w-full max-w-2xl"
      />

      <div className="z-50 flex justify-between pt-4">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
          }
          disabled={currentStep === steps.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
