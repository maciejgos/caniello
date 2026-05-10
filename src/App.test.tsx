import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Caniello landing page", () => {
  it("renders the English mockup landing page by default", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /better care\. stronger bond/i
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /how caniello works/i })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /join waitlist/i }).length).toBeGreaterThan(0);
  });

  it("validates waitlist email before showing a thank-you message", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole("button", { name: /join waitlist/i })[0]);
    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();

    await user.type(screen.getAllByLabelText(/email address/i)[0], "owner@example.com");
    await user.click(screen.getAllByRole("button", { name: /join waitlist/i })[0]);

    expect(screen.getByText(/your interest in the first caniello version has been noted/i)).toBeInTheDocument();
  });
});
