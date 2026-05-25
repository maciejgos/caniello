import type { AccountCopy } from "../content";
import { CanielloTip } from "./CanielloTip";
import { DocumentSetupPanel } from "./DocumentSetupPanel";
import { PetSetupPanel } from "./PetSetupPanel";
import { SetupStepper, type SetupStep } from "./SetupStepper";

type FirstRunOnboardingProps = {
  copy: AccountCopy;
};

export function FirstRunOnboarding({ copy }: FirstRunOnboardingProps) {
  const steps: SetupStep[] = [
    { title: copy.onboardingStepPet, body: copy.onboardingStepPetBody, icon: "paw" },
    { title: copy.onboardingStepDocument, body: copy.onboardingStepDocumentBody, icon: "document" },
    { title: copy.onboardingStepContext, body: copy.onboardingStepContextBody, icon: "chat" }
  ];

  return (
    <div className="mt-7 space-y-6">
      <SetupStepper steps={steps} />
      <div className="grid gap-5 xl:grid-cols-[minmax(420px,0.9fr)_minmax(0,1.35fr)]">
        <PetSetupPanel copy={copy} />
        <DocumentSetupPanel copy={copy} />
      </div>
      <CanielloTip copy={copy} />
    </div>
  );
}
