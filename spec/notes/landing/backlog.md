Recommended route:

* Lead: CTO
* Supporting: CSO, COO

Executive read: landing page ma pozostać stroną walidacyjną dla Wave 1 MVP, z lekkim sygnałem przyszłych Wave 2 i Wave 3. Caniello strategicznie startuje od pet health records, reminders, document vault i trusted sharing, a marketplace oraz clinic SaaS powinny poczekać do walidacji owner-side retention  ￼. MailerLite powinien obsługiwać waitlistę, segmentację leadów i automatyczne sekwencje emailowe.

Opis funkcjonalny — Caniello Landing Page

Cel strony

Landing page ma:

1. wyjaśnić wartość MVP dla właścicieli zwierząt,
2. zbierać zapisy na waitlistę,
3. segmentować zainteresowanie rynku: pet owner, pet service provider, clinic/vet,
4. komunikować przyszłe kierunki Wave 2 i Wave 3 jako research / exploration, nie jako obiecany produkt,
5. przekazywać leady do MailerLite.

Caniello jest produktem rynkowym skoncentrowanym na pet health records, reminders i trusted sharing  ￼. Problemem, który adresuje, jest fragmentacja informacji zdrowotnych zwierzęcia między papierowymi dokumentami, wiadomościami, systemami klinik i pamięcią właściciela  ￼.

⸻

Feature 1 — Hero section

Opis

Sekcja otwierająca landing page pokazuje główną obietnicę MVP:

Better care. Stronger bond.

Hero powinno komunikować, że Caniello pomaga właścicielom:

* przechowywać health records,
* otrzymywać smart reminders,
* przechowywać ważne dokumenty,
* dzielić się opieką z rodziną i weterynarzem.

CTA:

* email input,
* Join Waitlist,
* komunikat prywatności: “We respect your privacy. No spam, ever.”

User Stories

US-1.1 — Zrozumienie wartości produktu

Jako właściciel zwierzęcia, chcę od razu zrozumieć, co daje mi Caniello, abym mógł zdecydować, czy warto dołączyć do waitlisty.

Acceptance Criteria

* Użytkownik widzi headline i krótki opis produktu nad foldem.
* Użytkownik widzi mockup aplikacji pokazujący rekordy, reminders i sharing.
* CTA Join Waitlist jest widoczne bez scrollowania.

US-1.2 — Szybki zapis na waitlistę

Jako zainteresowany użytkownik, chcę wpisać email i dołączyć do waitlisty bez zakładania konta.

Acceptance Criteria

* Pole email waliduje poprawny format adresu.
* Po kliknięciu Join Waitlist użytkownik otrzymuje informację o sukcesie lub błędzie.
* Email zostaje przekazany do MailerLite.
* Domyślny segment użytkownika to pet_owner, jeśli formularz nie wymaga wyboru roli.

⸻

Feature 2 — MVP value features

Opis

Sekcja pokazuje cztery główne funkcje MVP:

1. Health records
2. Smart reminders
3. Care sharing
4. Secure & private

To musi być główny środek ciężkości strony, ponieważ MVP wedge obejmuje pet profile, reminders, document vault, shareable care card / PDF export i family/caregiver sharing  ￼.

User Stories

US-2.1 — Health records

Jako właściciel zwierzęcia, chcę zrozumieć, że mogę trzymać historię medyczną, szczepienia, testy i ważne informacje w jednym miejscu.

Acceptance Criteria

* Sekcja zawiera kartę Health records.
* Copy mówi o historii medycznej, szczepieniach, badaniach i dokumentach.
* Nie sugeruje zastąpienia oficjalnego EU pet passport, zgodnie ze strategicznym ograniczeniem Caniello  ￼.

US-2.2 — Smart reminders

Jako właściciel zwierzęcia, chcę wiedzieć, że Caniello przypomni mi o ważnych wydarzeniach zdrowotnych.

Acceptance Criteria

* Sekcja zawiera kartę Smart reminders.
* Copy obejmuje medication, vaccines, appointments, deworming lub visits.
* Nie sugeruje diagnozy ani porad medycznych AI.

US-2.3 — Care sharing

Jako właściciel zwierzęcia, chcę bezpiecznie podzielić się informacjami z rodziną, opiekunem lub weterynarzem.

Acceptance Criteria

* Sekcja zawiera kartę Care sharing.
* Copy wyjaśnia owner-controlled sharing.
* Komunikacja podkreśla, że użytkownik kontroluje, z kim i czym się dzieli.

US-2.4 — Secure & private

Jako użytkownik, chcę wiedzieć, że moje dane są prywatne i bezpieczne.

Acceptance Criteria

* Sekcja zawiera kartę Secure & private.
* Copy mówi, że dane należą do użytkownika.
* Strona linkuje do Privacy Policy.

⸻

Feature 3 — How Caniello works

Opis

Sekcja wyjaśnia prosty proces używania MVP:

1. Add your pet
2. Organize care
3. Stay on top

User Stories

US-3.1 — Zrozumienie procesu startu

Jako właściciel zwierzęcia, chcę zobaczyć, jak proste będzie rozpoczęcie korzystania z Caniello.

Acceptance Criteria

* Sekcja pokazuje 3 kroki.
* Każdy krok ma tytuł i krótki opis.
* Proces nie wymaga integracji z kliniką ani płatności.

US-3.2 — Redukcja obawy przed złożonością

Jako użytkownik, chcę wiedzieć, że nie muszę mieć kompletnej dokumentacji, aby zacząć.

Acceptance Criteria

* Copy sugeruje szybkie dodanie profilu i podstawowych informacji.
* Strona nie sugeruje konieczności importu danych z systemów klinicznych w MVP.

⸻

Feature 4 — Waitlist CTA block

Opis

Druga sekcja CTA wzmacnia zapis na waitlistę po wyjaśnieniu wartości MVP.

Elementy:

* headline: “We’re building Caniello for pet parents like you.”
* email input,
* Join Waitlist,
* benefits: Early access, Shape the product, Built with love.

User Stories

US-4.1 — Zapis po zrozumieniu wartości

Jako użytkownik, który przeczytał stronę, chcę mieć możliwość zapisania się bez wracania do góry.

Acceptance Criteria

* CTA znajduje się w środku lub dolnej części landing page.
* Formularz działa tak samo jak formularz w hero.
* Lead jest wysyłany do MailerLite z tym samym schematem pól.

US-4.2 — Potwierdzenie motywacji użytkownika

Jako founder, chcę wiedzieć, czy użytkownik zapisuje się jako owner, clinic/vet czy service provider.

Acceptance Criteria

* Formularz może zawierać wybór roli albo ukryty default pet_owner.
* Role są zapisywane jako custom field lub group w MailerLite.
* Możliwe wartości: pet_owner, clinic_vet, pet_service_provider.

⸻

Feature 5 — What’s next / Waves section

Opis

Sekcja komunikuje przyszłą wizję, ale nie rozciąga zakresu MVP.

Copy główne:

What’s next
“We’re starting with the essentials: health records, reminders, documents, and trusted sharing.”

Karty:

* Wave 2 — Trusted pet services
* Wave 3 — Clinic collaboration

Status:

* Research in progress
* Future waves depend on validated demand

To jest zgodne ze strategią: marketplace i clinic SaaS nie powinny być częścią początkowego MVP i powinny poczekać na owner-side retention  ￼.

User Stories

US-5.1 — Komunikacja Wave 2 bez obietnicy produktu

Jako pet service provider, chcę zrozumieć, że Caniello bada przyszły marketplace, ale jeszcze go nie uruchamia.

Acceptance Criteria

* Karta Wave 2 zawiera etykietę Research albo Exploration.
* Copy mówi: “We’re researching a curated way for pet owners to discover trusted pet-related services and providers.”
* CTA: I’m a pet service provider.
* Kliknięcie CTA otwiera formularz zainteresowania lub zapisuje lead z rolą pet_service_provider.

US-5.2 — Komunikacja Wave 3 bez obietnicy clinic SaaS

Jako klinika lub weterynarz, chcę zrozumieć, że Caniello bada przyszłą współpracę z klinikami.

Acceptance Criteria

* Karta Wave 3 zawiera etykietę Research.
* Copy mówi: “We’re exploring tools that help clinics and vets work with owner-approved pet health context.”
* CTA: I’m a clinic or vet.
* Kliknięcie CTA otwiera formularz zainteresowania lub zapisuje lead z rolą clinic_vet.

US-5.3 — Ochrona strategicznego scope MVP

Jako founder, chcę komunikować większą wizję bez sprawiania wrażenia, że marketplace i clinics są częścią MVP.

Acceptance Criteria

* Sekcja zawiera tekst: “Future waves depend on validated demand.”
* Marketplace nie występuje w głównej nawigacji jako aktywny produkt.
* For clinics nie jest prezentowane jako gotowy produkt B2B.
* Copy nie zawiera “coming soon”, “launching next”, “available now”.

⸻

Feature 6 — Segmented interest capture

Opis

Landing page powinien zbierać trzy typy zainteresowania:

1. Pet owner
2. Pet service provider
3. Clinic / vet

Caniello ma w audience właścicieli, caregivers, weterynarzy i pet service providers  ￼, więc segmentacja leadów jest ważna już na etapie waitlisty.

User Stories

US-6.1 — Owner waitlist

Jako pet owner, chcę dołączyć do waitlisty MVP.

Acceptance Criteria

* Lead zapisuje się z rolą pet_owner.
* Lead trafia do MailerLite group Caniello - Pet Owners.
* Lead otrzymuje email powitalny dla ownerów.

US-6.2 — Provider interest

Jako pet service provider, chcę zgłosić zainteresowanie przyszłym marketplace.

Acceptance Criteria

* Lead zapisuje się z rolą pet_service_provider.
* Lead trafia do MailerLite group Caniello - Service Providers.
* Formularz może zawierać opcjonalne pola: business name, service category, location, website.

US-6.3 — Clinic / vet interest

Jako klinika lub weterynarz, chcę zgłosić zainteresowanie przyszłą współpracą.

Acceptance Criteria

* Lead zapisuje się z rolą clinic_vet.
* Lead trafia do MailerLite group Caniello - Clinics & Vets.
* Formularz może zawierać opcjonalne pola: clinic name, role, country, website.

⸻

Feature 7 — MailerLite integration

Opis

Landing page powinien integrować się z MailerLite w celu obsługi:

* waitlisty,
* segmentacji leadów,
* automatycznych emaili powitalnych,
* przyszłych kampanii researchowych.

MailerLite API pozwala tworzyć lub aktualizować subskrybenta przez endpoint POST https://connect.mailerlite.com/api/subscribers; jeżeli subskrybent już istnieje, zostaje zaktualizowany w sposób niedestrukcyjny  ￼. MailerLite obsługuje też groups, które można pobierać przez GET https://connect.mailerlite.com/api/groups  ￼, oraz custom fields tworzone przez API  ￼.

Rekomendowany model danych

MailerLite Groups

* Caniello - Pet Owners
* Caniello - Service Providers
* Caniello - Clinics & Vets
* Caniello - General Waitlist
* Caniello - Wave 2 Interest
* Caniello - Wave 3 Interest

MailerLite Custom Fields

Field	Type	Example
role	text	pet_owner
source	text	landing_page
interest_wave	text	wave_1, wave_2, wave_3
pet_type	text	dog, cat, multiple
business_name	text	Paws & Care
service_category	text	grooming
clinic_name	text	Happy Vet Clinic
country	text	PL
consent_marketing	text/boolean	true
utm_source	text	linkedin
utm_campaign	text	mvp_waitlist

User Stories

US-7.1 — Submit owner lead to MailerLite

Jako pet owner, chcę zapisać się na waitlistę, aby otrzymywać informacje o early access.

Acceptance Criteria

* Frontend wysyła email i metadane do backend endpointu, np. POST /api/waitlist.
* Backend tworzy lub aktualizuje subskrybenta w MailerLite.
* Lead trafia do groups: Caniello - General Waitlist oraz Caniello - Pet Owners.
* Custom fields zawierają role=pet_owner, interest_wave=wave_1, source=landing_page.

US-7.2 — Submit Wave 2 provider interest to MailerLite

Jako pet service provider, chcę zgłosić zainteresowanie przyszłym marketplace.

Acceptance Criteria

* Formularz zapisuje email, business name, category i opcjonalnie location.
* Lead trafia do groups: Caniello - Service Providers oraz Caniello - Wave 2 Interest.
* Custom fields zawierają role=pet_service_provider, interest_wave=wave_2.
* Użytkownik widzi komunikat: “Thanks — we’ll contact selected providers during research.”

US-7.3 — Submit Wave 3 clinic/vet interest to MailerLite

Jako clinic/vet, chcę zgłosić zainteresowanie przyszłą współpracą.

Acceptance Criteria

* Formularz zapisuje email, clinic name i opcjonalnie role/country.
* Lead trafia do groups: Caniello - Clinics & Vets oraz Caniello - Wave 3 Interest.
* Custom fields zawierają role=clinic_vet, interest_wave=wave_3.
* Użytkownik widzi komunikat: “Thanks — Wave 3 is in research stage.”

US-7.4 — Prevent duplicate leads

Jako founder, chcę uniknąć duplikatów i zachować historię zainteresowania użytkownika.

Acceptance Criteria

* Ten sam email nie tworzy duplikatu kontaktu.
* Ponowny zapis aktualizuje custom fields i dodaje użytkownika do odpowiednich groups.
* Istniejące groups nie są usuwane przy aktualizacji, zgodnie z niedestrukcyjnym zachowaniem upsert w MailerLite  ￼.

US-7.5 — Consent and compliance

Jako użytkownik, chcę wiedzieć, na co się zapisuję i jak będą używane moje dane.

Acceptance Criteria

* Formularz zawiera informację o prywatności i link do Privacy Policy.
* Jeśli wymagane, checkbox consent jest obowiązkowy przed wysłaniem.
* Backend zapisuje wartość consent jako custom field.
* Email nie jest wysyłany do MailerLite bez zgody marketingowej lub informacyjnej.

⸻

Feature 8 — Analytics and validation tracking

Opis

Landing page ma wspierać walidację pierwszych 90 dni: interviews, waitlist, conversion, activation i retention. Strategia zakłada między innymi landing page conversion above 8%, 40 owner interviews i 15 interviews z clinics lub pet-service providers  ￼.

User Stories

US-8.1 — Track waitlist conversion

Jako founder, chcę mierzyć skuteczność landing page.

Acceptance Criteria

* Trackowane eventy:
    * page_view
    * hero_waitlist_submit
    * mid_page_waitlist_submit
    * footer_waitlist_submit
    * wave2_interest_click
    * wave3_interest_click
    * waitlist_success
    * waitlist_error
* Eventy zawierają UTM parameters.
* Konwersja landing page może być policzona jako waitlist_success / page_view.

US-8.2 — Track market segment demand

Jako founder, chcę wiedzieć, który segment rynku wykazuje zainteresowanie.

Acceptance Criteria

* Każdy lead ma przypisaną rolę.
* Dashboard lub export z MailerLite pozwala policzyć liczbę leadów per segment.
* Wave 2 i Wave 3 mają osobne groups lub tags.

⸻

Feature 9 — Navigation and content structure

Opis

Top navigation powinna wspierać MVP i unikać fałszywego wrażenia, że Wave 2 / Wave 3 są aktywnym produktem.

Rekomendowana nawigacja:

* Features
* How it works
* About
* Contact
* Join Waitlist

Opcjonalnie:

* Vision — tylko jeśli prowadzi do sekcji “What’s next”, a nie do aktywnego produktu.

User Stories

US-9.1 — Clear navigation without scope creep

Jako odwiedzający, chcę łatwo przejść do najważniejszych informacji.

Acceptance Criteria

* Nawigacja nie zawiera Marketplace jako aktywnej zakładki.
* Nawigacja nie zawiera For clinics jako głównego produktu MVP.
* Jeśli istnieje Vision, scrolluje do “What’s next”.

⸻

Feature 10 — Footer

Opis

Footer powinien zawierać podstawowe linki, zaufanie i drugorzędny signup.

Elementy:

* logo Caniello,
* krótki opis,
* Product: Features, How it works,
* Company: About, Contact,
* Resources: Privacy Policy, Terms of Service,
* Stay in the loop email field,
* social links.

User Stories

US-10.1 — Access legal and trust information

Jako użytkownik, chcę mieć dostęp do polityki prywatności i regulaminu.

Acceptance Criteria

* Footer zawiera Privacy Policy.
* Footer zawiera Terms of Service.
* Linki działają lub prowadzą do placeholder pages przed publikacją.

US-10.2 — Final signup opportunity

Jako użytkownik, który dotarł do końca strony, chcę mieć ostatnią możliwość zapisu.

Acceptance Criteria

* Footer lub final CTA zawiera email input.
* Submit działa przez ten sam MailerLite integration endpoint.
* Lead dostaje source=landing_page_footer.

⸻

Minimalny zakres implementacji

Must have

* Hero z waitlist form.
* MVP features.
* How it works.
* Mid-page CTA.
* What’s next z Wave 2 i Wave 3 jako research.
* Footer.
* MailerLite integration przez backend endpoint.
* Segmentacja leadów.
* Basic analytics events.
* Privacy/consent copy.

Should have

* Role-specific mini forms dla providerów i klinik.
* UTM capture.
* Success/error states.
* MailerLite automations:
    * Owner welcome,
    * Provider research thank-you,
    * Clinic/vet research thank-you.

Out of scope for landing page MVP

* płatności,
* booking,
* clinic integrations,
* marketplace transakcje,
* AI diagnosis,
* replacement of official pet passport,
* pełny portal dla klinik.

To jest zgodne z ograniczeniem, że Caniello nie powinno startować od booking, payments, clinic integrations, AI diagnosis ani marketplace mechanics  ￼.
