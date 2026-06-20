import { render } from "@testing-library/react";
import { PetAvatar } from "./PetAvatar";

describe("PetAvatar", () => {
  it.each([
    ["dog", "dog"],
    ["cat", "cat"],
    ["other", "other"],
    ["rabbit", "other"],
    [null, "other"],
  ])("maps %s species to the %s default avatar", (species, expected) => {
    const { container } = render(<PetAvatar pet={{ name: "Luna", species }} />);

    expect(container.querySelector("img")).toHaveAttribute(
      "data-pet-avatar",
      expected,
    );
  });
});
