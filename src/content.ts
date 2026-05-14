export type Language = "pl" | "en";

export type LeadSource =
  | "landing_page_hero"
  | "landing_page_mid_cta"
  | "landing_page_footer"
  | "landing_page_wave2"
  | "landing_page_wave3";

export type Feature = {
  title: string;
  body: string;
};

type Step = {
  title: string;
  body: string;
};

export type LegalPageKey = "privacy" | "terms" | "medical-boundaries";

type LegalSection = {
  title: string;
  body: string[];
};

type LegalPage = {
  title: string;
  eyebrow: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

export type FutureWave = {
  wave: string;
  eyebrow: string;
  title: string;
  body: string;
  note: string;
  cta: string;
  timelineCta: string;
  highlights: Feature[];
  success: string;
};

export type WaveStoryStep = {
  wave: string;
  status: string;
  title: string;
  body: string;
  cta: string;
};

type Copy = {
  languageName: string;
  navCta: string;
  navItems: Array<{ label: string; href: string }>;
  eyebrow: string;
  heroTitle: string;
  heroBody: string;
  heroProof: string;
  benefits: string[];
  primaryCta: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailError: string;
  consentError: string;
  submitError: string;
  pending: string;
  emailSuccess: string;
  formHint: string;
  leadConsentLabel: string;
  privacyLinkLabel: string;
  analyticsTitle: string;
  analyticsBody: string;
  analyticsAccept: string;
  analyticsDecline: string;
  analyticsSaved: string;
  featuresTitle: string;
  features: Feature[];
  howTitle: string;
  steps: Step[];
  futureTitle: string;
  futureBody: string;
  futureResearchNote: string;
  futureFoundation: WaveStoryStep;
  futureWaves: [FutureWave, FutureWave];
  closingTitle: string;
  closingBody: string;
  closingBenefits: Feature[];
  trustTitle: string;
  trustBody: string;
  disclaimer: string;
  privacyNote: string;
  footerSignupTitle: string;
  footerSignupBody: string;
  footerText: string;
  footerLinks: Array<{ label: string; href: string }>;
  footerContactLabel: string;
  footerContactEmail: string;
  legalBackLabel: string;
  legalDraftNotice: string;
  legalPages: Record<LegalPageKey, LegalPage>;
};

export const copy: Record<Language, Copy> = {
  pl: {
    languageName: "Polski",
    navCta: "Dołącz do listy",
    navItems: [
      { label: "Funkcje", href: "#features" },
      { label: "Jak działa", href: "#how-it-works" },
      { label: "Co dalej", href: "#future-waves" },
      { label: "Zaufanie", href: "#trust" }
    ],
    eyebrow: "Spokojniejsza opieka zaczyna się od porządku",
    heroTitle: "Cała opieka nad pupilem. Zawsze pod ręką.",
    heroBody:
      "Caniello porządkuje historię zdrowia, dokumenty, przypomnienia i najważniejsze informacje o pupilu, żeby łatwiej dbać o niego na co dzień i bezpiecznie dzielić się opieką.",
    heroProof: "Mniej szukania. Więcej pewności przed wizytą, wyjazdem i codzienną opieką.",
    benefits: [
      "Dokumenty i historia zdrowia",
      "Przypomnienia o lekach, szczepieniach i wizytach",
      "Udostępnianie wyłącznie za zgodą opiekuna",
      "Prywatne miejsce na informacje o pupilu"
    ],
    primaryCta: "Dołącz",
    emailLabel: "Adres e-mail",
    emailPlaceholder: "Twój adres e-mail",
    emailError: "Wpisz poprawny adres e-mail.",
    consentError: "Zaznacz zgodę, aby wysłać formularz.",
    submitError: "Nie udało się wysłać formularza. Spróbuj ponownie.",
    pending: "Wysyłamy...",
    emailSuccess: "Dziękujemy. Zapisaliśmy Cię na listę Caniello.",
    formHint: "Wysyłka wymaga zgody. Dane trafiają do bezpiecznego procesu listy zainteresowanych.",
    leadConsentLabel:
      "Wyrażam zgodę na kontakt mailowy w sprawie Caniello oraz zapis moich danych z tego formularza w celu obsługi listy zainteresowanych.",
    privacyLinkLabel: "Polityka prywatności",
    analyticsTitle: "Pomóż nam mierzyć zainteresowanie",
    analyticsBody:
      "Za Twoją zgodą zapiszemy anonimowe zdarzenia walidacyjne, takie jak odsłona strony i skuteczność formularzy. Bez tej zgody analityka pozostaje wyłączona.",
    analyticsAccept: "Zgadzam się",
    analyticsDecline: "Nie teraz",
    analyticsSaved: "Preferencja analityki zapisana.",
    featuresTitle: "Od dokumentów po przypomnienia - wszystko dla codziennej opieki",
    features: [
      {
        title: "Historia zdrowia",
        body: "Zbierz szczepienia, wizyty, alergie, leki, wyniki badań i notatki w jednym uporządkowanym miejscu."
      },
      {
        title: "Inteligentne przypomnienia",
        body: "Pilnuj leków, szczepień, odrobaczania i kontroli bez zgadywania, co było zapisane ostatnio."
      },
      {
        title: "Dzielenie opieki",
        body: "Udostępniaj najważniejsze informacje rodzinie, opiekunowi tymczasowemu lub klinice weterynaryjnej tylko wtedy, gdy tego chcesz."
      },
      {
        title: "Bezpiecznie i prywatnie",
        body: "Caniello porządkuje dane opiekuna. Nie zastępuje lekarza, diagnozy ani oficjalnego paszportu."
      }
    ],
    howTitle: "Jak działa Caniello",
    steps: [
      { title: "Dodaj pupila", body: "Utwórz profil i zapisz najważniejsze informacje w kilka minut." },
      { title: "Uporządkuj opiekę", body: "Dodaj dokumenty, ustaw przypomnienia i zbierz zalecenia w jednym miejscu." },
      { title: "Bądź na bieżąco", body: "Korzystaj z przypomnień i udostępniaj kartę opieki wybranym osobom." }
    ],
    futureTitle: "Co dalej",
    futureBody:
      "Zaczynamy od podstaw i rozwijamy Caniello etapami. Każdy obszar prowadzi do własnego widoku, w którym pokazujemy założenia, status prac i planowany zakres.",
    futureResearchNote: "Badanie w toku - kolejne etapy zależą od potwierdzonego popytu.",
    futureFoundation: {
      wave: "Dzisiaj",
      status: "Badanie rynku",
      title: "Opieka",
      body: "Walidujemy pierwszą wersję, która daje opiekunowi porządek w historii zdrowia, dokumentach, przypomnieniach i najważniejszych danych pupila.",
      cta: "Poznaj opiekę"
    },
    futureWaves: [
      {
        wave: "Następnie",
        eyebrow: "Badanie potrzeb usługodawców",
        title: "Rynek usług",
        body: "Sprawdzamy, jak Caniello może pomagać opiekunom znaleźć sprawdzoną pomoc wtedy, gdy codzienna opieka potrzebuje wsparcia.",
        note: "To nie jest aktywny rynek usług, rezerwacje ani płatności.",
        cta: "Dołącz do listy",
        timelineCta: "Poznaj rynek usług",
        highlights: [
          { title: "Zweryfikowani dostawcy", body: "Tylko sprawdzone usługi i opiekunowie." },
          { title: "Dopasowanie do potrzeb", body: "Rekomendacje dopasowane do Twojego pupila." },
          { title: "Wygoda i transparentność", body: "Łatwe porównanie, rezerwacje i jasne informacje." }
        ],
        success: "Dziękujemy. Zapisaliśmy Cię na listę Caniello. Szczegóły zbierzemy później w ankiecie."
      },
      {
        wave: "Przyszłość",
        eyebrow: "Eksploracja współpracy z klinikami",
        title: "Kliniki",
        body: "Badamy rozwiązanie, które daje klinice lepszy kontekst pacjenta dzięki informacjom udostępnionym przez opiekuna.",
        note: "To nie jest jeszcze aktywny portal kliniczny, integracja medyczna ani system leczenia.",
        cta: "Dołącz do listy",
        timelineCta: "Poznaj kliniki",
        highlights: [
          { title: "Dane od lekarza", body: "Szybkie dodawanie informacji z wizyty do historii pacjenta." },
          { title: "Historia zwierzęcia", body: "Szczepienia, wyniki, dokumenty i zalecenia widoczne w jednym miejscu." },
          { title: "Zgoda klienta", body: "Klinika widzi informacje udostępnione przez opiekuna zwierzęcia." }
        ],
        success: "Dziękujemy. Zapisaliśmy Cię na listę Caniello. Szczegóły zbierzemy później w ankiecie."
      }
    ],
    closingTitle: "Budujemy Caniello z opiekunami.",
    closingBody:
      "Dołącz do listy oczekujących, zdobądź wcześniejszy dostęp i pomóż nam ukształtować pierwszą wersję spokojniejszej opieki nad zwierzętami.",
    closingBenefits: [
      { title: "Wczesny dostęp", body: "Bądź jedną z pierwszych osób testujących Caniello." },
      { title: "Wpływ na produkt", body: "Twoja opinia pomoże ustalić priorytety pierwszej wersji." },
      { title: "Tworzone z troską", body: "Dla zwierząt. Dla opiekunów. Bez nadęcia." }
    ],
    trustTitle: "Caniello nie zastępuje lekarza ani paszportu.",
    trustBody:
      "To narzędzie do organizacji informacji o opiece. Oficjalne paszporty dla zwierząt pozostają dokumentami wydawanymi przez uprawnionych lekarzy weterynarii.",
    disclaimer:
      "Caniello nie oferuje diagnozy, porad leczenia, rezerwacji usług ani płatności. Pierwsza wersja służy walidacji potrzeby i listy zainteresowanych.",
    privacyNote: "Szanujemy Twoją prywatność. Bez spamu.",
    footerSignupTitle: "Chcesz spokojniejszej opieki nad pupilem?",
    footerSignupBody: "Zapisz się na końcu strony bez wracania do góry.",
    footerText: "Aplikacja, która pomaga dbać lepiej, razem.",
    footerLinks: [
      { label: "Polityka prywatności", href: "/privacy" },
      { label: "Regulamin", href: "/terms" },
      { label: "Granice medyczne", href: "/medical-boundaries" }
    ],
    footerContactLabel: "Kontakt",
    footerContactEmail: "hello@caniello.com",
    legalBackLabel: "Wróć do strony głównej",
    legalDraftNotice:
      "Wersja robocza do zatwierdzenia przed publikacją. Wymaga uzupełnienia formalnych danych administratora oraz finalnej weryfikacji prawnej.",
    legalPages: {
      privacy: {
        title: "Polityka prywatności",
        eyebrow: "Prywatność i zgody",
        intro:
          "Ta polityka wyjaśnia, jakie dane zbieramy na stronie Caniello, w jakim celu i jakie prawa przysługują osobom, które zostawiają swoje dane.",
        updated: "Ostatnia aktualizacja: 12 maja 2026",
        sections: [
          {
            title: "Administrator i kontakt",
            body: [
              "Administratorem danych jest operator projektu Caniello. Formalna nazwa administratora, adres i ewentualny inspektor ochrony danych zostaną uzupełnione przed publikacją.",
              "W sprawach prywatności można skontaktować się przez hello@caniello.com."
            ]
          },
          {
            title: "Jakie dane zbieramy",
            body: [
              "Gdy użytkownik dołącza do listy zainteresowanych, przetwarzamy adres e-mail, źródło formularza, język strony, zgodę oraz parametry UTM, jeśli są dostępne. Segmentacja i dodatkowe pytania będą realizowane później w ankiecie MailerLite.",
              "Po zgodzie analitycznej możemy zapisywać anonimowe zdarzenia walidacyjne, takie jak odsłona strony, wysłanie formularza i wynik formularza. Bez tej zgody nie wysyłamy niekoniecznych zdarzeń analitycznych."
            ]
          },
          {
            title: "Cele i podstawy przetwarzania",
            body: [
              "Dane z formularzy przetwarzamy, aby obsłużyć listę zainteresowanych, kontaktować się w sprawie Caniello i prowadzić badania potrzeb dla kolejnych etapów produktu. Podstawą jest zgoda osoby wysyłającej formularz.",
              "Dane techniczne i zdarzenia walidacyjne przetwarzamy wyłącznie w zakresie potrzebnym do sprawdzenia zainteresowania stroną i poprawy doświadczenia użytkownika, gdy użytkownik wyrazi zgodę analityczną."
            ]
          },
          {
            title: "Odbiorcy danych",
            body: [
              "Dane mogą być przekazywane dostawcom technicznym potrzebnym do działania strony, formularzy, hostingu, poczty i listy zainteresowanych, w tym MailerLite po skonfigurowaniu środowiska produkcyjnego.",
              "Jeżeli dostawca przetwarza dane poza Europejskim Obszarem Gospodarczym, przed publikacją należy potwierdzić właściwe zabezpieczenia transferu danych."
            ]
          },
          {
            title: "Okres przechowywania",
            body: [
              "Dane z listy zainteresowanych przechowujemy do czasu wycofania zgody, zakończenia walidacji danego etapu produktu albo usunięcia listy zainteresowanych.",
              "Preferencja analityczna jest zapisywana lokalnie w przeglądarce, aby nie pytać ponownie przy każdej wizycie."
            ]
          },
          {
            title: "Prawa użytkownika",
            body: [
              "Użytkownik może żądać dostępu do danych, sprostowania, usunięcia, ograniczenia przetwarzania, przeniesienia danych, wniesienia sprzeciwu oraz wycofania zgody.",
              "Użytkownik ma też prawo złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych."
            ]
          }
        ]
      },
      terms: {
        title: "Regulamin",
        eyebrow: "Zasady korzystania",
        intro:
          "Ten regulamin opisuje zasady korzystania ze strony Caniello i formularzy zainteresowania. Nie jest regulaminem pełnej aplikacji produkcyjnej.",
        updated: "Ostatnia aktualizacja: 12 maja 2026",
        sections: [
          {
            title: "Charakter strony",
            body: [
              "Strona służy przedstawieniu koncepcji Caniello oraz zebraniu zainteresowania pierwszą wersją produktu i przyszłymi badaniami.",
              "Wysłanie formularza nie tworzy konta, nie zawiera umowy o świadczenie usługi aplikacyjnej i nie gwarantuje dostępu w określonym terminie."
            ]
          },
          {
            title: "Formularze i kontakt",
            body: [
              "Użytkownik powinien podawać prawdziwy adres e-mail i dane, do których ma prawo.",
              "Caniello może kontaktować się z użytkownikiem w sprawie listy zainteresowanych, badań produktu, zaproszeń do testów i informacji o rozwoju usługi, zgodnie z udzieloną zgodą."
            ]
          },
          {
            title: "Zakres niedostępny na tym etapie",
            body: [
              "Strona nie oferuje diagnozy, porad leczenia, rezerwacji usług, płatności, kont użytkowników, oficjalnych dokumentów ani zastępstwa dla paszportu zwierzęcia.",
              "Rynek usług i Kliniki są opisane jako badanie potrzeb, nie jako dostępne produkty usługowe, kliniczne ani medyczne."
            ]
          },
          {
            title: "Dostępność i zmiany",
            body: [
              "Strona może być zmieniana, czasowo niedostępna lub wyłączona w trakcie walidacji.",
              "Treść, zakres produktu i kolejność funkcji mogą się zmieniać na podstawie wyników badań i decyzji zespołu."
            ]
          },
          {
            title: "Kontakt",
            body: ["Pytania dotyczące strony lub formularzy można wysłać na hello@caniello.com."]
          }
        ]
      },
      "medical-boundaries": {
        title: "Granice medyczne",
        eyebrow: "Bezpieczeństwo i odpowiedzialność",
        intro:
          "Caniello ma pomagać organizować informacje o opiece nad pupilem. Nie jest narzędziem diagnostycznym, medycznym ani zamiennikiem kontaktu z lekarzem weterynarii.",
        updated: "Ostatnia aktualizacja: 12 maja 2026",
        sections: [
          {
            title: "Caniello nie diagnozuje",
            body: [
              "Caniello nie rozpoznaje chorób, nie interpretuje objawów jako diagnozy i nie zaleca leczenia.",
              "W przypadku niepokojących objawów, bólu, urazu, zatrucia, duszności, nagłej zmiany zachowania lub pogorszenia stanu zwierzęcia należy skontaktować się z lekarzem weterynarii lub najbliższą placówką dyżurną."
            ]
          },
          {
            title: "Dokumenty i paszport",
            body: [
              "Caniello może pomagać przechowywać i porządkować kopie informacji, ale nie zastępuje oficjalnych dokumentów.",
              "Oficjalny paszport dla zwierzęcia pozostaje dokumentem wydawanym przez uprawnionego lekarza weterynarii."
            ]
          },
          {
            title: "Przypomnienia i udostępnianie",
            body: [
              "Przypomnienia mają charakter organizacyjny. Nie powinny zastępować zaleceń lekarza ani indywidualnego planu opieki.",
              "Udostępnianie informacji powinno odbywać się wyłącznie świadomie i tylko osobom, którym opiekun chce przekazać dane o pupilu."
            ]
          },
          {
            title: "Przyszłe funkcje AI",
            body: [
              "Jeżeli Caniello będzie w przyszłości korzystać z AI do porządkowania dokumentów lub podsumowań, wyniki będą wymagały kontroli użytkownika i nie będą stanowiły porady medycznej.",
              "Decyzje o leczeniu, dawkowaniu leków i zabiegach należą do lekarza weterynarii."
            ]
          }
        ]
      }
    }
  },
  en: {
    languageName: "English",
    navCta: "Join Waitlist",
    navItems: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "What's next", href: "#future-waves" },
      { label: "Trust", href: "#trust" }
    ],
    eyebrow: "Calmer pet care starts with clarity",
    heroTitle: "Your pet's care. Always within reach.",
    heroBody:
      "Caniello organizes health history, documents, reminders, and essential pet details so everyday care feels easier and sharing stays in the caregiver's control.",
    heroProof: "Less searching. More confidence before visits, travel, and daily care.",
    benefits: [
      "Health records and documents",
      "Medication, vaccine, and visit reminders",
      "Caregiver-controlled sharing",
      "A private place for pet care information"
    ],
    primaryCta: "Join",
    emailLabel: "Email address",
    emailPlaceholder: "Your email address",
    emailError: "Enter a valid email address.",
    consentError: "Confirm consent before sending the form.",
    submitError: "We could not send the form. Please try again.",
    pending: "Sending...",
    emailSuccess: "Thank you. You're on the Caniello waitlist.",
    formHint: "Submission requires consent. Data is sent to the waitlist process.",
    leadConsentLabel:
      "I agree that Caniello may contact me by email and store the data from this form to manage waitlist or research-interest follow-up.",
    privacyLinkLabel: "Privacy Policy",
    analyticsTitle: "Help us measure interest",
    analyticsBody:
      "With your consent, we will store anonymous validation events such as page views and form outcomes. Without it, non-essential analytics stay off.",
    analyticsAccept: "Allow",
    analyticsDecline: "Not now",
    analyticsSaved: "Analytics preference saved.",
    featuresTitle: "From records to reminders, everything for everyday care",
    features: [
      {
        title: "Health history",
        body: "Keep vaccinations, visits, allergies, medication, tests, and notes in one organized place."
      },
      {
        title: "Smart reminders",
        body: "Stay on top of medication, vaccines, deworming, and checkups without guessing what was last written down."
      },
      {
        title: "Care sharing",
        body: "Share key details with family, sitters, or veterinary clinics only when you choose to."
      },
      {
        title: "Secure & private",
        body: "Caniello organizes caregiver-held data. It does not replace veterinary clinics, diagnoses, or official passports."
      }
    ],
    howTitle: "How Caniello works",
    steps: [
      { title: "Add your pet", body: "Create a profile and save the details that matter in minutes." },
      { title: "Organize care", body: "Add documents, set reminders, and collect care notes in one place." },
      { title: "Stay on top", body: "Use reminders and share a care card with the people you choose." }
    ],
    futureTitle: "What's next",
    futureBody:
      "We're building Caniello in stages. Each area opens into its own view with the product assumptions, current status, and planned scope.",
    futureResearchNote: "Research in progress - future stages depend on validated demand.",
    futureFoundation: {
      wave: "Today",
      status: "Market research",
      title: "Care",
      body: "We're validating a first version that gives caregivers clarity across health history, documents, reminders, and essential pet details.",
      cta: "Explore Care"
    },
    futureWaves: [
      {
        wave: "Next",
        eyebrow: "Provider research",
        title: "Marketplace",
        body: "We're researching how Caniello could help caregivers find trusted support when everyday pet care needs an extra hand.",
        note: "This is not an active service directory, booking flow, or payment product.",
        cta: "Join Waitlist",
        timelineCta: "Explore Marketplace",
        highlights: [
          { title: "Verified providers", body: "Only trusted services and pet care professionals." },
          { title: "Needs-based matching", body: "Recommendations shaped around your pet." },
          { title: "Convenience and clarity", body: "Easier comparison, booking, and transparent information." }
        ],
        success: "Thank you. You're on the Caniello waitlist. We'll collect details later in a survey."
      },
      {
        wave: "Future",
        eyebrow: "Clinic collaboration exploration",
        title: "Clinic",
        body: "We're researching a clinic solution that gives veterinary teams clearer patient context through information shared by the caregiver.",
        note: "This is not yet an active clinic portal, medical integration, or treatment system.",
        cta: "Join Waitlist",
        timelineCta: "Explore Clinic",
        highlights: [
          { title: "Vet-entered data", body: "Quickly add visit information to the patient's history." },
          { title: "Pet history", body: "Vaccines, results, documents, and recommendations visible in one place." },
          { title: "Client consent", body: "The clinic sees information shared by the pet caregiver." }
        ],
        success: "Thank you. You're on the Caniello waitlist. We'll collect details later in a survey."
      }
    ],
    closingTitle: "We're building Caniello with pet caregivers.",
    closingBody: "Join the waitlist to get early access and help shape the first version of calmer pet care.",
    closingBenefits: [
      { title: "Early access", body: "Be one of the first people to try Caniello." },
      { title: "Shape the product", body: "Your feedback helps set the priorities for version one." },
      { title: "Built with care", body: "For pets. For caregivers. Without the fluff." }
    ],
    trustTitle: "Caniello does not replace a veterinarian or passport.",
    trustBody:
      "It is a tool for organizing care information. Official pet passports remain documents issued by authorized veterinarians.",
    disclaimer:
      "Caniello does not provide diagnosis, treatment advice, service booking, or payments. The first version validates need and early interest.",
    privacyNote: "We respect your privacy. No spam, ever.",
    footerSignupTitle: "Want calmer pet care?",
    footerSignupBody: "Join from the end of the page without scrolling back up.",
    footerText: "The pet care app that helps you care better, together.",
    footerLinks: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Medical boundaries", href: "/medical-boundaries" }
    ],
    footerContactLabel: "Contact",
    footerContactEmail: "hello@caniello.com",
    legalBackLabel: "Back to home",
    legalDraftNotice:
      "Draft for approval before publication. Formal controller details and final legal review must be completed before launch.",
    legalPages: {
      privacy: {
        title: "Privacy Policy",
        eyebrow: "Privacy and consent",
        intro:
          "This policy explains what data the Caniello landing page collects, why we collect it, and what rights people have when they leave their details.",
        updated: "Last updated: May 12, 2026",
        sections: [
          {
            title: "Controller and contact",
            body: [
              "The data controller is the operator of the Caniello project. The formal controller name, address, and any data protection officer details must be completed before publication.",
              "For privacy questions, contact hello@caniello.com."
            ]
          },
          {
            title: "Data we collect",
            body: [
              "When someone joins the waitlist, we process email address, form source, page language, consent state, and UTM parameters when available. Segmentation and additional questions will be handled later through a MailerLite survey.",
              "After analytics consent, we may store anonymous validation events such as page views, form submissions, and form outcomes. Without that consent, non-essential analytics events stay off."
            ]
          },
          {
            title: "Purposes and legal basis",
            body: [
              "We process form data to manage the waitlist, contact people about Caniello, and research demand for future product stages. The legal basis is the consent given when submitting the form.",
              "We process technical and validation-event data only as needed to measure interest and improve the landing experience, when analytics consent is granted."
            ]
          },
          {
            title: "Recipients",
            body: [
              "Data may be shared with technical providers needed for hosting, forms, email, and waitlist management, including MailerLite once production configuration is in place.",
              "If a provider processes data outside the European Economic Area, appropriate transfer safeguards must be confirmed before publication."
            ]
          },
          {
            title: "Retention",
            body: [
              "Waitlist and research-interest data is kept until consent is withdrawn, the relevant validation stage ends, or the waitlist is deleted.",
              "The analytics preference is stored locally in the browser so the page does not ask again on every visit."
            ]
          },
          {
            title: "Your rights",
            body: [
              "People can request access, correction, deletion, restriction, portability, objection, and withdrawal of consent.",
              "People also have the right to complain to the Polish Data Protection Authority."
            ]
          }
        ]
      },
      terms: {
        title: "Terms of Service",
        eyebrow: "Usage rules",
        intro:
          "These terms describe use of the Caniello landing page and interest forms. They are not the terms for a full production app.",
        updated: "Last updated: May 12, 2026",
        sections: [
          {
            title: "Purpose of the page",
            body: [
              "The page presents the Caniello concept and collects interest in the first product version and future research.",
              "Submitting a form does not create an account, form a production app service agreement, or guarantee access by a specific date."
            ]
          },
          {
            title: "Forms and contact",
            body: [
              "Users should provide a real email address and only data they are allowed to share.",
              "Caniello may contact users about waitlist status, product research, test invitations, and service development according to the consent provided."
            ]
          },
          {
            title: "Unavailable scope",
            body: [
              "The landing page does not provide diagnosis, treatment advice, booking, payments, user accounts, official documents, or replacement for an official pet passport.",
              "Next and Future are presented as research, not as active service, clinic, or medical products."
            ]
          },
          {
            title: "Availability and changes",
            body: [
              "The page may change, be temporarily unavailable, or be switched off during validation.",
              "Product scope, content, and feature order may change based on research results and team decisions."
            ]
          },
          {
            title: "Contact",
            body: ["Questions about the page or forms can be sent to hello@caniello.com."]
          }
        ]
      },
      "medical-boundaries": {
        title: "Medical boundaries",
        eyebrow: "Safety and responsibility",
        intro:
          "Caniello is intended to help organize pet-care information. It is not a diagnostic or medical tool and does not replace a veterinarian.",
        updated: "Last updated: May 12, 2026",
        sections: [
          {
            title: "Caniello does not diagnose",
            body: [
              "Caniello does not identify diseases, interpret symptoms as a diagnosis, or recommend treatment.",
              "If a pet has worrying symptoms, pain, injury, suspected poisoning, breathing trouble, sudden behavior changes, or worsening condition, contact a veterinarian or emergency clinic."
            ]
          },
          {
            title: "Documents and passport",
            body: [
              "Caniello may help store and organize copies of information, but it does not replace official documents.",
              "An official pet passport remains a document issued by an authorized veterinarian."
            ]
          },
          {
            title: "Reminders and sharing",
            body: [
              "Reminders are organizational. They should not replace veterinary instructions or an individual care plan.",
              "Information should be shared deliberately and only with people the owner chooses."
            ]
          },
          {
            title: "Future AI features",
            body: [
              "If Caniello later uses AI to organize documents or summaries, outputs will require user review and will not be medical advice.",
              "Treatment, medication dosage, and procedure decisions belong with a veterinarian."
            ]
          }
        ]
      }
    }
  }
};
