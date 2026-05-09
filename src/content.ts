export type Language = "pl" | "en";

type Feature = {
  title: string;
  body: string;
};

type Step = {
  title: string;
  body: string;
};

type Copy = {
  languageName: string;
  navCta: string;
  navItems: string[];
  eyebrow: string;
  heroTitle: string;
  heroBody: string;
  heroProof: string;
  benefits: string[];
  primaryCta: string;
  secondaryNote: string;
  emailLabel: string;
  emailPlaceholder: string;
  emailError: string;
  emailSuccess: string;
  formHint: string;
  featuresTitle: string;
  features: Feature[];
  howTitle: string;
  steps: Step[];
  closingTitle: string;
  closingBody: string;
  closingBenefits: Feature[];
  trustTitle: string;
  trustBody: string;
  disclaimer: string;
  privacyNote: string;
  footerText: string;
};

export const copy: Record<Language, Copy> = {
  pl: {
    languageName: "Polski",
    navCta: "Dołącz do listy",
    navItems: ["Funkcje", "Jak działa", "Dla klinik", "O nas", "Kontakt"],
    eyebrow: "Cała opieka nad pupilem w jednym miejscu",
    heroTitle: "Lepsza opieka. Silniejsza więź.",
    heroBody:
      "Caniello to nowoczesna aplikacja dla opiekunów psów i kotów, która pomaga porządkować dokumenty zdrowotne, ustawiać przypomnienia i dzielić się informacjami o opiece z bliskimi oraz weterynarzem.",
    heroProof: "Stworzona dla opiekunów, którzy chcą mniej chaosu przed wizytą, wyjazdem i codzienną opieką.",
    benefits: [
      "Dokumenty i historia zdrowia",
      "Inteligentne przypomnienia",
      "Udostępnianie opieki rodzinie i weterynarzowi",
      "Bezpiecznie i prywatnie"
    ],
    primaryCta: "Zapisz mnie na listę",
    secondaryNote: "Szanujemy prywatność. Zero spamu.",
    emailLabel: "Adres email",
    emailPlaceholder: "Twój adres email",
    emailError: "Wpisz poprawny adres email.",
    emailSuccess: "Dziękujemy. Zapisaliśmy Twoje zainteresowanie pierwszą wersją Caniello.",
    formHint: "W tej wersji formularz pokazuje potwierdzenie lokalnie i nie wysyła danych na serwer.",
    featuresTitle: "Wszystko, czego potrzebujesz do opieki nad pupilem",
    features: [
      {
        title: "Dokumenty zdrowotne",
        body: "Przechowuj historię leczenia, szczepienia, wyniki badań i notatki w jednym bezpiecznym miejscu."
      },
      {
        title: "Smart reminders",
        body: "Nie przegap leków, szczepień, odrobaczania ani wizyt kontrolnych."
      },
      {
        title: "Dzielenie opieki",
        body: "Udostępniaj najważniejsze informacje rodzinie, opiekunowi, petsitterowi albo weterynarzowi."
      },
      {
        title: "Bezpiecznie i prywatnie",
        body: "Dane należą do Ciebie. Caniello pomaga je chronić i porządkować."
      }
    ],
    howTitle: "Jak działa Caniello",
    steps: [
      {
        title: "Dodaj pupila",
        body: "Utwórz profil i wpisz najważniejsze informacje w kilka minut."
      },
      {
        title: "Uporządkuj opiekę",
        body: "Dodaj dokumenty, ustaw przypomnienia i zbierz zalecenia w jednym miejscu."
      },
      {
        title: "Bądź na bieżąco",
        body: "Otrzymuj przypomnienia, udostępniaj kartę opieki i trzymaj wszystko pod ręką."
      }
    ],
    closingTitle: "Budujemy Caniello dla opiekunów takich jak Ty.",
    closingBody:
      "Dołącz do listy oczekujących, zdobądź wcześniejszy dostęp i pomóż nam ukształtować przyszłość spokojniejszej opieki nad zwierzętami.",
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
    footerText: "Aplikacja, która pomaga dbać lepiej, razem."
  },
  en: {
    languageName: "English",
    navCta: "Join Waitlist",
    navItems: ["Features", "How it works", "For clinics", "About", "Contact"],
    eyebrow: "All your pet care in one place",
    heroTitle: "Better care. Stronger bond.",
    heroBody:
      "Caniello is the modern pet care app that helps you manage health records, get reminders, and share care with the people and vets you trust.",
    heroProof: "For dog and cat owners who want less chaos before visits, travel, and everyday care.",
    benefits: [
      "Health records & documents",
      "Smart reminders",
      "Share care with family & vets",
      "Secure & private"
    ],
    primaryCta: "Join Waitlist",
    secondaryNote: "We respect your privacy. No spam, ever.",
    emailLabel: "Email address",
    emailPlaceholder: "Your email address",
    emailError: "Enter a valid email address.",
    emailSuccess: "Thank you. Your interest in the first Caniello version has been noted.",
    formHint: "In this version the form confirms locally and does not send data to a server.",
    featuresTitle: "Everything you need for your pet's care",
    features: [
      {
        title: "Health records",
        body: "Store all medical history, vaccines, tests and more in one secure place."
      },
      {
        title: "Smart reminders",
        body: "Never miss important medications, vaccines or appointments."
      },
      {
        title: "Care sharing",
        body: "Share care with family members, sitters or your vet."
      },
      {
        title: "Secure & private",
        body: "Your data is yours. We keep it safe and private."
      }
    ],
    howTitle: "How Caniello works",
    steps: [
      {
        title: "Add your pet",
        body: "Create a profile and add key information in minutes."
      },
      {
        title: "Organize care",
        body: "Store records, set reminders and upload documents."
      },
      {
        title: "Stay on top",
        body: "Get notified, share care and keep your pet healthy."
      }
    ],
    closingTitle: "We're building Caniello for pet parents like you.",
    closingBody: "Join the waitlist to get early access and help shape the future of pet care.",
    closingBenefits: [
      { title: "Early access", body: "Be the first to try Caniello." },
      { title: "Shape the product", body: "Your feedback matters." },
      { title: "Built with love", body: "For pets. For you." }
    ],
    trustTitle: "Caniello does not replace a veterinarian or passport.",
    trustBody:
      "It is a tool for organizing care information. Official pet passports remain documents issued by authorized veterinarians.",
    disclaimer:
      "Caniello does not provide diagnosis, treatment advice, service booking, or payments. The first version validates need and early interest.",
    privacyNote: "We respect your privacy. No spam, ever.",
    footerText: "The pet care app that helps you care better, together."
  }
};
