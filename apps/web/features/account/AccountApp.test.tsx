import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AccountApp } from "./AccountApp";
import { accountCopy } from "./content";

describe("Caniello account experience", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ ok: true, status: "ok" }), { status: 200, headers: { "Content-Type": "application/json" } }))
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("defaults account surfaces to Polish and switches to persisted English", async () => {
    const user = userEvent.setup();
    render(<AccountApp route="signup" />);

    expect(screen.getByRole("heading", { name: /utwórz konto/i })).toBeInTheDocument();
    expect(screen.getByText(/zdrowie twojego pupila/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(screen.getByRole("heading", { name: /create your account/i })).toBeInTheDocument();
    expect(window.localStorage.getItem("caniello.language")).toBe("en");
    expect(document.documentElement.lang).toBe("en");
  });

  it("validates signup before calling the account API and then shows verification state", async () => {
    const user = userEvent.setup();
    render(<AccountApp route="signup" />);

    await user.click(screen.getByRole("button", { name: /utwórz konto/i }));

    expect(screen.getByText(/wpisz imię i nazwisko/i)).toBeInTheDocument();
    expect(screen.getByText(/wpisz poprawny adres e-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/hasło musi mieć/i)).toBeInTheDocument();
    expect(screen.getByText(/zaakceptuj regulamin/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();

    await user.type(screen.getByLabelText(/imię i nazwisko/i), "Jan Kowalski");
    await user.type(screen.getByLabelText(/adres e-mail/i), "owner@example.com");
    await user.type(screen.getByPlaceholderText(/utwórz hasło/i), "correct horse battery staple");
    await user.type(screen.getByPlaceholderText(/potwierdź hasło/i), "correct horse battery staple");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /utwórz konto/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(
      "/api/account/signup",
      expect.objectContaining({ method: "POST" })
    ));
    const [, init] = (fetch as unknown as { mock: { calls: Array<[string, RequestInit]> } }).mock.calls[0];
    expect(JSON.parse(String(init.body))).toMatchObject({
      fullName: "Jan Kowalski",
      email: "owner@example.com",
      language: "pl",
      acceptedTerms: true
    });
    expect(screen.getByRole("status")).toHaveTextContent(/sprawdź skrzynkę/i);
  });

  it("submits password reset with localized next steps", async () => {
    const user = userEvent.setup();
    render(<AccountApp route="reset-password" />);

    await user.type(screen.getByLabelText(/adres e-mail/i), "owner@example.com");
    await user.click(screen.getByRole("button", { name: /wyślij instrukcję/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(
      "/api/account/reset-password",
      expect.objectContaining({ method: "POST" })
    ));
    expect(screen.getByRole("status")).toHaveTextContent(/wysłaliśmy instrukcję/i);
  });

  it("redirects to the protected owner app after successful login", async () => {
    const assign = vi.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { assign, search: "?next=%2Fapp" }
    });
    const user = userEvent.setup();
    render(<AccountApp route="login" />);

    await user.type(screen.getByLabelText(/adres e-mail/i), "owner@example.com");
    await user.type(screen.getByLabelText(/hasło/i), "correct horse battery staple");
    await user.click(screen.getByRole("button", { name: /zaloguj się/i }));

    await waitFor(() => expect(assign).toHaveBeenCalledWith("/app"));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("renders the protected app home and logs out through the account API", async () => {
    const assign = vi.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { assign }
    });
    const user = userEvent.setup();
    render(<AccountApp route="app-home" />);

    expect(screen.getByRole("heading", { name: /panel opiekuna/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /witaj w caniello/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: accountCopy.pl.appNavHome })[0]).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByRole("link", { name: accountCopy.pl.appNavPets })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: accountCopy.pl.appNavTimeline })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: accountCopy.pl.appNavDocuments })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: accountCopy.pl.appNavReminders })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: accountCopy.pl.appNavAsk })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: accountCopy.pl.appNavSharing })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: accountCopy.pl.appNavSettings })[0]).toBeInTheDocument();
    expect(screen.getByRole("searchbox", { name: /szukaj w caniello/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /aktywny pupil/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /powiadomienia/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /wyloguj się/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith("/api/account/logout", { method: "POST" }));
    expect(assign).toHaveBeenCalledWith("/login");
  });

  it("keeps protected app shell labels coherent after switching to English", async () => {
    const user = userEvent.setup();
    render(<AccountApp route="app-home" />);

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(screen.getByRole("heading", { name: /owner dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /welcome to caniello/i })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /pets/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /timeline/i })[0]).toBeInTheDocument();
    expect(screen.getByRole("searchbox", { name: /search caniello/i })).toBeInTheDocument();
    expect(screen.getByText(/does not replace a veterinarian/i)).toBeInTheDocument();
  });

  it("shows a setup-specific message when Supabase auth is unavailable", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(JSON.stringify({ ok: false, status: "auth_unavailable" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        })
      )
    );
    const user = userEvent.setup();
    render(<AccountApp route="signup" />);

    await user.type(screen.getByLabelText(/imię i nazwisko/i), "Jan Kowalski");
    await user.type(screen.getByLabelText(/adres e-mail/i), "owner@example.com");
    await user.type(screen.getByPlaceholderText(/utwórz hasło/i), "correct horse battery staple");
    await user.type(screen.getByPlaceholderText(/potwierdź hasło/i), "correct horse battery staple");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /utwórz konto/i }));

    expect(await screen.findByText(/logowanie lokalne nie jest jeszcze skonfigurowane/i)).toBeInTheDocument();
  });

  it("shows a credential-specific message when login is rejected", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(JSON.stringify({ ok: false, status: "invalid_credentials" }), {
          status: 401,
          headers: { "Content-Type": "application/json" }
        })
      )
    );
    const user = userEvent.setup();
    render(<AccountApp route="login" />);

    await user.type(screen.getByLabelText(/adres e-mail/i), "owner@example.com");
    await user.type(screen.getByLabelText(/hasło/i), "correct horse battery staple");
    await user.click(screen.getByRole("button", { name: /zaloguj się/i }));

    expect(await screen.findByText(/nie znaleźliśmy konta/i)).toBeInTheDocument();
    expect(screen.queryByText(/nie udało się zakończyć operacji/i)).not.toBeInTheDocument();
  });
});
