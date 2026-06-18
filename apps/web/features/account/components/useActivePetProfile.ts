import type {
  PetProfileApiResponse,
  PetProfileResponse,
} from "@caniello/contracts";
import { useEffect, useState } from "react";

type ActivePetProfileState = {
  pet: PetProfileResponse | null;
  isLoading: boolean;
  hasLoadError: boolean;
  setPet: (pet: PetProfileResponse) => void;
};

export function useActivePetProfile(): ActivePetProfileState {
  const [pet, setPetState] = useState<PetProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadError, setHasLoadError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadPetProfile() {
      try {
        const response = await fetch("/api/pets/profile");
        const body = (await response.json()) as PetProfileApiResponse;

        if (!response.ok || !body.ok) {
          throw new Error(body.message || "Pet profile load failed.");
        }

        if (isMounted) {
          setPetState(body.pet ?? null);
          setHasLoadError(false);
        }
      } catch {
        if (isMounted) setHasLoadError(true);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadPetProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    pet,
    isLoading,
    hasLoadError,
    setPet: setPetState,
  };
}
