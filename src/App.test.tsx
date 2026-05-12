import { render, screen, waitFor, within } from "@testing-library/react";
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

    expect(screen.getByRole("heading", { name: /lepsza opieka\. silniejsza więź/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "EN" }));

    expect(screen.getByRole("heading", { name: /better care\. stronger bond/i })).toBeInTheDocument();
    expect(window.localStorage.getItem("caniello.language")).toBe("en");
  });

  it("blocks owner waitlist submission until email and lead consent are valid", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getAllByRole("button", { name: /^Dołącz$/i })[0]);
    expect(screen.getByText(/wpisz poprawny adres email/i)).toBeInTheDocument();

    await user.type(screen.getAllByLabelText(/adres email/i)[0], "owner@example.com");
    await user.click(screen.getAllByRole("button", { name: /^Dołącz$/i })[0]);
    expect(screen.getByText(/zaznacz zgodę/i)).toBeInTheDocument();
    expect(fetch).not.toHaveBeenCalled();
  });

  it("submits the hero owner payload with Wave 1 source attribution after consent", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getAllByLabelText(/adres email/i)[0], "owner@example.com");
    await user.click(screen.getAllByRole("checkbox")[0]);
    await user.click(screen.getAllByRole("button", { name: /^Dołącz$/i })[0]);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const calls = (fetch as unknown as { mock: { calls: Array<[string, RequestInit]> } }).mock.calls;
    expect(JSON.parse(String(calls[0][1].body))).toMatchObject({
      email: "owner@example.com",
      role: "pet_owner",
      interestWave: "wave_1",
      source: "landing_page_hero",
      leadConsent: true,
      language: "pl"
    });
    expect(screen.getByText(/zapisaliśmy Twoje zainteresowanie/i)).toBeInTheDocument();
  });

  it("submits Wave 2 and Wave 3 as research-stage interest with optional context", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /jestem usługodawcą/i }));
    let dialog = within(screen.getByRole("dialog"));
    await user.type(dialog.getByLabelText(/adres email/i), "provider@example.com");
    await user.type(dialog.getByPlaceholderText(/nazwa firmy lub usługi/i), "Good Walks");
    await user.click(dialog.getByRole("checkbox"));
    await user.click(dialog.getByRole("button", { name: /jestem usługodawcą/i }));
    await user.click(dialog.getByRole("button", { name: /close/i }));

    await user.click(screen.getByRole("button", { name: /jestem kliniką lub wet/i }));
    dialog = within(screen.getByRole("dialog"));
    await user.type(dialog.getByLabelText(/adres email/i), "clinic@example.com");
    await user.type(dialog.getByPlaceholderText(/nazwa kliniki/i), "Vet Clinic");
    await user.click(dialog.getByRole("checkbox"));
    await user.click(dialog.getByRole("button", { name: /jestem kliniką lub wet/i }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    const leadCalls = (fetch as unknown as { mock: { calls: Array<[string, RequestInit]> } }).mock.calls;
    expect(JSON.parse(String(leadCalls[0][1].body))).toMatchObject({
      email: "provider@example.com",
      role: "pet_service_provider",
      interestWave: "wave_2",
      source: "landing_page_wave2",
      organization: "Good Walks"
    });
    expect(JSON.parse(String(leadCalls[1][1].body))).toMatchObject({
      email: "clinic@example.com",
      role: "clinic_vet",
      interestWave: "wave_3",
      source: "landing_page_wave3",
      organization: "Vet Clinic"
    });
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
    expect(screen.getByText(/wersja robocza/i)).toBeInTheDocument();

    unmount();
    window.history.pushState({}, "", "/medical-boundaries");
    render(<App />);

    expect(screen.getByRole("heading", { name: "Granice medyczne" })).toBeInTheDocument();
    expect(screen.getByText(/Caniello nie diagnozuje/i)).toBeInTheDocument();
  });
});
