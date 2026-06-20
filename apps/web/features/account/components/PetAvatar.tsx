import type { PetProfileResponse } from "@caniello/contracts";
import catAvatar from "../assets/pet-avatar-cat.png";
import dogAvatar from "../assets/pet-avatar-dog.png";
import otherAvatar from "../assets/pet-avatar-other.png";

type PetAvatarProps = {
  className?: string;
  pet: Pick<PetProfileResponse, "name" | "species">;
};

const avatarBySpecies = {
  cat: catAvatar,
  dog: dogAvatar,
  other: otherAvatar,
} as const;

export function PetAvatar({ className, pet }: PetAvatarProps) {
  const species =
    pet.species === "cat" || pet.species === "dog" ? pet.species : "other";
  const avatar = avatarBySpecies[species];

  return (
    <img
      alt=""
      className={className}
      data-pet-avatar={species}
      src={typeof avatar === "string" ? avatar : avatar.src}
    />
  );
}
