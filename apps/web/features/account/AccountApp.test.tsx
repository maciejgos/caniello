import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AccountApp } from "./AccountApp";
import { accountCopy } from "./content";

const brunoPet = {
  id: "44444444-4444-4444-8444-444444444444",
  householdId: "33333333-3333-4333-8333-333333333333",
  name: "Bruno",
  species: "dog",
  breed: "Golden Retriever",
  birthDate: "2022-05-26",
  sexOrGender: "male",
  weightKg: 26.4,
  microchipNumber: "616093900000000",
  allergies: null,
  medication: "OmegaVet",
  importantNotes: null,
  createdAt: "2026-06-04T09:00:00.000Z",
  updatedAt: "2026-06-04T09:30:00.000Z",
};

const dashboardReminders = [
  {
    id: "11111111-1111-4111-8111-111111111111",
    petId: brunoPet.id,
    title: "Kontrola stomatologiczna",
    reminderType: "visit",
    dueDate: "2026-07-20",
    notes: null,
    status: "active",
    createdAt: "2026-06-10T09:00:00.000Z",
    updatedAt: "2026-06-10T09:00:00.000Z",
  },
  {
    id: "22222222-2222-4222-8222-222222222222",
    petId: brunoPet.id,
    title: "Szczepienie przypominające",
    reminderType: "vaccination",
    dueDate: "2026-07-05",
    notes: null,
    status: "suggested",
    createdAt: "2026-06-09T09:00:00.000Z",
    updatedAt: "2026-06-09T09:00:00.000Z",
  },
];

const dashboardDocuments = [
  {
    id: "77777777-7777-4777-8777-777777777777",
    petId: brunoPet.id,
    title: "Starsza karta szczepień",
    documentType: "vaccination",
    documentDate: "2026-05-02",
    providerName: "Przychodnia Zielona",
    notes: null,
    originalFilename: null,
    mimeType: null,
    status: "metadata_only",
    createdAt: "2026-05-02T09:00:00.000Z",
    updatedAt: "2026-05-02T09:00:00.000Z",
  },
  {
    id: "33333333-3333-4333-8333-333333333333",
    petId: brunoPet.id,
    title: "Wyniki morfologii",
    documentType: "lab_result",
    documentDate: "2026-06-12",
    providerName: "Przychodnia Zielona",
    notes: null,
    originalFilename: null,
    mimeType: null,
    status: "metadata_only",
    createdAt: "2026-06-12T09:00:00.000Z",
    updatedAt: "2026-06-12T09:00:00.000Z",
  },
];

const dashboardEvents = [
  {
    id: "88888888-8888-4888-8888-888888888888",
    petId: brunoPet.id,
    eventType: "vaccination",
    eventDate: "2026-05-10",
    title: "Szczepienie sezonowe",
    notes: null,
    createdAt: "2026-05-10T09:00:00.000Z",
    updatedAt: "2026-05-10T09:00:00.000Z",
  },
  {
    id: "55555555-5555-4555-8555-555555555555",
    petId: brunoPet.id,
    eventType: "visit",
    eventDate: "2026-06-11",
    title: "Kontrola ogólna",
    notes: null,
    createdAt: "2026-06-11T09:00:00.000Z",
    updatedAt: "2026-06-11T09:00:00.000Z",
  },
];

const dashboardShareLinks = [
  {
    id: "66666666-6666-4666-8666-666666666666",
    petId: brunoPet.id,
    expiresAt: "2027-01-15T12:00:00.000Z",
    revokedAt: null,
    createdAt: "2026-06-12T09:00:00.000Z",
  },
];

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("Caniello account experience", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify({ ok: true, status: "ok" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }),
      ),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("defaults account surfaces to Polish and switches to persisted English", async () => {
    const user = userEvent.setup();
    render(<AccountApp route="signup" />);

    expect(
      screen.getByRole("heading", { name: /utwórz konto/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/zdrowie twojego pupila/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /kontynuuj z google - niedostępne lokalnie/i,
      }),
    ).toBeDisabled();
    expect(
      screen.getByRole("button", {
        name: /kontynuuj z apple - niedostępne lokalnie/i,
      }),
    ).toBeDisabled();
    expect(
      screen.getByText(/google i apple jest wyłączone/i),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(
      screen.getByRole("heading", { name: /create your account/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /continue with google - unavailable locally/i,
      }),
    ).toBeDisabled();
    expect(
      screen.getByText(/google and apple login are disabled/i),
    ).toBeInTheDocument();
    expect(window.localStorage.getItem("caniello.language")).toBe("en");
    expect(document.documentElement.lang).toBe("en");
  });

  it("validates signup before calling the account API and then shows verification state", async () => {
    const user = userEvent.setup();
    render(<AccountApp route="signup" />);

    await user.click(screen.getByRole("button", { name: /utwórz konto/i }));

    expect(screen.getByText(/wpisz imię i nazwisko/i)).toBeInTheDocument();
    expect(
      screen.getByText(/wpisz poprawny adres e-mail/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/hasło musi mieć/i)).toBeInTheDocument();
    expect(screen.getByText(/zaakceptuj regulamin/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();

    await user.type(screen.getByLabelText(/imię i nazwisko/i), "Jan Kowalski");
    await user.type(
      screen.getByLabelText(/adres e-mail/i),
      "owner@example.com",
    );
    await user.type(
      screen.getByPlaceholderText(/utwórz hasło/i),
      "correct horse battery staple",
    );
    await user.type(
      screen.getByPlaceholderText(/potwierdź hasło/i),
      "correct horse battery staple",
    );
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /utwórz konto/i }));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/account/signup",
        expect.objectContaining({ method: "POST" }),
      ),
    );
    const [, init] = (
      fetch as unknown as { mock: { calls: Array<[string, RequestInit]> } }
    ).mock.calls[0];
    expect(JSON.parse(String(init.body))).toMatchObject({
      fullName: "Jan Kowalski",
      email: "owner@example.com",
      language: "pl",
      acceptedTerms: true,
    });
    expect(screen.getByRole("status")).toHaveTextContent(/sprawdź skrzynkę/i);
  });

  it("redirects after signup when local auth returns an authenticated session", async () => {
    const assign = vi.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { assign, search: "" },
    });
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify({ ok: true, status: "authenticated" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }),
      ),
    );
    const user = userEvent.setup();
    render(<AccountApp route="signup" />);

    await user.type(screen.getByLabelText(/imię i nazwisko/i), "Jan Kowalski");
    await user.type(
      screen.getByLabelText(/adres e-mail/i),
      "owner@example.com",
    );
    await user.type(
      screen.getByPlaceholderText(/utwórz hasło/i),
      "correct horse battery staple",
    );
    await user.type(
      screen.getByPlaceholderText(/potwierdź hasło/i),
      "correct horse battery staple",
    );
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /utwórz konto/i }));

    await waitFor(() => expect(assign).toHaveBeenCalledWith("/app"));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("submits password reset with localized next steps", async () => {
    const user = userEvent.setup();
    render(<AccountApp route="reset-password" />);

    await user.type(
      screen.getByLabelText(/adres e-mail/i),
      "owner@example.com",
    );
    await user.click(
      screen.getByRole("button", { name: /wyślij instrukcję/i }),
    );

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/account/reset-password",
        expect.objectContaining({ method: "POST" }),
      ),
    );
    expect(screen.getByRole("status")).toHaveTextContent(
      /wysłaliśmy instrukcję/i,
    );
  });

  it("redirects to the protected owner app after successful login", async () => {
    const assign = vi.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { assign, search: "?next=%2Fapp" },
    });
    const user = userEvent.setup();
    render(<AccountApp route="login" />);

    await user.type(
      screen.getByLabelText(/adres e-mail/i),
      "owner@example.com",
    );
    await user.type(
      screen.getByLabelText(/hasło/i),
      "correct horse battery staple",
    );
    await user.click(screen.getByRole("button", { name: /zaloguj się/i }));

    await waitFor(() => expect(assign).toHaveBeenCalledWith("/app"));
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("renders the protected app home and logs out through the account API", async () => {
    const assign = vi.fn();
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { assign },
    });
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        if (String(input) === "/api/pets/profile") {
          return new Response(JSON.stringify({ ok: true, pet: brunoPet }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (String(input) === "/api/reminders") {
          return jsonResponse({
            ok: true,
            pet: brunoPet,
            reminders: dashboardReminders,
          });
        }
        if (String(input) === "/api/documents") {
          return jsonResponse({
            ok: true,
            pet: brunoPet,
            documents: dashboardDocuments,
          });
        }
        if (String(input) === "/api/timeline-events") {
          return jsonResponse({
            ok: true,
            pet: brunoPet,
            events: dashboardEvents,
          });
        }
        if (String(input) === "/api/share-links") {
          return jsonResponse({
            ok: true,
            pet: brunoPet,
            shareLinks: dashboardShareLinks,
          });
        }

        if (
          String(input) === "/api/account/logout" &&
          init?.method === "POST"
        ) {
          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ ok: true, status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }),
    );
    const user = userEvent.setup();
    render(<AccountApp route="app-home" />);

    expect(
      await screen.findByRole("heading", { name: /dzień dobry/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/oto co czeka bruno/i)).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: /aktywny pupil/i }),
    ).toHaveTextContent(/bruno.*pierwszy profil/i);
    expect(
      screen.queryByRole("button", { name: /pierwsze uruchomienie/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /co dalej/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/szczepienie przypominające/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/kontrola stomatologiczna/i)).toBeInTheDocument();
    expect(
      screen
        .getByText(/szczepienie przypominające/i)
        .compareDocumentPosition(
          screen.getByText(/kontrola stomatologiczna/i),
        ) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: /podsumowanie zdrowia/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("26.4 kg")).toBeInTheDocument();
    expect(screen.getByText("616093900000000")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /ostatnie dokumenty/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/wyniki morfologii/i)).toBeInTheDocument();
    expect(
      screen
        .getByText(/wyniki morfologii/i)
        .compareDocumentPosition(screen.getByText(/starsza karta szczepień/i)) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      screen.getByRole("button", { name: /zobacz dokumenty/i }),
    ).toBeEnabled();
    expect(
      screen.getByRole("heading", { name: /oś czasu opieki/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/kontrola ogólna/i)).toBeInTheDocument();
    expect(
      screen
        .getByText(/kontrola ogólna/i)
        .compareDocumentPosition(screen.getByText(/szczepienie sezonowe/i)) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { name: /zapytaj caniello/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/nie zgaduje odpowiedzi/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /otwórz ask caniello/i }),
    ).toBeEnabled();
    expect(
      screen.getByRole("heading", { name: /udostępnij kartę opieki/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /przygotuj udostępnianie/i }),
    ).toBeEnabled();
    expect(
      screen.getByText(/aktywny link tylko do odczytu/i),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavHome })[0],
    ).toHaveAttribute("aria-current", "page");
    expect(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavPets })[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavTimeline })[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", {
        name: accountCopy.pl.appNavDocuments,
      })[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", {
        name: accountCopy.pl.appNavReminders,
      })[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavAsk })[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavSharing })[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavSettings })[0],
    ).toBeInTheDocument();
    const activePet = screen.getByRole("status", { name: /aktywny pupil/i });
    expect(activePet).toBeInTheDocument();
    expect(activePet.querySelector("img")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("searchbox", { name: /szukaj w caniello/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /powiadomienia/i }),
    ).toBeDisabled();
    await user.click(
      screen.getByRole("button", { name: /podsumowanie aktywnego pupila/i }),
    );
    expect(
      await screen.findByRole("heading", {
        name: /zapisz podstawowe dane pupila/i,
      }),
    ).toBeInTheDocument();
    await user.click(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavHome })[0],
    );
    await screen.findByRole("heading", { name: /dzień dobry/i });
    await user.click(
      screen.getByRole("button", { name: /otwórz ask caniello/i }),
    );
    expect(
      await screen.findByRole("heading", { name: /zapytaj caniello/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/ask caniello nie jest jeszcze aktywne/i),
    ).toBeInTheDocument();
    await user.click(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavHome })[0],
    );
    await screen.findByRole("heading", { name: /dzień dobry/i });
    await user.click(screen.getByRole("button", { name: /wyloguj się/i }));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith("/api/account/logout", {
        method: "POST",
      }),
    );
    expect(assign).toHaveBeenCalledWith("/login");
  });

  it("keeps protected app shell labels coherent after switching to English", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        if (String(input) === "/api/pets/profile") {
          return new Response(JSON.stringify({ ok: true, pet: brunoPet }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ ok: true, status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }),
    );
    const user = userEvent.setup();
    render(<AccountApp route="app-home" />);

    await screen.findByRole("heading", { name: /dzień dobry/i });
    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(
      screen.getByRole("heading", { name: /good morning/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/what's ahead for bruno/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /what's next/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/there are no active or suggested reminders/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/details saved in the pet profile/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /recent documents/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /prepare sharing/i }),
    ).toBeEnabled();
    expect(screen.getByText(/does not guess answers/i)).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /pets/i })[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /timeline/i })[0],
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("searchbox", { name: /search caniello/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: /active pet/i }),
    ).toHaveTextContent(/bruno.*first profile/i);
    expect(
      screen.getByText(/shows only data saved in the profile/i),
    ).toBeInTheDocument();
  });

  it("shows an honest dashboard data failure and retries without sample records", async () => {
    let shouldFail = true;
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        if (String(input) === "/api/pets/profile") {
          return jsonResponse({ ok: true, pet: brunoPet });
        }

        if (shouldFail) {
          return jsonResponse({ ok: false, message: "Unavailable" }, 503);
        }

        if (String(input) === "/api/reminders") {
          return jsonResponse({ ok: true, pet: brunoPet, reminders: [] });
        }
        if (String(input) === "/api/documents") {
          return jsonResponse({ ok: true, pet: brunoPet, documents: [] });
        }
        if (String(input) === "/api/timeline-events") {
          return jsonResponse({ ok: true, pet: brunoPet, events: [] });
        }
        if (String(input) === "/api/share-links") {
          return jsonResponse({ ok: true, pet: brunoPet, shareLinks: [] });
        }

        return jsonResponse({ ok: true });
      }),
    );
    const user = userEvent.setup();

    render(<AccountApp route="app-home" />);

    expect(
      await screen.findByText(
        /nie udało się załadować zapisanych przypomnień/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/wścieklizna za 18 dni/i),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/omegavet/i)).not.toBeInTheDocument();

    shouldFail = false;
    await user.click(screen.getByRole("button", { name: /spróbuj ponownie/i }));

    expect(
      await screen.findByText(/nie ma aktywnych ani sugerowanych przypomnień/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/brak aktywnego linku/i)).toBeInTheDocument();
  });

  it("opens honest first-run onboarding when no pet profile exists", async () => {
    const savedPet = {
      ...brunoPet,
      name: "Luna",
      species: "cat",
      breed: "europejski",
      birthDate: "2023-04-12",
      sexOrGender: "female",
      weightKg: 4.6,
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        if (String(input) === "/api/pets/profile" && init?.method === "PUT") {
          return new Response(JSON.stringify({ ok: true, pet: savedPet }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (String(input) === "/api/pets/profile") {
          return new Response(JSON.stringify({ ok: true, pet: null }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ ok: true, status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }),
    );
    const user = userEvent.setup();

    render(<AccountApp route="app-home" />);

    expect(
      await screen.findByRole("heading", { name: /witaj w caniello/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/zacznijmy od kilku prostych kroków/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: /aktywny pupil/i }),
    ).toHaveTextContent(/brak zapisanego pupila/i);
    expect(
      screen.getByRole("button", { name: /dodaj profil/i }),
    ).toBeDisabled();
    expect(screen.getByLabelText(/imię pupila/i)).toHaveValue("");
    expect(screen.getByLabelText(/^gatunek$/i)).toHaveValue("");
    expect(screen.queryByText(/bruno/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: /aktywny pupil/i }),
    ).not.toHaveTextContent(/pierwszy profil/i);
    expect(
      screen.queryByRole("button", { name: /panel pupila/i }),
    ).not.toBeInTheDocument();

    await user.type(screen.getByLabelText(/imię pupila/i), "Luna");
    await user.selectOptions(screen.getByLabelText(/^gatunek$/i), "cat");
    await user.type(screen.getByLabelText(/^rasa$/i), "europejski");
    await user.type(screen.getByLabelText(/data urodzenia/i), "2023-04-12");
    await user.selectOptions(screen.getByLabelText(/^płeć$/i), "female");
    await user.type(screen.getByLabelText(/^waga$/i), "4.6");
    await user.click(screen.getByRole("button", { name: /dodaj profil/i }));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/pets/profile",
        expect.objectContaining({ method: "PUT" }),
      ),
    );
    expect(
      await screen.findByRole("heading", { name: /dzień dobry/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/oto co czeka luna/i)).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: /aktywny pupil/i }),
    ).toHaveTextContent(/luna.*pierwszy profil/i);
  });

  it("shows a recoverable dashboard state when the active pet cannot load", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        if (String(input) === "/api/pets/profile") {
          return new Response(
            JSON.stringify({ ok: false, message: "Profile unavailable." }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        return new Response(JSON.stringify({ ok: true, status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }),
    );
    const user = userEvent.setup();

    render(<AccountApp route="app-home" />);

    expect(
      await screen.findByRole("heading", {
        name: /nie udało się załadować profilu pupila/i,
      }),
    ).toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: /przejdź do profilu/i }),
    );
    expect(
      await screen.findByRole("heading", {
        name: /zapisz podstawowe dane pupila/i,
      }),
    ).toBeInTheDocument();
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
      updatedAt: "2026-06-04T09:30:00.000Z",
    };
    const createdDocument = {
      id: "77777777-7777-4777-8777-777777777777",
      petId: savedPet.id,
      title: "Karta szczepień",
      documentType: "vaccination",
      documentDate: "2026-05-20",
      providerName: "Riverside Animal Hospital",
      notes: "Zabierz na kolejną wizytę.",
      originalFilename: "karta-szczepien.pdf",
      mimeType: "application/pdf",
      status: "metadata_only",
      createdAt: "2026-06-07T10:00:00.000Z",
      updatedAt: "2026-06-07T10:00:00.000Z",
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        if (String(input) === "/api/pets/profile" && init?.method === "PUT") {
          return new Response(JSON.stringify({ ok: true, pet: savedPet }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (String(input) === "/api/pets/profile") {
          return new Response(JSON.stringify({ ok: true, pet: null }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (String(input) === "/api/reminders") {
          return new Response(
            JSON.stringify({ ok: true, pet: savedPet, reminders: [] }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (String(input) === "/api/documents" && init?.method === "POST") {
          return new Response(
            JSON.stringify({
              ok: true,
              pet: savedPet,
              document: createdDocument,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (String(input) === "/api/documents") {
          return new Response(
            JSON.stringify({ ok: true, pet: savedPet, documents: [] }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        return new Response(JSON.stringify({ ok: true, status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }),
    );
    const user = userEvent.setup();
    render(<AccountApp route="app-home" />);

    await user.click(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavPets })[0],
    );
    expect(
      await screen.findByRole("heading", {
        name: /zapisz podstawowe dane pupila/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/nie zapisaliśmy jeszcze profilu pupila/i),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavPets })[0],
    ).toHaveAttribute("aria-current", "page");

    await user.type(screen.getByLabelText(/imię pupila/i), "Luna");
    await user.selectOptions(screen.getByLabelText(/^gatunek$/i), "cat");
    await user.type(screen.getByLabelText(/^rasa$/i), "europejski");
    await user.type(screen.getByLabelText(/data urodzenia/i), "2022-02-14");
    await user.type(screen.getByLabelText(/płeć lub opis/i), "samica");
    await user.type(screen.getByLabelText(/waga w kg/i), "4.8");
    await user.type(
      screen.getByLabelText(/numer mikrochipu/i),
      "616093900000001",
    );
    await user.type(screen.getByLabelText(/^alergie$/i), "kurczak");
    await user.type(screen.getByLabelText(/leki i suplementy/i), "brak");
    await user.type(
      screen.getByLabelText(/ważne notatki/i),
      "Nie lubi głośnych miejsc.",
    );
    await user.click(screen.getByRole("button", { name: /zapisz profil/i }));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/pets/profile",
        expect.objectContaining({
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    const putCall = (
      fetch as unknown as {
        mock: { calls: Array<[string, RequestInit | undefined]> };
      }
    ).mock.calls.find(
      ([input, requestInit]) =>
        input === "/api/pets/profile" && requestInit?.method === "PUT",
    );
    expect(putCall).toBeDefined();
    const init = putCall?.[1] as RequestInit;
    expect(JSON.parse(String(init.body))).toMatchObject({
      name: "Luna",
      species: "cat",
      weightKg: 4.8,
      microchipNumber: "616093900000001",
    });
    expect(screen.getByText(/zapisany profil/i)).toBeInTheDocument();
    expect(screen.getAllByText("Luna")[0]).toBeInTheDocument();

    await user.click(
      screen.getAllByRole("button", {
        name: accountCopy.pl.appNavDocuments,
      })[0],
    );
    expect(
      await screen.findByRole("heading", { name: /sejf dokumentów: luna/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /przesyłanie plików, skanowanie, ocr i analiza nie są jeszcze aktywne/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /przesyłanie wkrótce/i }),
    ).toBeDisabled();

    await user.type(
      screen.getByLabelText(/^tytuł dokumentu$/i),
      "Karta szczepień",
    );
    await user.selectOptions(
      screen.getByLabelText(/^typ dokumentu$/i),
      "vaccination",
    );
    await user.type(screen.getByLabelText(/^data dokumentu$/i), "2026-05-20");
    await user.type(
      screen.getByLabelText(/^placówka lub lekarz$/i),
      "Riverside Animal Hospital",
    );
    await user.type(
      screen.getByLabelText(/^nazwa pliku$/i),
      "karta-szczepien.pdf",
    );
    await user.type(screen.getByLabelText(/^typ pliku$/i), "application/pdf");
    await user.type(
      screen.getByLabelText(/^notatki$/i),
      "Zabierz na kolejną wizytę.",
    );
    await user.click(screen.getByRole("button", { name: /zapisz dokument/i }));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/documents",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    const documentPostCall = (
      fetch as unknown as {
        mock: { calls: Array<[string, RequestInit | undefined]> };
      }
    ).mock.calls.find(
      ([input, requestInit]) =>
        input === "/api/documents" && requestInit?.method === "POST",
    );
    expect(documentPostCall).toBeDefined();
    expect(JSON.parse(String(documentPostCall?.[1]?.body))).toMatchObject({
      title: "Karta szczepień",
      documentType: "vaccination",
      documentDate: "2026-05-20",
      originalFilename: "karta-szczepien.pdf",
    });
    expect(screen.getByText("Karta szczepień")).toBeInTheDocument();
    expect(screen.getAllByText(/tylko metadane/i).length).toBeGreaterThan(0);

    await user.click(
      screen.getAllByRole("button", {
        name: accountCopy.pl.appNavReminders,
      })[0],
    );
    expect(
      screen.getByRole("heading", { name: /przypomnienia/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: /utwórz przypomnienie/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/brak przypomnień w tym widoku/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /powiadomienia wkrótce/i }),
    ).toBeDisabled();

    await user.click(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavAsk })[0],
    );
    expect(
      screen.getByRole("heading", { name: /zapytaj caniello/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/nie generuje odpowiedzi, diagnoz/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /asystent wkrótce/i }),
    ).toBeDisabled();

    await user.click(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavSharing })[0],
    );
    expect(
      await screen.findByRole("heading", { name: /podgląd karty opieki/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/tylko właściciel/i)).toBeInTheDocument();
    expect(
      screen.getByText(/kontrolowany link tylko do odczytu/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /utwórz link/i })).toBeEnabled();
    expect(
      screen.getByRole("button", { name: /eksport pdf wkrótce/i }),
    ).toBeDisabled();

    await user.click(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavSettings })[0],
    );
    expect(
      screen.getByRole("heading", { name: /^ustawienia$/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/zarządzaj preferencjami konta/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /zapisz ustawienia/i }),
    ).toBeEnabled();
    expect(
      screen.getByRole("button", { name: /poproś o eksport danych/i }),
    ).toBeEnabled();
    expect(
      screen.getByRole("button", { name: /poproś o usunięcie konta/i }),
    ).toBeEnabled();
    expect(
      screen.getByRole("button", { name: /wyloguj się/i }),
    ).toBeInTheDocument();

    await user.click(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavHome })[0],
    );
    expect(
      screen.getByRole("heading", { name: /dzień dobry/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/oto co czeka luna/i)).toBeInTheDocument();
    expect(
      screen.getByRole("status", { name: /aktywny pupil/i }),
    ).toHaveTextContent(/luna.*pierwszy profil/i);

    await user.click(screen.getByRole("button", { name: "EN" }));
    await user.click(
      screen.getAllByRole("button", { name: accountCopy.en.appNavAsk })[0],
    );
    expect(
      screen.getByRole("heading", { name: /ask caniello/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/does not generate answers, diagnoses/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /assistant coming soon/i }),
    ).toBeDisabled();
  });

  it("renders an owner-only care card preview from saved profile, reminders, and documents", async () => {
    const savedPet = {
      id: "44444444-4444-4444-8444-444444444444",
      householdId: "33333333-3333-4333-8333-333333333333",
      name: "Luna",
      species: "dog",
      breed: "mixed breed",
      birthDate: "2021-05-01",
      sexOrGender: "female",
      weightKg: 24.2,
      microchipNumber: "616093900000222",
      allergies: "Chicken",
      medication: "OmegaVet daily",
      importantNotes: "Gets anxious around fireworks.",
      createdAt: "2026-06-04T09:00:00.000Z",
      updatedAt: "2026-06-04T09:30:00.000Z",
    };
    const reminders = [
      {
        id: "55555555-5555-4555-8555-555555555555",
        petId: savedPet.id,
        title: "Rabies vaccine",
        reminderType: "vaccination",
        dueDate: "2026-07-12",
        notes: "Bring the vaccination card.",
        status: "active",
        createdAt: "2026-06-06T09:00:00.000Z",
        updatedAt: "2026-06-06T09:00:00.000Z",
      },
      {
        id: "66666666-6666-4666-8666-666666666666",
        petId: savedPet.id,
        title: "Completed visit",
        reminderType: "visit",
        dueDate: "2026-05-01",
        notes: null,
        status: "completed",
        createdAt: "2026-06-06T09:00:00.000Z",
        updatedAt: "2026-06-06T09:00:00.000Z",
      },
    ];
    const documents = [
      {
        id: "77777777-7777-4777-8777-777777777777",
        petId: savedPet.id,
        title: "Vaccination card",
        documentType: "vaccination",
        documentDate: "2026-05-20",
        providerName: "Riverside Animal Hospital",
        notes: "Bring to next visit.",
        originalFilename: "vaccination-card.pdf",
        mimeType: "application/pdf",
        status: "metadata_only",
        createdAt: "2026-06-07T10:00:00.000Z",
        updatedAt: "2026-06-07T10:00:00.000Z",
      },
    ];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        if (String(input) === "/api/pets/profile") {
          return new Response(JSON.stringify({ ok: true, pet: savedPet }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (String(input) === "/api/reminders") {
          return new Response(
            JSON.stringify({ ok: true, pet: savedPet, reminders }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (String(input) === "/api/documents") {
          return new Response(
            JSON.stringify({ ok: true, pet: savedPet, documents }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        return new Response(JSON.stringify({ ok: true, status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }),
    );
    const user = userEvent.setup();
    render(<AccountApp route="app-home" />);

    await user.click(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavSharing })[0],
    );

    expect(
      await screen.findByRole("heading", { name: /podgląd karty opieki/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Luna").length).toBeGreaterThan(0);
    expect(
      screen.getByText(/dog · mixed breed · 2021-05-01/i),
    ).toBeInTheDocument();
    expect(screen.getByText("616093900000222")).toBeInTheDocument();
    expect(screen.getByText("Chicken")).toBeInTheDocument();
    expect(screen.getByText("OmegaVet daily")).toBeInTheDocument();
    expect(
      screen.getByText("Gets anxious around fireworks."),
    ).toBeInTheDocument();
    expect(screen.getByText("Rabies vaccine")).toBeInTheDocument();
    expect(screen.queryByText("Completed visit")).not.toBeInTheDocument();
    expect(screen.getByText("Vaccination card")).toBeInTheDocument();
    expect(screen.getByText("Riverside Animal Hospital")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /utwórz link/i })).toBeEnabled();
    expect(
      screen.getByRole("button", { name: /eksport pdf wkrótce/i }),
    ).toBeDisabled();
    expect(screen.getByText(/nie jest diagnozą/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "EN" }));
    expect(
      screen.getByRole("heading", { name: /care card preview/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/owner only/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create link/i })).toBeEnabled();
    expect(
      screen.getAllByText(/official pet passport/i).length,
    ).toBeGreaterThan(0);
  });

  it("creates and edits a manual care timeline event without enabling automation", async () => {
    const savedPet = {
      id: "44444444-4444-4444-8444-444444444444",
      householdId: "33333333-3333-4333-8333-333333333333",
      name: "Luna",
      species: "dog",
      breed: "mixed breed",
      birthDate: "2021-05-01",
      sexOrGender: "female",
      weightKg: 24.2,
      microchipNumber: "616093900000222",
      allergies: null,
      medication: null,
      importantNotes: null,
      createdAt: "2026-06-04T09:00:00.000Z",
      updatedAt: "2026-06-04T09:30:00.000Z",
    };
    const createdEvent = {
      id: "66666666-6666-4666-8666-666666666666",
      petId: savedPet.id,
      title: "Wizyta kontrolna",
      eventType: "visit",
      eventDate: "2026-06-12",
      notes: "Kontrola wagi.",
      createdAt: "2026-06-12T09:00:00.000Z",
      updatedAt: "2026-06-12T09:00:00.000Z",
    };
    const futureEvent = {
      ...createdEvent,
      id: "99999999-9999-4999-8999-999999999999",
      title: "Przyszła wizyta",
      eventDate: "2099-06-12",
    };
    const updatedEvent = {
      ...createdEvent,
      title: "Wizyta i szczepienie",
      eventDate: "2026-06-13",
      notes: "Kontrola wagi i plan szczepień.",
      updatedAt: "2026-06-12T10:00:00.000Z",
    };
    const nextReminder = {
      id: "77777777-7777-4777-8777-777777777777",
      petId: savedPet.id,
      title: "Szczepienie przeciw wściekliźnie",
      reminderType: "vaccination",
      dueDate: "2026-07-12",
      notes: "Zabierz poprzedni dokument.",
      status: "active",
      createdAt: "2026-06-12T09:00:00.000Z",
      updatedAt: "2026-06-12T09:00:00.000Z",
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        if (
          String(input) === "/api/timeline-events" &&
          init?.method === "POST"
        ) {
          return new Response(
            JSON.stringify({ ok: true, pet: savedPet, event: createdEvent }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (
          String(input) === "/api/timeline-events" &&
          init?.method === "PUT"
        ) {
          return new Response(
            JSON.stringify({ ok: true, pet: savedPet, event: updatedEvent }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (String(input) === "/api/timeline-events") {
          return new Response(
            JSON.stringify({
              ok: true,
              pet: savedPet,
              events: [futureEvent],
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (String(input) === "/api/reminders") {
          return new Response(
            JSON.stringify({
              ok: true,
              pet: savedPet,
              reminders: [nextReminder],
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        return new Response(JSON.stringify({ ok: true, status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }),
    );
    const user = userEvent.setup();
    render(<AccountApp route="app-home" />);

    await user.click(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavTimeline })[0],
    );
    expect(
      await screen.findByRole("heading", { name: /oś czasu opieki/i }),
    ).toBeInTheDocument();
    expect(
      screen
        .getByRole("complementary", { name: /aktywny pupil osi czasu/i })
        .querySelector("img"),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Przyszła wizyta")).toBeInTheDocument();
    expect(screen.getByText("Nadchodzące")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^wszystko$/i })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(
      screen.getByRole("heading", { name: /podsumowanie osi czasu/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /najbliższe zadanie/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Szczepienie przeciw wściekliźnie"),
    ).toBeInTheDocument();
    expect(screen.getByText("2026-07-12")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /automatyzacje wkrótce/i }),
    ).toBeDisabled();
    expect(
      screen.getByText(/automatyczne wpisy z dokumentów, ocr, ai/i),
    ).toBeInTheDocument();

    await user.type(
      screen.getByLabelText(/^tytuł wydarzenia$/i),
      "Wizyta kontrolna",
    );
    await user.selectOptions(
      screen.getByLabelText(/^typ wydarzenia$/i),
      "visit",
    );
    await user.type(screen.getByLabelText(/^data wydarzenia$/i), "2026-06-12");
    await user.type(screen.getByLabelText(/^notatki$/i), "Kontrola wagi.");
    await user.click(
      screen.getByRole("button", { name: /zapisz wydarzenie/i }),
    );

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/timeline-events",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    const timelinePostCall = (
      fetch as unknown as {
        mock: { calls: Array<[string, RequestInit | undefined]> };
      }
    ).mock.calls.find(
      ([input, requestInit]) =>
        input === "/api/timeline-events" && requestInit?.method === "POST",
    );
    expect(timelinePostCall).toBeDefined();
    expect(JSON.parse(String(timelinePostCall?.[1]?.body))).toMatchObject({
      title: "Wizyta kontrolna",
      eventType: "visit",
      eventDate: "2026-06-12",
      notes: "Kontrola wagi.",
    });
    expect(screen.getByText("Wizyta kontrolna")).toBeInTheDocument();
    expect(screen.getByText("Zapisane")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /edytuj: wizyta kontrolna/i }),
    );
    await user.clear(screen.getByLabelText(/^tytuł wydarzenia$/i));
    await user.type(
      screen.getByLabelText(/^tytuł wydarzenia$/i),
      "Wizyta i szczepienie",
    );
    await user.clear(screen.getByLabelText(/^data wydarzenia$/i));
    await user.type(screen.getByLabelText(/^data wydarzenia$/i), "2026-06-13");
    await user.clear(screen.getByLabelText(/^notatki$/i));
    await user.type(
      screen.getByLabelText(/^notatki$/i),
      "Kontrola wagi i plan szczepień.",
    );
    await user.click(screen.getByRole("button", { name: /zapisz zmiany/i }));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/timeline-events",
        expect.objectContaining({
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    const timelinePutCall = (
      fetch as unknown as {
        mock: { calls: Array<[string, RequestInit | undefined]> };
      }
    ).mock.calls.find(
      ([input, requestInit]) =>
        input === "/api/timeline-events" && requestInit?.method === "PUT",
    );
    expect(timelinePutCall).toBeDefined();
    expect(JSON.parse(String(timelinePutCall?.[1]?.body))).toMatchObject({
      id: createdEvent.id,
      title: "Wizyta i szczepienie",
      eventDate: "2026-06-13",
    });
    expect(screen.getByText("Wizyta i szczepienie")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "EN" }));
    expect(
      screen.getByRole("heading", { name: /care timeline/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /next upcoming/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/does not generate diagnoses/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /automation coming soon/i }),
    ).toBeDisabled();

    await user.click(
      screen.getByRole("button", { name: /view all reminders/i }),
    );
    expect(
      await screen.findByRole("heading", { name: /reminders: luna/i }),
    ).toBeInTheDocument();
  });

  it("creates and revokes a care card share link without enabling PDF export", async () => {
    const savedPet = {
      id: "44444444-4444-4444-8444-444444444444",
      householdId: "33333333-3333-4333-8333-333333333333",
      name: "Luna",
      species: "dog",
      breed: "mixed breed",
      birthDate: "2021-05-01",
      sexOrGender: "female",
      weightKg: 24.2,
      microchipNumber: "616093900000222",
      allergies: null,
      medication: null,
      importantNotes: null,
      createdAt: "2026-06-04T09:00:00.000Z",
      updatedAt: "2026-06-04T09:30:00.000Z",
    };
    const shareLink = {
      id: "88888888-8888-4888-8888-888888888888",
      petId: savedPet.id,
      url: "http://localhost/share/raw-token",
      expiresAt: "2026-06-25T12:00:00.000Z",
      revokedAt: null,
      createdAt: "2026-06-11T12:00:00.000Z",
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        if (String(input) === "/api/pets/profile") {
          return new Response(JSON.stringify({ ok: true, pet: savedPet }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (String(input) === "/api/reminders") {
          return new Response(
            JSON.stringify({ ok: true, pet: savedPet, reminders: [] }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (String(input) === "/api/documents") {
          return new Response(
            JSON.stringify({ ok: true, pet: savedPet, documents: [] }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (String(input) === "/api/share-links" && init?.method === "POST") {
          return new Response(
            JSON.stringify({ ok: true, pet: savedPet, shareLink }),
            {
              status: 201,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (String(input) === "/api/share-links" && init?.method === "PUT") {
          return new Response(
            JSON.stringify({
              ok: true,
              pet: savedPet,
              shareLink: {
                ...shareLink,
                url: undefined,
                revokedAt: "2026-06-11T12:05:00.000Z",
              },
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (String(input) === "/api/share-links") {
          return new Response(
            JSON.stringify({ ok: true, pet: savedPet, shareLinks: [] }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        return new Response(JSON.stringify({ ok: true, status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }),
    );
    const user = userEvent.setup();
    render(<AccountApp route="app-home" />);

    await user.click(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavSharing })[0],
    );
    await user.click(
      await screen.findByRole("button", { name: /utwórz link/i }),
    );

    expect(
      await screen.findByText("http://localhost/share/raw-token"),
    ).toBeInTheDocument();
    expect(screen.getByText(/skopiuj ten adres teraz/i)).toBeInTheDocument();
    expect(screen.getByText(/wygasa: 2026-06-25/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /eksport pdf wkrótce/i }),
    ).toBeDisabled();

    expect(
      screen.getByRole("button", { name: /kopiuj link/i }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /odwołaj link/i }));
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/share-links",
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify({ id: shareLink.id, action: "revoke" }),
        }),
      ),
    );
    expect(
      screen.getByRole("button", { name: /utwórz link/i }),
    ).toBeInTheDocument();
  });

  it("routes the care card no-pet state back to the pet profile section", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        if (String(input) === "/api/pets/profile") {
          return new Response(JSON.stringify({ ok: true, pet: null }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (String(input) === "/api/reminders") {
          return new Response(
            JSON.stringify({ ok: true, pet: null, reminders: [] }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (String(input) === "/api/documents") {
          return new Response(
            JSON.stringify({ ok: true, pet: null, documents: [] }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        return new Response(JSON.stringify({ ok: true, status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }),
    );
    const user = userEvent.setup();
    render(<AccountApp route="app-home" />);

    await user.click(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavSharing })[0],
    );
    expect(
      await screen.findByRole("heading", {
        name: /najpierw zapisz profil pupila/i,
      }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /przejdź do pupili/i }),
    );
    expect(
      await screen.findByRole("heading", {
        name: /zapisz podstawowe dane pupila/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavPets })[0],
    ).toHaveAttribute("aria-current", "page");
  });

  it("creates and completes an owner care reminder without enabling notifications", async () => {
    const savedPet = {
      id: "44444444-4444-4444-8444-444444444444",
      householdId: "33333333-3333-4333-8333-333333333333",
      name: "Luna",
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
      updatedAt: "2026-06-04T09:30:00.000Z",
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
      updatedAt: "2026-06-06T09:00:00.000Z",
    };
    const completedReminder = {
      ...createdReminder,
      status: "completed",
      updatedAt: "2026-06-06T10:00:00.000Z",
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        if (String(input) === "/api/reminders" && init?.method === "POST") {
          return new Response(
            JSON.stringify({
              ok: true,
              pet: savedPet,
              reminder: createdReminder,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (String(input) === "/api/reminders" && init?.method === "PUT") {
          return new Response(
            JSON.stringify({
              ok: true,
              pet: savedPet,
              reminder: completedReminder,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (String(input) === "/api/reminders") {
          return new Response(
            JSON.stringify({ ok: true, pet: savedPet, reminders: [] }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        return new Response(JSON.stringify({ ok: true, status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }),
    );
    const user = userEvent.setup();
    render(<AccountApp route="app-home" />);

    await user.click(
      screen.getAllByRole("button", {
        name: accountCopy.pl.appNavReminders,
      })[0],
    );
    expect(
      await screen.findByRole("heading", { name: /utwórz przypomnienie/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /przypomnienia: luna/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /powiadomienia oraz cykliczność nie są jeszcze aktywne/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/najbliższe zadania Luna/i)).toBeInTheDocument();

    await user.type(
      screen.getByLabelText(/^tytuł$/i),
      "Szczepienie przeciw wściekliźnie",
    );
    await user.selectOptions(screen.getByLabelText(/^typ$/i), "vaccination");
    await user.type(screen.getByLabelText(/termin/i), "2026-07-12");
    await user.type(
      screen.getByLabelText(/notatki/i),
      "Zabierz poprzedni dokument.",
    );
    await user.click(
      screen.getByRole("button", { name: /zapisz przypomnienie/i }),
    );

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/reminders",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    const postCall = (
      fetch as unknown as {
        mock: { calls: Array<[string, RequestInit | undefined]> };
      }
    ).mock.calls.find(
      ([input, requestInit]) =>
        input === "/api/reminders" && requestInit?.method === "POST",
    );
    expect(postCall).toBeDefined();
    expect(JSON.parse(String(postCall?.[1]?.body))).toMatchObject({
      title: "Szczepienie przeciw wściekliźnie",
      reminderType: "vaccination",
      dueDate: "2026-07-12",
      notes: "Zabierz poprzedni dokument.",
    });
    expect(
      screen.getByText("Szczepienie przeciw wściekliźnie"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /powiadomienia wkrótce/i }),
    ).toBeDisabled();

    await user.click(
      screen.getByRole("button", { name: /oznacz jako wykonane/i }),
    );
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/reminders",
        expect.objectContaining({
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    expect(screen.getAllByText(/^Wykonane$/i).length).toBeGreaterThan(0);
  });

  it("keeps pet profile fields locked until the initial profile load completes", async () => {
    let resolveProfileLoad: (response: Response) => void = (
      _response: Response,
    ) => {
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
          headers: { "Content-Type": "application/json" },
        });
      }),
    );
    const user = userEvent.setup();
    render(<AccountApp route="app-home" />);

    await user.click(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavPets })[0],
    );
    expect(
      await screen.findByRole("heading", {
        name: /zapisz podstawowe dane pupila/i,
      }),
    ).toBeInTheDocument();

    const nameField = screen.getByLabelText(/imię pupila/i);
    const speciesField = screen.getByLabelText(/^gatunek$/i);
    expect(nameField).toBeDisabled();
    expect(speciesField).toBeDisabled();
    expect(
      screen.getByRole("button", { name: /zapisz profil/i }),
    ).toBeDisabled();

    resolveProfileLoad?.(
      new Response(JSON.stringify({ ok: true, pet: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await waitFor(() => expect(nameField).not.toBeDisabled());
    expect(speciesField).not.toBeDisabled();
  });

  it("preserves an existing non-standard species value when saving the profile", async () => {
    const petWithLegacySpecies = {
      ...brunoPet,
      species: "królik",
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        if (String(input) === "/api/pets/profile" && init?.method === "PUT") {
          return new Response(
            JSON.stringify({ ok: true, pet: petWithLegacySpecies }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (String(input) === "/api/pets/profile") {
          return new Response(
            JSON.stringify({ ok: true, pet: petWithLegacySpecies }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        return new Response(JSON.stringify({ ok: true, status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }),
    );
    const user = userEvent.setup();
    render(<AccountApp route="app-home" />);

    await user.click(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavPets })[0],
    );
    const speciesField = await screen.findByLabelText(/^gatunek$/i);
    await waitFor(() => expect(speciesField).toHaveValue("królik"));
    expect(screen.getByRole("option", { name: "królik" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /zapisz profil/i }));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/pets/profile",
        expect.objectContaining({ method: "PUT" }),
      ),
    );
    const putCall = (
      fetch as unknown as {
        mock: { calls: Array<[string, RequestInit | undefined]> };
      }
    ).mock.calls.find(
      ([input, requestInit]) =>
        input === "/api/pets/profile" && requestInit?.method === "PUT",
    );
    expect(JSON.parse(String(putCall?.[1]?.body))).toMatchObject({
      species: "królik",
    });
  });

  it("records owner account privacy settings and data-rights requests", async () => {
    const profile = {
      id: "11111111-1111-4111-8111-111111111111",
      displayName: "Anna Kowalska",
      language: "pl",
      createdAt: "2026-06-12T08:00:00.000Z",
      updatedAt: "2026-06-12T08:00:00.000Z",
    };
    const consent = {
      id: "22222222-2222-4222-8222-222222222222",
      analyticsConsent: true,
      marketingConsent: false,
      language: "pl",
      createdAt: "2026-06-12T08:05:00.000Z",
    };
    const dataExportRequest = {
      id: "33333333-3333-4333-8333-333333333333",
      status: "requested",
      requestedAt: "2026-06-12T08:10:00.000Z",
    };
    const deletionRequest = {
      id: "44444444-4444-4444-8444-444444444444",
      status: "requested",
      requestedAt: "2026-06-12T08:15:00.000Z",
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        if (
          String(input) === "/api/account/settings" &&
          init?.method === "PUT"
        ) {
          return new Response(
            JSON.stringify({
              ok: true,
              profile: { ...profile, displayName: "Anna Nowak" },
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (
          String(input) === "/api/account/settings" &&
          init?.method === "POST"
        ) {
          const body = JSON.parse(String(init.body));
          const responseBody =
            body.action === "consent"
              ? { ok: true, latestConsent: consent }
              : body.action === "data_export"
                ? { ok: true, latestDataExportRequest: dataExportRequest }
                : { ok: true, latestDeletionRequest: deletionRequest };

          return new Response(JSON.stringify(responseBody), {
            status: 201,
            headers: { "Content-Type": "application/json" },
          });
        }

        if (String(input) === "/api/account/settings") {
          return new Response(
            JSON.stringify({
              ok: true,
              ownerEmail: "anna@example.com",
              profile,
              latestConsent: null,
              latestDataExportRequest: null,
              latestDeletionRequest: null,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        return new Response(JSON.stringify({ ok: true, status: "ok" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }),
    );
    const user = userEvent.setup();
    render(<AccountApp route="app-home" />);

    await user.click(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavSettings })[0],
    );

    expect(
      await screen.findByRole("heading", { name: /^ustawienia$/i }),
    ).toBeInTheDocument();
    const displayNameField = await screen.findByLabelText(/imię i nazwisko/i);
    expect(displayNameField).toHaveValue("Anna Kowalska");
    expect(screen.getByLabelText(/adres e-mail/i)).toHaveValue(
      "anna@example.com",
    );
    expect(screen.getAllByText(/brak prośby/i).length).toBe(2);

    await user.clear(displayNameField);
    await user.type(displayNameField, "Anna Nowak");
    await user.click(screen.getByLabelText(/zgadzam się na analitykę/i));
    await user.click(
      screen.getByRole("button", { name: /zapisz ustawienia/i }),
    );

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/account/settings",
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify({ displayName: "Anna Nowak", language: "pl" }),
        }),
      ),
    );

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/account/settings",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            action: "consent",
            payload: {
              analyticsConsent: true,
              marketingConsent: false,
              language: "pl",
            },
          }),
        }),
      ),
    );
    expect(await screen.findByText("2026-06-12")).toBeInTheDocument();

    await user.click(screen.getByLabelText(/zgadzam się na analitykę/i));
    await user.click(
      screen.getByRole("button", { name: /zapisz ustawienia/i }),
    );

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/account/settings",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            action: "consent",
            payload: {
              analyticsConsent: false,
              marketingConsent: false,
              language: "pl",
            },
          }),
        }),
      ),
    );

    await user.click(
      screen.getByRole("button", { name: /poproś o eksport danych/i }),
    );
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/account/settings",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            action: "data_export",
            payload: { language: "pl" },
          }),
        }),
      ),
    );
    expect(screen.getAllByText(/eksport: requested/i).length).toBeGreaterThan(
      0,
    );

    await user.click(
      screen.getByRole("button", {
        name: /poproś o usunięcie konta/i,
      }),
    );
    const deletionButton = screen.getByRole("button", {
      name: /wyślij prośbę o usunięcie/i,
    });
    expect(deletionButton).toBeDisabled();
    await user.type(screen.getByLabelText(/wpisz DELETE/i), "DELETE");
    expect(deletionButton).toBeEnabled();
    await user.click(deletionButton);

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "/api/account/settings",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            action: "account_deletion",
            payload: { confirmation: "DELETE", language: "pl" },
          }),
        }),
      ),
    );
  });

  it("keeps edited Settings values visible when the API rejects a save", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
        if (
          String(input) === "/api/account/settings" &&
          init?.method === "PUT"
        ) {
          return new Response(
            JSON.stringify({
              ok: false,
              message: "Invalid account profile payload.",
            }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (
          String(input) === "/api/account/settings" &&
          init?.method === "POST"
        ) {
          return new Response(
            JSON.stringify({
              ok: true,
              latestConsent: {
                id: "22222222-2222-4222-8222-222222222222",
                analyticsConsent: false,
                marketingConsent: false,
                language: "pl",
                createdAt: "2026-06-12T08:05:00.000Z",
              },
            }),
            {
              status: 201,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        if (String(input) === "/api/account/settings") {
          return new Response(
            JSON.stringify({
              ok: true,
              ownerEmail: "anna@example.com",
              profile: {
                id: "11111111-1111-4111-8111-111111111111",
                displayName: "Anna Kowalska",
                language: "pl",
                createdAt: "2026-06-12T08:00:00.000Z",
                updatedAt: "2026-06-12T08:00:00.000Z",
              },
              latestConsent: null,
              latestDataExportRequest: null,
              latestDeletionRequest: null,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        }

        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }),
    );
    const user = userEvent.setup();
    render(<AccountApp route="app-home" />);

    await user.click(
      screen.getAllByRole("button", { name: accountCopy.pl.appNavSettings })[0],
    );

    const displayNameField = await screen.findByLabelText(/imię i nazwisko/i);
    await user.clear(displayNameField);
    await user.type(displayNameField, "Anna Niedokończona");
    await user.click(
      screen.getByRole("button", { name: /zapisz ustawienia/i }),
    );

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Invalid account profile payload.",
    );
    expect(displayNameField).toHaveValue("Anna Niedokończona");
  });

  it("shows a setup-specific message when Supabase auth is unavailable", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({ ok: false, status: "auth_unavailable" }),
            {
              status: 400,
              headers: { "Content-Type": "application/json" },
            },
          ),
      ),
    );
    const user = userEvent.setup();
    render(<AccountApp route="signup" />);

    await user.type(screen.getByLabelText(/imię i nazwisko/i), "Jan Kowalski");
    await user.type(
      screen.getByLabelText(/adres e-mail/i),
      "owner@example.com",
    );
    await user.type(
      screen.getByPlaceholderText(/utwórz hasło/i),
      "correct horse battery staple",
    );
    await user.type(
      screen.getByPlaceholderText(/potwierdź hasło/i),
      "correct horse battery staple",
    );
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: /utwórz konto/i }));

    expect(
      await screen.findByText(
        /logowanie lokalne nie jest jeszcze skonfigurowane/i,
      ),
    ).toBeInTheDocument();
  });

  it("shows a credential-specific message when login is rejected", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({ ok: false, status: "invalid_credentials" }),
            {
              status: 401,
              headers: { "Content-Type": "application/json" },
            },
          ),
      ),
    );
    const user = userEvent.setup();
    render(<AccountApp route="login" />);

    await user.type(
      screen.getByLabelText(/adres e-mail/i),
      "owner@example.com",
    );
    await user.type(
      screen.getByLabelText(/hasło/i),
      "correct horse battery staple",
    );
    await user.click(screen.getByRole("button", { name: /zaloguj się/i }));

    expect(
      await screen.findByText(/nie znaleźliśmy konta/i),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/nie udało się zakończyć operacji/i),
    ).not.toBeInTheDocument();
  });
});
