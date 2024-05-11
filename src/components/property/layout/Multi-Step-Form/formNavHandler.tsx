import { ReactElement, useState } from "react";
export default function MultiStepForm(args: ReactElement[]) {
  const InitialStep = 0;
  const InitialProgress = 0;
  const [currentStep, setCurrentStep] = useState(InitialStep);
  const [progress, setProgress] = useState(InitialProgress);

  const handleNextStep = () => {
    if (currentStep >= args.length - 1) {
      setProgress(progress + 100 / args.length);
      return true;
    } else {
      setCurrentStep(currentStep + 1);
      setProgress(progress + 100 / args.length);
      return false;
    }
  };

  const handleBackStep = () => {
    if (currentStep < InitialStep + 1) {
      setCurrentStep(InitialStep);
      setProgress(InitialProgress);
    } else {
      setCurrentStep(currentStep - 1);
      setProgress(progress - 100 / args.length);
    }
  };

  const SetStep = (index: number) => {
    if (index < currentStep) {
      setCurrentStep(index);
    }
  };

  return {
    handleNextStep,
    element: args[currentStep],
    handleBackStep,
    progress,
  };
}
