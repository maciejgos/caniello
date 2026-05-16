import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Caniello landing page", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
    window.localStorage.clear();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } }))
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("defaults to Polish and switches to persisted English copy", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole("heading", { name: /cała opieka nad pupilem\. zawsze pod ręką/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(screen.getByRole("heading", { name: /your pet's care\. always within reach/i })).toBeInTheDocument();
    expect(window.localStorage.getItem("caniello.language")).toBe("en");
  });

  it("falls back to Polish when the persisted language is unsupported", () => {
    window.localStorage.setItem("caniello.language", "de");

    render(<App />);

    expect(screen.getByRole("heading", { name: /cała opieka nad pupilem\. zawsze pod ręką/i })).toBeInTheDocument();
    expect(window.localStorage.getItem("caniello.language")).toBe("pl");
    expect(document.documentElement.lang).toBe("pl");
  });

  it("blocks owner waitlist submission until email and lead consent are valid", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole("button", { name: /^Dołącz$/i })[0]);
    expect(screen.getByText(/wpisz poprawny adres e-mail/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/adres e-mail/i)[0]).toHaveAttribute("aria-invalid", "true");

    await user.type(screen.getAllByLabelText(/adres e-mail/i)[0], "owner@example.com");
    await user.click(screen.getAllByRole("button", { name: /^Dołącz$/i })[0]);
    expect(screen.getByText(/zaznacz zgodę/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/adres e-mail/i)[0]).toHaveAttribute("aria-invalid", "false");
    expect(screen.getAllByRole("checkbox")[0]).toHaveAttribute("aria-invalid", "true");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("submits the hero caregiver payload with Today source attribution after consent", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getAllByLabelText(/adres e-mail/i)[0], "owner@example.com");
    await user.click(screen.getAllByRole("checkbox")[0]);
    await user.click(screen.getAllByRole("button", { name: /^Dołącz$/i })[0]);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const calls = (fetch as unknown as { mock: { calls: Array<[string, RequestInit]> } }).mock.calls;
    expect(JSON.parse(String(calls[0][1].body))).toMatchObject({
      email: "owner@example.com",
      source: "landing_page_hero",
      leadConsent: true,
      language: "pl"
    });
    expect(screen.getByText(/zapisaliśmy Cię na listę Caniello/i)).toBeInTheDocument();
  });

  it("links Next and Future to their research pages", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: /poznaj opiekę/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /poznaj rynek usług/i })).toHaveAttribute("href", "/marketplace");
    expect(screen.getByRole("link", { name: /poznaj kliniki/i })).toHaveAttribute("href", "/clinics");
  });

  it("scrolls to the top after moving to a new route", async () => {
    const user = userEvent.setup();
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => undefined);
    render(<App />);
    scrollTo.mockClear();

    await user.click(screen.getByRole("link", { name: /poznaj rynek usług/i }));

    await waitFor(() => expect(window.location.pathname).toBe("/marketplace"));
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "auto" });
  });

  it("records validation events only after analytics consent", async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(fetch).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: /zgadzam się/i }));

    await waitFor(() => {
      const eventCalls = (fetch as unknown as { mock: { calls: Array<[string, RequestInit]> } }).mock.calls.filter(([url]) =>
        String(url).includes("/api/validation-events")
      );

      expect(eventCalls.length).toBeGreaterThanOrEqual(2);
      expect(eventCalls.map(([, init]) => JSON.parse(String(init.body)).name)).toEqual(expect.arrayContaining(["analytics_consent", "page_view"]));
    });
    expect(screen.queryByLabelText(/pomóż nam mierzyć zainteresowanie/i)).not.toBeInTheDocument();
  });

  it("renders legal pages from footer routes", () => {
    window.history.pushState({}, "", "/privacy");
    const { unmount } = render(<App />);

    expect(screen.getByRole("heading", { name: "Polityka prywatności" })).toBeInTheDocument();
    expect(screen.getByText(/administrator i kontakt/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "privacy@caniello.com" })).toHaveAttribute("href", "mailto:privacy@caniello.com");
    expect(screen.getByText(/nie powołało inspektora ochrony danych/i)).toBeInTheDocument();
    expect(screen.getByText(/nie podejmujemy automatycznych decyzji/i)).toBeInTheDocument();

    unmount();
    window.history.pushState({}, "", "/terms");
    const termsRender = render(<App />);

    expect(screen.getByRole("heading", { name: "Regulamin" })).toBeInTheDocument();
    expect(screen.getByText(/wymagania techniczne/i)).toBeInTheDocument();
    expect(screen.getByText(/niedozwolone treści/i)).toBeInTheDocument();
    expect(screen.getByText(/reklamacje lub zgłoszenia/i)).toBeInTheDocument();

    termsRender.unmount();
    window.history.pushState({}, "", "/medical-boundaries");
    render(<App />);

    expect(screen.getByRole("heading", { name: "Granice medyczne" })).toBeInTheDocument();
    expect(screen.getByText(/Caniello nie diagnozuje/i)).toBeInTheDocument();
  });

  it("renders Next exploration page and submits a generic waitlist lead", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/marketplace");
    render(<App />);

    expect(screen.getAllByRole("heading", { name: /zaufana pomoc/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/badanie w toku/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/wróć do etapu dzisiaj/i)).not.toBeInTheDocument();

    await user.type(screen.getAllByLabelText(/adres e-mail/i)[0], "marketplace@example.com");
    await user.click(screen.getAllByRole("checkbox")[0]);
    await user.click(screen.getAllByRole("button", { name: /dołącz do listy/i })[0]);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const calls = (fetch as unknown as { mock: { calls: Array<[string, RequestInit]> } }).mock.calls;
    expect(JSON.parse(String(calls[0][1].body))).toMatchObject({
      email: "marketplace@example.com",
      source: "landing_page_wave2",
      language: "pl"
    });
    expect(JSON.parse(String(calls[0][1].body))).not.toHaveProperty("role");
    expect(JSON.parse(String(calls[0][1].body))).not.toHaveProperty("interestWave");
  });

  it("redirects legacy Wave URLs to canonical marketplace and clinics routes", async () => {
    window.history.pushState({}, "", "/wave-2-exploration");
    const { unmount } = render(<App />);

    await waitFor(() => expect(window.location.pathname).toBe("/marketplace"));

    unmount();
    window.history.pushState({}, "", "/wave-3-research");
    render(<App />);

    await waitFor(() => expect(window.location.pathname).toBe("/clinics"));
  });

  it("renders Future research page and submits a generic waitlist lead", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/clinics");
    render(<App />);

    expect(screen.getAllByRole("heading", { name: /pełniejszy kontekst pacjenta/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Badanie w toku/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/wróć do etapu dzisiaj/i)).not.toBeInTheDocument();

    await user.type(screen.getAllByLabelText(/adres e-mail/i)[0], "clinic@example.com");
    await user.click(screen.getAllByRole("checkbox")[0]);
    await user.click(screen.getAllByRole("button", { name: /dołącz do listy/i })[0]);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const calls = (fetch as unknown as { mock: { calls: Array<[string, RequestInit]> } }).mock.calls;
    expect(JSON.parse(String(calls[0][1].body))).toMatchObject({
      email: "clinic@example.com",
      source: "landing_page_wave3",
      language: "pl"
    });
    expect(JSON.parse(String(calls[0][1].body))).not.toHaveProperty("role");
    expect(JSON.parse(String(calls[0][1].body))).not.toHaveProperty("interestWave");
  });
});
