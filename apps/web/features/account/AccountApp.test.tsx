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
    expect(screen.getByRole("heading", { name: /co dziś u bruno/i })).toBeInTheDocument();
    expect(screen.getByText(/podgląd demo/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /co dalej/i })).toBeInTheDocument();
    expect(screen.getByText(/wścieklizna za 18 dni/i)).toBeInTheDocument();
    expect(screen.getByText(/omegavet dziś o 19:00/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /podsumowanie zdrowia/i })).toBeInTheDocument();
    expect(screen.getByText(/dane przykładowe/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /ostatnie dokumenty/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /przejdź do dokumentów/i })).toBeDisabled();
    expect(screen.getByRole("heading", { name: /oś czasu opieki/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /zapytaj caniello/i })).toBeInTheDocument();
    expect(screen.getByText(/nie udziela diagnoz/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /zapytaj na podstawie rekordów/i })).toBeDisabled();
    expect(screen.getByRole("heading", { name: /udostępnij kartę opieki/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /przygotuj udostępnianie/i })).toBeDisabled();
    expect(screen.getByText(/nie zastępuje lekarza weterynarii/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /pierwsze uruchomienie/i }));
    expect(screen.getByRole("heading", { name: /witaj w caniello/i })).toBeInTheDocument();
    expect(screen.getByText(/zacznijmy od kilku prostych kroków/i)).toBeInTheDocument();
    expect(screen.getAllByText(/dodaj pupila/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/prześlij lub zeskanuj pierwszy dokument/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/przypomnienia i ask caniello/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/imię pupila/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gatunek/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rasa/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data urodzenia/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/płeć/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/waga/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /dodaj bruno/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /prześlij pierwszy dokument/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /skanuj dokument/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /podgląd pełnego dokumentu/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /dowiedz się więcej o dokumentach/i })).toBeDisabled();
    expect(screen.getByText(/sprawdź wyciągnięte dane/i)).toBeInTheDocument();
    expect(screen.getByText(/wskazówka caniello/i)).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: accountCopy.pl.appNavHome })[0]).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByRole("button", { name: accountCopy.pl.appNavPets })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: accountCopy.pl.appNavTimeline })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: accountCopy.pl.appNavDocuments })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: accountCopy.pl.appNavReminders })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: accountCopy.pl.appNavAsk })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: accountCopy.pl.appNavSharing })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: accountCopy.pl.appNavSettings })[0]).toBeInTheDocument();
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
    expect(screen.getByRole("heading", { name: /what needs attention for bruno/i })).toBeInTheDocument();
    expect(screen.getByText(/demo preview/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /what's next/i })).toBeInTheDocument();
    expect(screen.getByText(/rabies due in 18 days/i)).toBeInTheDocument();
    expect(screen.getByText(/example data/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /recent documents/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ask from records/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /prepare sharing/i })).toBeDisabled();
    expect(screen.getByText(/does not diagnose/i)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /first run/i }));
    expect(screen.getByRole("heading", { name: /welcome to caniello/i })).toBeInTheDocument();
    expect(screen.getByText(/let's get started/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/pet name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/species/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add bruno/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /upload first document/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /scan document/i })).toBeDisabled();
    expect(screen.getByText(/review extracted details/i)).toBeInTheDocument();
    expect(screen.getByText(/caniello tip/i)).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /pets/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /timeline/i })[0]).toBeInTheDocument();
    expect(screen.getByRole("searchbox", { name: /search caniello/i })).toBeInTheDocument();
    expect(screen.getByText(/does not replace a veterinarian/i)).toBeInTheDocument();
  });

  it("saves the pet profile and keeps the remaining authenticated sections inert", async () => {
    const savedPet = {
      id: "44444444-4444-4444-8444-444444444444",
      householdId: "33333333-3333-4333-8333-333333333333",
      name: "Luna",
      species: "kot",
      breed: "europejski",
      birthDate: "2022-02-14",
      sexOrGender: "samica",
      weightKg: 4.8,
      microchipNumber: "616093900000001",
      allergies: "kurczak",
      medication: "brak",
      importantNotes: "Nie lubi głośnych miejsc.",
      createdAt: "2026-06-04T09:00:00.000Z",
      updatedAt: "2026-06-04T09:30:00.000Z"
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        if (String(input) === "/api/pets/profile" && init?.method === "PUT") {
          return new Response(JSON.stringify({ ok: true, pet: savedPet }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        }

        if (String(input) === "/api/pets/profile") {
          return new Response(JSON.stringify({ ok: true, pet: null }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        }

        if (String(input) === "/api/reminders") {
          return new Response(JSON.stringify({ ok: true, pet: savedPet, reminders: [] }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        }

        return new Response(JSON.stringify({ ok: true, status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      })
    );
    const user = userEvent.setup();
    render(<AccountApp route="app-home" />);

    await user.click(screen.getAllByRole("button", { name: accountCopy.pl.appNavPets })[0]);
    expect(await screen.findByRole("heading", { name: /zapisz podstawowe dane pupila/i })).toBeInTheDocument();
    expect(screen.getByText(/nie zapisaliśmy jeszcze profilu pupila/i)).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: accountCopy.pl.appNavPets })[0]).toHaveAttribute("aria-current", "page");

    await user.type(screen.getByLabelText(/imię pupila/i), "Luna");
    await user.type(screen.getByLabelText(/^gatunek$/i), "kot");
    await user.type(screen.getByLabelText(/^rasa$/i), "europejski");
    await user.type(screen.getByLabelText(/data urodzenia/i), "2022-02-14");
    await user.type(screen.getByLabelText(/płeć lub opis/i), "samica");
    await user.type(screen.getByLabelText(/waga w kg/i), "4.8");
    await user.type(screen.getByLabelText(/numer mikrochipu/i), "616093900000001");
    await user.type(screen.getByLabelText(/^alergie$/i), "kurczak");
    await user.type(screen.getByLabelText(/leki i suplementy/i), "brak");
    await user.type(screen.getByLabelText(/ważne notatki/i), "Nie lubi głośnych miejsc.");
    await user.click(screen.getByRole("button", { name: /zapisz profil/i }));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/pets/profile",
        expect.objectContaining({
          method: "PUT",
          headers: { "Content-Type": "application/json" }
        })
      )
    );
    const putCall = (fetch as unknown as { mock: { calls: Array<[string, RequestInit | undefined]> } }).mock.calls.find(
      ([input, requestInit]) => input === "/api/pets/profile" && requestInit?.method === "PUT"
    );
    expect(putCall).toBeDefined();
    const init = putCall?.[1] as RequestInit;
    expect(JSON.parse(String(init.body))).toMatchObject({
      name: "Luna",
      species: "kot",
      weightKg: 4.8,
      microchipNumber: "616093900000001"
    });
    expect(screen.getByText(/zapisany profil/i)).toBeInTheDocument();
    expect(screen.getAllByText("Luna")[0]).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: accountCopy.pl.appNavDocuments })[0]);
    expect(screen.getByRole("heading", { name: /dokumenty/i })).toBeInTheDocument();
    expect(screen.getByText(/ocr, analiza i weryfikacja dokumentów nie są aktywne/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /przesyłanie dokumentów wkrótce/i })).toBeDisabled();

    await user.click(screen.getAllByRole("button", { name: accountCopy.pl.appNavReminders })[0]);
    expect(screen.getByRole("heading", { name: /przypomnienia/i })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: /utwórz przypomnienie/i })).toBeInTheDocument();
    expect(screen.getByText(/brak przypomnień w tym widoku/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /powiadomienia wkrótce/i })).toBeDisabled();

    await user.click(screen.getAllByRole("button", { name: accountCopy.pl.appNavAsk })[0]);
    expect(screen.getByRole("heading", { name: /zapytaj caniello/i })).toBeInTheDocument();
    expect(screen.getByText(/nie generuje odpowiedzi, diagnoz/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /asystent wkrótce/i })).toBeDisabled();

    await user.click(screen.getAllByRole("button", { name: accountCopy.pl.appNavSharing })[0]);
    expect(screen.getByRole("heading", { name: /udostępnianie/i })).toBeInTheDocument();
    expect(screen.getByText(/nie utworzono linku, pdf, zaproszenia/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /udostępnianie wkrótce/i })).toBeDisabled();

    await user.click(screen.getAllByRole("button", { name: accountCopy.pl.appNavSettings })[0]);
    expect(screen.getByRole("heading", { name: /ustawienia/i })).toBeInTheDocument();
    expect(screen.getByText(/nie dodaje nowych przepływów usuwania konta/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ustawienia szczegółowe wkrótce/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /wyloguj się/i })).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: accountCopy.pl.appNavHome })[0]);
    expect(screen.getByRole("heading", { name: /co dziś u bruno/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /pierwsze uruchomienie/i }));
    expect(screen.getByRole("heading", { name: /witaj w caniello/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "EN" }));
    await user.click(screen.getAllByRole("button", { name: accountCopy.en.appNavAsk })[0]);
    expect(screen.getByRole("heading", { name: /ask caniello/i })).toBeInTheDocument();
    expect(screen.getByText(/does not generate answers, diagnoses/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /assistant coming soon/i })).toBeDisabled();
  });

  it("creates and completes an owner care reminder without enabling notifications", async () => {
    const savedPet = {
      id: "44444444-4444-4444-8444-444444444444",
      householdId: "33333333-3333-4333-8333-333333333333",
      name: "Bruno",
      species: "dog",
      breed: "mixed breed",
      birthDate: "2021-05-01",
      sexOrGender: "male",
      weightKg: 26.4,
      microchipNumber: "616093900000000",
      allergies: null,
      medication: null,
      importantNotes: null,
      createdAt: "2026-06-04T09:00:00.000Z",
      updatedAt: "2026-06-04T09:30:00.000Z"
    };
    const createdReminder = {
      id: "55555555-5555-4555-8555-555555555555",
      petId: savedPet.id,
      title: "Szczepienie przeciw wściekliźnie",
      reminderType: "vaccination",
      dueDate: "2026-07-12",
      notes: "Zabierz poprzedni dokument.",
      status: "active",
      createdAt: "2026-06-06T09:00:00.000Z",
      updatedAt: "2026-06-06T09:00:00.000Z"
    };
    const completedReminder = {
      ...createdReminder,
      status: "completed",
      updatedAt: "2026-06-06T10:00:00.000Z"
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        if (String(input) === "/api/reminders" && init?.method === "POST") {
          return new Response(JSON.stringify({ ok: true, pet: savedPet, reminder: createdReminder }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        }

        if (String(input) === "/api/reminders" && init?.method === "PUT") {
          return new Response(JSON.stringify({ ok: true, pet: savedPet, reminder: completedReminder }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        }

        if (String(input) === "/api/reminders") {
          return new Response(JSON.stringify({ ok: true, pet: savedPet, reminders: [] }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        }

        return new Response(JSON.stringify({ ok: true, status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      })
    );
    const user = userEvent.setup();
    render(<AccountApp route="app-home" />);

    await user.click(screen.getAllByRole("button", { name: accountCopy.pl.appNavReminders })[0]);
    expect(await screen.findByRole("heading", { name: /utwórz przypomnienie/i })).toBeInTheDocument();
    expect(screen.getByText(/powiadomienia oraz cykliczność nie są jeszcze aktywne/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/^tytuł$/i), "Szczepienie przeciw wściekliźnie");
    await user.selectOptions(screen.getByLabelText(/^typ$/i), "vaccination");
    await user.type(screen.getByLabelText(/termin/i), "2026-07-12");
    await user.type(screen.getByLabelText(/notatki/i), "Zabierz poprzedni dokument.");
    await user.click(screen.getByRole("button", { name: /zapisz przypomnienie/i }));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/reminders",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" }
        })
      )
    );
    const postCall = (fetch as unknown as { mock: { calls: Array<[string, RequestInit | undefined]> } }).mock.calls.find(
      ([input, requestInit]) => input === "/api/reminders" && requestInit?.method === "POST"
    );
    expect(postCall).toBeDefined();
    expect(JSON.parse(String(postCall?.[1]?.body))).toMatchObject({
      title: "Szczepienie przeciw wściekliźnie",
      reminderType: "vaccination",
      dueDate: "2026-07-12",
      notes: "Zabierz poprzedni dokument."
    });
    expect(screen.getByText("Szczepienie przeciw wściekliźnie")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /powiadomienia wkrótce/i })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: /oznacz jako wykonane/i }));
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/reminders",
        expect.objectContaining({
          method: "PUT",
          headers: { "Content-Type": "application/json" }
        })
      )
    );
    expect(screen.getAllByText(/^Wykonane$/i).length).toBeGreaterThan(0);
  });

  it("keeps pet profile fields locked until the initial profile load completes", async () => {
    let resolveProfileLoad: (response: Response) => void = (_response: Response) => {
      throw new Error("Pet profile load did not start.");
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        if (String(input) === "/api/pets/profile") {
          return new Promise<Response>((resolve) => {
            resolveProfileLoad = resolve;
          });
        }

        return new Response(JSON.stringify({ ok: true, status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" }
        });
      })
    );
    const user = userEvent.setup();
    render(<AccountApp route="app-home" />);

    await user.click(screen.getAllByRole("button", { name: accountCopy.pl.appNavPets })[0]);
    expect(await screen.findByRole("heading", { name: /zapisz podstawowe dane pupila/i })).toBeInTheDocument();

    const nameField = screen.getByLabelText(/imię pupila/i);
    const speciesField = screen.getByLabelText(/^gatunek$/i);
    expect(nameField).toBeDisabled();
    expect(speciesField).toBeDisabled();
    expect(screen.getByRole("button", { name: /zapisz profil/i })).toBeDisabled();

    resolveProfileLoad?.(
      new Response(JSON.stringify({ ok: true, pet: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      })
    );

    await waitFor(() => expect(nameField).not.toBeDisabled());
    expect(speciesField).not.toBeDisabled();
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
