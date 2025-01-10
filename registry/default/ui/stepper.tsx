"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const stepperVariants = cva("flex w-full", {
  variants: {
    orientation: {
      horizontal: "flex-row justify-between",
      vertical: "flex-col space-y-4",
    },
    size: {
      default: "",
      sm: "text-sm",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    size: "default",
  },
});

export interface Step {
  label: string;
  description?: string;
  optional?: boolean;
  error?: boolean;
  completed?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  validate?: () => Promise<boolean> | boolean;
}

export interface StepperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperVariants> {
  currentStep: number;
  steps: Step[];
  onStepChange?: (step: number) => void;
  allowClickNavigation?: boolean;
  showStepNumbers?: boolean;
  showConnectors?: boolean;
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      className,
      currentStep,
      steps,
      orientation = "horizontal",
      size = "default",
      onStepChange,
      allowClickNavigation = true,
      showStepNumbers = true,
      showConnectors = true,
      ...props
    },
    ref,
  ) => {
    const [validationErrors, setValidationErrors] = React.useState<boolean[]>(
      [],
    );

    const handleStepClick = async (index: number) => {
      if (!allowClickNavigation || steps[index].disabled) return;

      if (index > currentStep) {
        const validations = await Promise.all(
          steps.slice(0, index).map(async (step) => {
            if (step.validate) {
              return await step.validate();
            }
            return true;
          }),
        );

        setValidationErrors(validations.map((valid) => !valid));

        if (validations.some((valid) => !valid)) {
          return;
        }
      }

      onStepChange?.(index);
      steps[index].onClick?.();
    };

    return (
      <div
        ref={ref}
        className={cn(stepperVariants({ orientation, size }), className)}
        role="navigation"
        aria-label="Progress"
        {...props}
      >
        {steps.map((step, index) => {
          const isCompleted = index < currentStep || step.completed;
          const isCurrent = index === currentStep;
          const hasError = step.error || validationErrors[index];

          return (
            <div
              key={index}
              className={cn(
                "relative flex flex-1 flex-col items-center",
                orientation === "vertical" && "flex-row space-x-4",
              )}
            >
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => handleStepClick(index)}
                  disabled={step.disabled}
                  className={cn(
                    "relative z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 text-lg font-medium transition-all duration-200",
                    {
                      "border-2 border-primary bg-primary text-primary-foreground dark:border-primary dark:bg-primary dark:text-primary-foreground":
                        isCompleted,
                      "border-2 bg-background text-primary dark:border-primary dark:bg-background dark:text-primary dark:ring-primary dark:ring-offset-background":
                        isCurrent,
                      "border-destructive bg-destructive/10 text-destructive dark:border-destructive dark:bg-destructive/20 dark:text-destructive":
                        hasError,
                      "border-muted-foreground/25 bg-background text-muted-foreground hover:border-muted-foreground/50 dark:border-muted-foreground/20 dark:bg-background dark:text-muted-foreground dark:hover:border-muted-foreground/40":
                        !isCompleted && !isCurrent && !hasError,
                      "cursor-not-allowed opacity-50": step.disabled,
                      "cursor-pointer hover:bg-muted dark:hover:bg-muted":
                        allowClickNavigation &&
                        !step.disabled &&
                        !isCompleted &&
                        !isCurrent &&
                        !hasError,
                    },
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted && !hasError ? (
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : showStepNumbers ? (
                    <span>{index + 1}</span>
                  ) : null}
                </button>

                {showConnectors && index < steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute overflow-hidden",
                      orientation === "vertical"
                        ? "left-6 top-12 h-full w-0.5"
                        : "left-[calc(50%-1px)] top-6 h-0.5 w-full",
                      index < currentStep
                        ? "bg-primary/20 dark:bg-primary/10"
                        : hasError
                          ? "bg-destructive/30 dark:bg-destructive/40"
                          : "bg-muted-foreground/25 dark:bg-muted-foreground/20",
                      "group transition-colors duration-200",
                      index < currentStep && [
                        // Primary rainbow gradient
                        "before:absolute before:inset-0 before:animate-[shimmer_3s_ease-in-out_infinite] before:bg-[length:200%_100%]",
                        "before:bg-gradient-to-r before:from-violet-600 before:via-fuchsia-600 before:to-violet-600",

                        // Secondary flowing gradient
                        "after:absolute after:inset-0 after:animate-[shimmer-reverse_2s_linear_infinite] after:bg-[length:200%_100%] after:opacity-70",
                        "after:bg-gradient-to-r after:from-cyan-500 after:via-blue-500 after:to-cyan-500",

                        // Glowing effect
                        "glow:absolute glow:inset-0 glow:animate-[pulse_2s_ease-in-out_infinite]",
                        "glow:bg-gradient-to-r glow:from-transparent glow:via-white/30 glow:to-transparent glow:blur-sm",

                        // Sparkle effect
                        "sparkle:absolute sparkle:inset-0 sparkle:animate-[sparkle_1.5s_linear_infinite]",
                        "sparkle:bg-[radial-gradient(circle_2px_at_33%_50%,white,transparent),radial-gradient(circle_2px_at_66%_50%,white,transparent)]",
                        "sparkle:opacity-30",

                        // Hover effect
                        "hover:before:animate-[shimmer_1.5s_ease-in-out_infinite]",
                        "hover:after:animate-[shimmer-reverse_1s_linear_infinite]",
                        "hover:glow:animate-[pulse_1s_ease-in-out_infinite]",
                      ],
                    )}
                    aria-hidden="true"
                  >
                    {index < currentStep && (
                      <>
                        <div className="glow absolute inset-0" />
                        <div className="sparkle absolute inset-0" />
                      </>
                    )}
                  </div>
                )}
              </div>

              <div
                className={cn("mt-4 flex flex-col items-center text-center", {
                  "items-start text-left": orientation === "vertical",
                })}
              >
                <span
                  className={cn("text-base font-semibold", {
                    "text-primary dark:text-primary": isCurrent,
                    "text-destructive dark:text-destructive": hasError,
                    "text-foreground dark:text-foreground":
                      isCompleted && !hasError,
                    "text-muted-foreground dark:text-muted-foreground":
                      !isCurrent && !hasError && !isCompleted,
                  })}
                >
                  {step.label}
                  {step.optional && (
                    <span className="ml-1 text-sm font-normal text-muted-foreground dark:text-muted-foreground">
                      (Optional)
                    </span>
                  )}
                </span>
                {step.description && (
                  <span
                    className={cn("text-sm", {
                      "text-destructive dark:text-destructive": hasError,
                      "text-muted-foreground dark:text-muted-foreground":
                        !hasError,
                    })}
                  >
                    {step.description}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);

Stepper.displayName = "Stepper";

export { Stepper, stepperVariants };
