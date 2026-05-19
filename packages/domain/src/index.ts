export type PetSpecies = "dog" | "cat" | "other";

export type PetProfileSummary = {
  id: string;
  name: string;
  species: PetSpecies;
};

export function createPetProfileSummary(profile: PetProfileSummary): PetProfileSummary {
  return {
    id: profile.id,
    name: profile.name.trim(),
    species: profile.species
  };
}

