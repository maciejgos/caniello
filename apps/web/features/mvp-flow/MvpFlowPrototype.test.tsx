import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MvpFlowPrototype } from "./MvpFlowPrototype";

describe("MvpFlowPrototype", () => {
  it("clicks through the requested MVP flow from signup to settings", async () => {
    const user = userEvent.setup();
    render(<MvpFlowPrototype />);

    expect(
      screen.getByRole("heading", { name: /create your account/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /create account/i }));
    expect(
      screen.getByRole("heading", { name: /welcome back/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /^log in$/i }));
    expect(
      screen.getByRole("heading", { name: /welcome to caniello/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /add bruno/i }));
    expect(
      screen.getByRole("heading", { name: /documents library/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /upload document/i }));
    expect(
      screen.getByRole("heading", { name: /upload \/ scan document/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /upload pdf/i }));
    expect(
      screen.getByRole("heading", { name: /processing document/i }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /review extracted data/i }),
    );
    expect(
      screen.getByRole("heading", { name: /review & confirm extracted data/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /confirm and save/i }));
    expect(
      screen.getByRole("heading", { name: /reminders for bruno/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /create reminder/i }));
    expect(
      screen.getByRole("heading", { name: /^create reminder$/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /save reminder/i }));
    expect(
      screen.getByRole("heading", { name: /care timeline/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/reminder created: heartworm prevention/i),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /ask caniello about bruno/i }),
    );
    expect(
      screen.getByRole("heading", { name: /ask caniello/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/always follow your vet's advice/i),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /open settings/i }));
    expect(
      screen.getByRole("heading", { name: /share care summary/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /open settings/i }));
    expect(
      screen.getByRole("heading", { name: /^settings$/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /save settings/i }));
    expect(
      screen.getByText(/settings saved for this prototype session/i),
    ).toBeInTheDocument();
  });
});
