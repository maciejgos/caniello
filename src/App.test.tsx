import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Caniello landing page", () => {
  it("renders the Polish landing page by default", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /lepsza opieka\. silniejsza więź/i
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "PL" })).toHaveAttribute("aria-pressed", "true");
  });

  it("switches from Polish to English", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(
      screen.getByRole("heading", {
        name: /better care\. stronger bond/i
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute("aria-pressed", "true");
  });

  it("validates waitlist email before showing a thank-you message", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole("button", { name: /zapisz mnie na listę/i })[0]);
    expect(screen.getByText(/wpisz poprawny adres email/i)).toBeInTheDocument();

    await user.type(screen.getAllByLabelText(/adres email/i)[0], "ola@example.com");
    await user.click(screen.getAllByRole("button", { name: /zapisz mnie na listę/i })[0]);

    expect(screen.getByText(/zapisaliśmy twoje zainteresowanie/i)).toBeInTheDocument();
  });
});
