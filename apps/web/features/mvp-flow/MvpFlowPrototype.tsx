"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import heroPets from "../account/assets/auth-hero-pets.png";
import wordmark from "../marketing/assets/caniello-dark-wordmark.png";
import brunoAvatar from "./assets/bruno-avatar.png";
import extractionPets from "./assets/extraction-pets.png";
import styles from "./MvpFlowPrototype.module.css";

type FlowScreen =
  | "signup"
  | "signin"
  | "firstRun"
  | "documents"
  | "upload"
  | "processing"
  | "review"
  | "reminders"
  | "addReminder"
  | "timeline"
  | "ask"
  | "sharing"
  | "settings";

type IconName =
  | "apple"
  | "bell"
  | "calendar"
  | "chat"
  | "check"
  | "chevron"
  | "clock"
  | "document"
  | "download"
  | "edit"
  | "flask"
  | "folder"
  | "home"
  | "image"
  | "link"
  | "lock"
  | "mail"
  | "medication"
  | "more"
  | "paw"
  | "pdf"
  | "phone"
  | "plus"
  | "search"
  | "settings"
  | "shield"
  | "sparkle"
  | "stethoscope"
  | "sun"
  | "syringe"
  | "upload"
  | "user"
  | "users";

type NavItem = {
  screen: FlowScreen;
  label: string;
  icon: IconName;
};

const heroPetsSrc = typeof heroPets === "string" ? heroPets : heroPets.src;
const wordmarkSrc = typeof wordmark === "string" ? wordmark : wordmark.src;
const brunoAvatarSrc =
  typeof brunoAvatar === "string" ? brunoAvatar : brunoAvatar.src;
const extractionPetsSrc =
  typeof extractionPets === "string" ? extractionPets : extractionPets.src;

const appNavItems: NavItem[] = [
  { screen: "firstRun", label: "Home", icon: "home" },
  { screen: "firstRun", label: "Pets", icon: "paw" },
  { screen: "timeline", label: "Timeline", icon: "clock" },
  { screen: "documents", label: "Documents", icon: "document" },
  { screen: "reminders", label: "Reminders", icon: "bell" },
  { screen: "ask", label: "Ask Caniello", icon: "chat" },
  { screen: "sharing", label: "Sharing", icon: "users" },
  { screen: "settings", label: "Settings", icon: "settings" },
];

const documents = [
  [
    "Rabies Vaccination Certificate",
    "Vaccination Records",
    "May 26, 2025",
    "PDF",
    "245 KB",
    "Verified",
  ],
  [
    "Annual Wellness Exam",
    "Vet Visits",
    "Apr 24, 2025",
    "PDF",
    "532 KB",
    "Verified",
  ],
  [
    "Fecal Exam Results",
    "Lab Results",
    "Apr 20, 2025",
    "PDF",
    "312 KB",
    "Verified",
  ],
  [
    "Apoquel 16mg Prescription",
    "Prescriptions",
    "May 12, 2025",
    "PDF",
    "178 KB",
    "Verified",
  ],
  [
    "Insurance Policy",
    "Insurance",
    "Aug 19, 2023",
    "PDF",
    "689 KB",
    "Verified",
  ],
  [
    "Heartworm Test Results",
    "Lab Results",
    "Apr 24, 2025",
    "PDF",
    "210 KB",
    "Verified",
  ],
];

const timelineEvents = [
  [
    "May 26, 2025",
    "9:15 AM",
    "Vaccination: Rabies Vaccine",
    "Rabies vaccine administered as part of annual core vaccinations.",
    "Vaccines",
    "Completed",
    "syringe",
  ],
  [
    "May 26, 2025",
    "9:00 AM",
    "Annual Check-up",
    "Routine physical exam. Bruno is in great health.",
    "Visits",
    "Completed",
    "stethoscope",
  ],
  [
    "Apr 24, 2025",
    "9:40 AM",
    "Medication Given: Apoquel 16 mg",
    "For seasonal allergies. One tablet given orally.",
    "Medication",
    "Completed",
    "medication",
  ],
  [
    "Oct 24, 2023",
    "11:20 AM",
    "Lab Result: Fecal Exam",
    "Fecal exam completed. No parasites detected.",
    "Lab Results",
    "Normal",
    "flask",
  ],
  [
    "Aug 19, 2023",
    "2:30 PM",
    "Document Uploaded: Insurance Policy",
    "Pet insurance policy document uploaded and verified.",
    "Documents",
    "Uploaded",
    "pdf",
  ],
] as const;

const reminderRows = [
  [
    "Apoquel 16 mg",
    "Give 1 tablet by mouth",
    "May 12, 2025",
    "Today",
    "Once daily",
    "medication",
  ],
  [
    "Rabies vaccine",
    "Annual vaccination",
    "May 26, 2025",
    "In 10 days",
    "Yearly",
    "syringe",
  ],
  [
    "Annual well visit",
    "Routine check-up",
    "May 30, 2025",
    "In 14 days",
    "9:15 AM . Riverside Animal Hospital",
    "calendar",
  ],
  [
    "Heartworm prevention",
    "Give monthly chewable",
    "Jun 1, 2025",
    "In 16 days",
    "Monthly",
    "stethoscope",
  ],
  [
    "Fecal exam & test",
    "Routine screening",
    "Jun 20, 2025",
    "In 35 days",
    "Yearly",
    "document",
  ],
] as const;

export function MvpFlowPrototype() {
  const [screen, setScreen] = useState<FlowScreen>("signup");
  const [petAdded, setPetAdded] = useState(false);
  const [reminderAdded, setReminderAdded] = useState(false);
  const [chatDraft, setChatDraft] = useState("");
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [uploadStarted, setUploadStarted] = useState(false);

  const activeNavLabel = useMemo(() => {
    if (screen === "firstRun") return "Home";
    if (
      screen === "upload" ||
      screen === "processing" ||
      screen === "review" ||
      screen === "documents"
    )
      return "Documents";
    if (screen === "addReminder" || screen === "reminders") return "Reminders";
    if (screen === "ask") return "Ask Caniello";
    if (screen === "sharing") return "Sharing";
    if (screen === "settings") return "Settings";
    if (screen === "timeline") return "Timeline";
    return "Home";
  }, [screen]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [screen]);

  if (screen === "signup" || screen === "signin") {
    return (
      <AuthScreen
        mode={screen}
        onSwitch={() => setScreen(screen === "signup" ? "signin" : "signup")}
        onSubmit={() => setScreen(screen === "signup" ? "signin" : "firstRun")}
      />
    );
  }

  return (
    <main className={styles.prototype}>
      <AppSidebar activeNavLabel={activeNavLabel} onNavigate={setScreen} />
      <section className={styles.appArea}>
        <TopBar onNavigate={setScreen} />
        <div className={styles.mobileNav} aria-label="Prototype sections">
          {appNavItems.map((item) => (
            <button
              className={
                activeNavLabel === item.label ? styles.mobileNavActive : ""
              }
              key={item.label}
              type="button"
              onClick={() => setScreen(item.screen)}
            >
              {item.label}
            </button>
          ))}
        </div>
        {screen === "firstRun" ? (
          <FirstRunScreen
            petAdded={petAdded}
            onAddPet={() => {
              setPetAdded(true);
              setScreen("documents");
            }}
            onUpload={() => setScreen("upload")}
          />
        ) : screen === "documents" ? (
          <DocumentsScreen
            onUpload={() => setScreen("upload")}
            onReview={() => setScreen("review")}
          />
        ) : screen === "upload" ? (
          <UploadScreen
            uploadStarted={uploadStarted}
            onBack={() => setScreen("documents")}
            onUpload={() => {
              setUploadStarted(true);
              setScreen("processing");
            }}
          />
        ) : screen === "processing" ? (
          <ProcessingScreen onReview={() => setScreen("review")} />
        ) : screen === "review" ? (
          <ReviewScreen onConfirm={() => setScreen("reminders")} />
        ) : screen === "reminders" ? (
          <RemindersScreen
            reminderAdded={reminderAdded}
            onCreate={() => setScreen("addReminder")}
          />
        ) : screen === "addReminder" ? (
          <AddReminderScreen
            onCancel={() => setScreen("reminders")}
            onSave={() => {
              setReminderAdded(true);
              setScreen("timeline");
            }}
          />
        ) : screen === "timeline" ? (
          <TimelineScreen
            reminderAdded={reminderAdded}
            onAsk={() => setScreen("ask")}
          />
        ) : screen === "ask" ? (
          <AskScreen
            draft={chatDraft}
            onDraftChange={setChatDraft}
            onSettings={() => setScreen("sharing")}
          />
        ) : screen === "sharing" ? (
          <SharingScreen onSettings={() => setScreen("settings")} />
        ) : (
          <SettingsScreen
            saved={settingsSaved}
            onSave={() => setSettingsSaved(true)}
          />
        )}
      </section>
    </main>
  );
}

function AuthScreen({
  mode,
  onSwitch,
  onSubmit,
}: {
  mode: "signup" | "signin";
  onSwitch: () => void;
  onSubmit: () => void;
}) {
  const isSignup = mode === "signup";

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <main className={styles.authPage}>
      <section className={styles.authHero}>
        <img className={styles.authHeroImage} src={heroPetsSrc} alt="" />
        <div className={styles.authHeroWash} />
        <div className={styles.authHeroContent}>
          <span
            className={styles.authWordmark}
            style={{ backgroundImage: `url(${wordmarkSrc})` }}
            role="img"
            aria-label="Caniello"
          />
          <div className={styles.authCopy}>
            <h1>All of your pet&apos;s health, in one secure place.</h1>
            <p>
              Caniello helps you organize documents, track health, get reminders
              and ask our AI assistant about your pet&apos;s care.
            </p>
          </div>
          <div className={styles.authFeatureStack}>
            <AuthFeature
              icon="folder"
              title="Organize documents"
              body="Keep all medical records in one place."
            />
            <AuthFeature
              icon="calendar"
              title="Smart reminders"
              body="Never miss a vaccine or medication."
            />
            <AuthFeature
              icon="chat"
              title="Ask Caniello"
              body="Get answers about your pet's health."
            />
            <AuthFeature
              icon="shield"
              title="Secure & private"
              body="Your data is encrypted and protected."
            />
          </div>
          <p className={styles.authTrust}>
            <span>
              <MvpIcon name="shield" />
            </span>
            Trusted by pet parents. Built for peace of mind.
          </p>
        </div>
      </section>

      <section className={styles.authFormPane}>
        <div className={styles.authSwitch}>
          <span>
            {isSignup ? "Already have an account?" : "Don't have an account?"}
          </span>
          <button type="button" onClick={onSwitch}>
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </div>
        <form className={styles.authForm} onSubmit={submit}>
          <div>
            <h2>
              {isSignup ? "Create your account" : "Welcome back"}{" "}
              <span aria-hidden="true">••</span>
            </h2>
            <p>
              {isSignup
                ? "Join Caniello and give your pet the best care."
                : "Log in to your Caniello account"}
            </p>
          </div>
          {isSignup ? (
            <TextField
              icon="user"
              label="Full name"
              placeholder="Your full name"
            />
          ) : null}
          <TextField
            icon="mail"
            label="Email address"
            placeholder="you@example.com"
            type="email"
          />
          <TextField
            icon="lock"
            label="Password"
            placeholder={isSignup ? "Create a password" : "Enter your password"}
            type="password"
            accessory="eye"
          />
          {isSignup ? (
            <p className={styles.authHint}>
              At least 8 characters, with a number and a special character.
            </p>
          ) : null}
          {isSignup ? (
            <TextField
              icon="lock"
              label="Confirm password"
              placeholder="Confirm your password"
              type="password"
              accessory="eye"
            />
          ) : null}
          {isSignup ? (
            <label className={styles.checkLine}>
              <input defaultChecked type="checkbox" />
              <span>
                I agree to the <a href="/terms">Terms of Service</a> and{" "}
                <a href="/privacy">Privacy Policy</a>.
              </span>
            </label>
          ) : (
            <div className={styles.formSplitLine}>
              <label className={styles.checkLine}>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <button type="button">Forgot password?</button>
            </div>
          )}
          <button className={styles.primaryAuthButton} type="submit">
            {isSignup ? "Create account" : "Log in"}
          </button>
          <div className={styles.orLine}>
            <span />
            {isSignup ? "or sign up with" : "or continue with"}
            <span />
          </div>
          <button
            className={styles.socialButton}
            type="button"
            aria-disabled="true"
          >
            <span className={styles.googleMark}>G</span>
            Continue with Google
          </button>
          <button
            className={styles.socialButton}
            type="button"
            aria-disabled="true"
          >
            <MvpIcon name="apple" />
            Continue with Apple
          </button>
          <p className={styles.authFootnote}>
            <MvpIcon name="lock" />
            We never share your data with third parties.
          </p>
          {!isSignup ? (
            <p className={styles.legalLine}>
              By logging in, you agree to our{" "}
              <a href="/terms">Terms of Service</a> and{" "}
              <a href="/privacy">Privacy Policy</a>.
            </p>
          ) : null}
        </form>
      </section>
    </main>
  );
}

function AuthFeature({
  icon,
  title,
  body,
}: {
  icon: IconName;
  title: string;
  body: string;
}) {
  return (
    <div className={styles.authFeature}>
      <span>
        <MvpIcon name={icon} />
      </span>
      <div>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
    </div>
  );
}

function TextField({
  icon,
  label,
  placeholder,
  type = "text",
  accessory,
}: {
  icon: IconName;
  label: string;
  placeholder: string;
  type?: string;
  accessory?: "eye";
}) {
  return (
    <label className={styles.textField}>
      <span>{label}</span>
      <span className={styles.inputShell}>
        <MvpIcon name={icon} />
        <input placeholder={placeholder} type={type} />
        {accessory ? (
          <span className={styles.inputAccessory}>
            <MvpIcon name="search" />
          </span>
        ) : null}
      </span>
    </label>
  );
}

function AppSidebar({
  activeNavLabel,
  onNavigate,
}: {
  activeNavLabel: string;
  onNavigate: (screen: FlowScreen) => void;
}) {
  return (
    <aside className={styles.sidebar}>
      <button
        className={styles.wordmarkButton}
        type="button"
        onClick={() => onNavigate("firstRun")}
      >
        <span
          style={{ backgroundImage: `url(${wordmarkSrc})` }}
          role="img"
          aria-label="Caniello"
        />
      </button>
      <nav className={styles.sideNav} aria-label="Caniello sections">
        {appNavItems.map((item) => (
          <button
            className={
              activeNavLabel === item.label ? styles.sideNavActive : ""
            }
            key={item.label}
            type="button"
            aria-current={activeNavLabel === item.label ? "page" : undefined}
            onClick={() => onNavigate(item.screen)}
          >
            <MvpIcon name={item.icon} />
            {item.label}
          </button>
        ))}
      </nav>
      <div className={styles.safetyCard}>
        <MvpIcon name="shield" />
        <span>Your pet&apos;s data is safe with us.</span>
      </div>
    </aside>
  );
}

function TopBar({ onNavigate }: { onNavigate: (screen: FlowScreen) => void }) {
  return (
    <header className={styles.topBar}>
      <label className={styles.searchBox}>
        <input aria-label="Search Caniello" placeholder="Search anything..." />
        <MvpIcon name="search" />
        <kbd>⌘ K</kbd>
      </label>
      <div className={styles.topActions}>
        <button
          className={styles.petSelect}
          type="button"
          onClick={() => onNavigate("firstRun")}
        >
          <img src={brunoAvatarSrc} alt="" />
          <span>Bruno</span>
          <MvpIcon name="chevron" />
        </button>
        <button
          className={styles.iconButton}
          type="button"
          aria-label="Notifications"
        >
          <MvpIcon name="bell" />
          <span>3</span>
        </button>
        <button
          className={styles.accountButton}
          type="button"
          onClick={() => onNavigate("settings")}
        >
          <span className={styles.accountAvatar}>A</span>
          <span>Anna</span>
          <MvpIcon name="chevron" />
        </button>
      </div>
    </header>
  );
}

function FirstRunScreen({
  petAdded,
  onAddPet,
  onUpload,
}: {
  petAdded: boolean;
  onAddPet: () => void;
  onUpload: () => void;
}) {
  return (
    <ScreenFrame>
      <TitleBlock
        icon="sun"
        title={petAdded ? "Bruno is ready" : "Welcome to Caniello"}
        intro="Your AI pet-care assistant that helps you keep Bruno healthy, happy, and on track. Let's get started in just a few easy steps."
      />
      <div className={styles.stepStrip}>
        <StepPill
          number="1"
          title="Add your pet"
          body="Create Bruno's profile so we can personalize his care."
        />
        <StepPill
          number="2"
          title="Upload or scan your first document"
          body="Add a vaccination record or vet visit so Caniello can keep everything organized."
        />
        <StepPill
          number="3"
          title="Get reminders and ask Caniello"
          body="Receive timely reminders and get instant answers about Bruno's care."
        />
      </div>
      <div className={styles.firstRunGrid}>
        <section className={styles.petCard}>
          <div className={styles.cardPetHeader}>
            <img src={brunoAvatarSrc} alt="Bruno" />
            <div>
              <span>Step 1 of 3</span>
              <h2>Add your pet</h2>
              <p>
                Tell us a little about Bruno so we can personalize his care.
              </p>
            </div>
          </div>
          <div className={styles.petFormGrid}>
            <FormValue label="Pet name" value="Bruno" />
            <FormValue label="Species" value="Dog" />
            <FormValue label="Breed" value="Golden Retriever" />
            <FormValue label="Date of birth" value="May 26, 2022" />
            <FormValue label="Gender" value="Male" />
            <FormValue label="Weight" value="26.4 kg" />
          </div>
          <div className={styles.reassurance}>
            <MvpIcon name="sparkle" /> Don&apos;t worry, you can always update
            Bruno&apos;s profile later.
          </div>
          <button
            className={styles.primaryButton}
            type="button"
            onClick={onAddPet}
          >
            Add Bruno <MvpIcon name="chevron" />
          </button>
        </section>
        <section className={styles.documentOnboarding}>
          <div>
            <span>Step 2 of 3</span>
            <h2>Upload or scan your first document</h2>
            <p>
              We&apos;ll extract the important details so you don&apos;t have
              to.
            </p>
          </div>
          <div className={styles.extractionDemo}>
            <div className={styles.homeDocumentCard}>
              <strong>Vaccination Record</strong>
              <b>Bruno</b>
              <small>
                May 24, 2025
                <br />
                Riverside Animal Hospital
              </small>
              <table>
                <thead>
                  <tr>
                    <th>Vaccine</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>DHPPI</td>
                    <td>May 24, 2025</td>
                  </tr>
                  <tr>
                    <td>Bordetella</td>
                    <td>May 24, 2025</td>
                  </tr>
                  <tr>
                    <td>Rabies</td>
                    <td>May 24, 2025</td>
                  </tr>
                </tbody>
              </table>
              <em>Dr. L. Anderson, DVM</em>
            </div>
            <span className={styles.extractionArrow} aria-hidden="true" />
            <div className={styles.extractingBox}>
              <MvpIcon name="sparkle" />
              <strong>Extracting details...</strong>
            </div>
            <span className={styles.extractionArrow} aria-hidden="true" />
            <div className={styles.reviewMini}>
              <div>
                <strong>Review extracted details</strong>
                <span>Ready to save</span>
              </div>
              <FormValue label="Pet" value="Bruno" compact />
              <FormValue
                label="Document type"
                value="Vaccination Record"
                compact
              />
              <FormValue label="Visit date" value="May 24, 2025" compact />
              <FormValue
                label="Provider"
                value="Riverside Animal Hospital"
                compact
              />
              <button className={styles.previewDocumentLink} type="button">
                <MvpIcon name="search" /> Preview full document
              </button>
            </div>
            <img
              className={styles.extractionPets}
              src={extractionPetsSrc}
              alt=""
            />
          </div>
          <div className={styles.dualActions}>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={onUpload}
            >
              <MvpIcon name="upload" /> Upload first document
            </button>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={onUpload}
            >
              <MvpIcon name="phone" /> Scan document
            </button>
          </div>
          <p className={styles.privacyLine}>
            <MvpIcon name="lock" /> Your documents are encrypted and private.
          </p>
        </section>
      </div>
      <TipBand action="Learn more about documents" />
    </ScreenFrame>
  );
}

function DocumentsScreen({
  onUpload,
  onReview,
}: {
  onUpload: () => void;
  onReview: () => void;
}) {
  return (
    <ScreenFrame>
      <div className={styles.libraryHeader}>
        <div className={styles.titleWithAvatar}>
          <img src={brunoAvatarSrc} alt="Bruno" />
          <div>
            <h1>Documents Library</h1>
            <p>
              All of Bruno&apos;s important records, organized and AI-assisted.
            </p>
          </div>
        </div>
        <button
          className={styles.primaryButton}
          type="button"
          onClick={onUpload}
        >
          <MvpIcon name="upload" /> Upload document
        </button>
      </div>
      <FilterChips
        labels={[
          "All",
          "Vaccination Records",
          "Vet Visits",
          "Lab Results",
          "Prescriptions",
          "Insurance",
          "Other",
        ]}
      />
      <div className={styles.documentLayout}>
        <section className={styles.tablePanel}>
          <div className={styles.tableFilters}>
            <label>
              <MvpIcon name="search" />
              <input placeholder="Search documents..." />
            </label>
            <button type="button">
              All time <MvpIcon name="calendar" />
            </button>
            <button type="button">
              All statuses <MvpIcon name="chevron" />
            </button>
            <button type="button">
              All verified <MvpIcon name="chevron" />
            </button>
          </div>
          <div className={styles.tableHeader}>
            <span>24 documents</span>
            <button type="button">
              Sort: Newest first <MvpIcon name="chevron" />
            </button>
          </div>
          <div className={styles.documentTable}>
            <div className={styles.documentTableHead}>
              <span>Document name</span>
              <span>Category</span>
              <span>Upload date</span>
              <span>File type</span>
              <span>Extraction</span>
              <span>Verification</span>
            </div>
            {documents.map((doc, index) => (
              <button
                className={
                  index === 0 ? styles.documentRowActive : styles.documentRow
                }
                key={doc[0]}
                type="button"
                onClick={onReview}
              >
                <span>
                  <IconBubble
                    icon={index === 2 || index === 5 ? "flask" : "pdf"}
                    tone={index === 2 || index === 5 ? "blue" : "red"}
                  />
                  <strong>{doc[0]}</strong>
                  <small>Bruno_{doc[0].split(" ")[0]}_052625.pdf</small>
                </span>
                <span>{doc[1]}</span>
                <span>
                  {doc[2]}
                  <small>9:15 AM</small>
                </span>
                <span>
                  {doc[3]}
                  <small>{doc[4]}</small>
                </span>
                <span>
                  <StatusBadge tone="green">Extracted</StatusBadge>
                </span>
                <span>
                  <StatusBadge tone="green">{doc[5]}</StatusBadge>
                </span>
              </button>
            ))}
          </div>
        </section>
        <aside className={styles.detailPanel}>
          <div className={styles.detailHeader}>
            <IconBubble icon="shield" tone="purple" />
            <div>
              <h2>Rabies Vaccination Certificate</h2>
              <p>
                Uploaded May 26, 2025 . 9:15 AM{" "}
                <StatusBadge tone="green">Verified</StatusBadge>
              </p>
            </div>
            <button type="button" aria-label="Close preview">
              x
            </button>
          </div>
          <div className={styles.previewTabs}>
            <button type="button">Preview</button>
            <button type="button">Extracted information</button>
            <button type="button">Activity</button>
          </div>
          <div className={styles.previewSplit}>
            <MiniDocument large />
            <div className={styles.aiInsight}>
              <h3>AI Quick Insights</h3>
              <p>This is a valid rabies vaccination certificate.</p>
              <ul>
                <li>Vaccine: Rabies (3-Year)</li>
                <li>Date Administered: May 26, 2025</li>
                <li>Expires: May 26, 2028</li>
                <li>Clinic: Riverside Animal Hospital</li>
              </ul>
              <button type="button">Next reminder: May 26, 2028</button>
            </div>
          </div>
          <div className={styles.extractedGrid}>
            <InfoCell label="Pet name" value="Bruno" />
            <InfoCell label="Vaccine" value="Rabies (3-Year)" />
            <InfoCell label="Date administered" value="May 26, 2025" />
            <InfoCell label="Expiration date" value="May 26, 2028" />
            <InfoCell label="Veterinarian" value="Dr. Sarah Mitchell" />
            <InfoCell label="Clinic" value="Riverside Animal Hospital" />
          </div>
        </aside>
      </div>
    </ScreenFrame>
  );
}

function UploadScreen({
  uploadStarted,
  onBack,
  onUpload,
}: {
  uploadStarted: boolean;
  onBack: () => void;
  onUpload: () => void;
}) {
  return (
    <ScreenFrame>
      <button className={styles.backLink} type="button" onClick={onBack}>
        ← Back to Documents
      </button>
      <div className={styles.twoColumnHeader}>
        <TitleBlock
          icon="upload"
          title="Upload / Scan Document"
          intro="Upload a vet document and let Caniello extract the important details for you."
        />
        <PetSummaryCard />
      </div>
      <section className={styles.dropZone}>
        <span>
          <MvpIcon name="upload" />
        </span>
        <h2>
          {uploadStarted
            ? "Vaccination record selected"
            : "Drag and drop your document here"}
        </h2>
        <p>or choose one of the options below</p>
        <div className={styles.uploadOptions}>
          <button type="button" onClick={onUpload}>
            <IconBubble icon="pdf" tone="red" /> <strong>Upload PDF</strong>
            <small>Best for vet records</small>
          </button>
          <button type="button" onClick={onUpload}>
            <IconBubble icon="image" tone="green" />{" "}
            <strong>Choose image</strong>
            <small>JPG, PNG, HEIC</small>
          </button>
          <button type="button" onClick={onUpload}>
            <IconBubble icon="phone" tone="purple" />{" "}
            <strong>Scan with mobile</strong>
            <small>Use your phone camera</small>
          </button>
        </div>
        <p className={styles.privacyLine}>
          <MvpIcon name="lock" /> Your documents are encrypted and stored
          securely.
        </p>
      </section>
      <div className={styles.uploadInfoGrid}>
        <Panel title="Accepted file types" icon="document">
          <KeyList
            rows={[
              ["PDF", ".pdf"],
              ["Images", ".jpg, .jpeg, .png, .heic"],
              ["Max file size", "25 MB"],
              ["Max pages", "50 pages"],
            ]}
          />
        </Panel>
        <Panel title="Recent uploads" icon="clock">
          <RecentUpload title="Vaccination Record" meta="May 24, 2025 . PDF" />
          <RecentUpload title="Annual Vet Visit" meta="Apr 24, 2025 . PDF" />
          <RecentUpload title="Fecal Exam Results" meta="Oct 20, 2023 . PDF" />
        </Panel>
        <Panel title="Tips for a clear capture" icon="sparkle">
          <TipList
            tips={[
              "Use good lighting",
              "Keep it flat",
              "Avoid shadows",
              "Check focus",
              "Include edges",
            ]}
          />
        </Panel>
      </div>
    </ScreenFrame>
  );
}

function ProcessingScreen({ onReview }: { onReview: () => void }) {
  return (
    <ScreenFrame>
      <div className={styles.twoColumnHeader}>
        <TitleBlock
          icon="sparkle"
          title="Processing document"
          intro="Caniello is reading Bruno's vaccination record and extracting the important details."
        />
        <PetSummaryWide />
      </div>
      <div className={styles.processingGrid}>
        <section className={styles.documentPreviewPanel}>
          <div className={styles.panelTitleRow}>
            <h2>Document preview</h2>
            <StatusBadge tone="green">Just uploaded</StatusBadge>
          </div>
          <MiniDocument extraLarge />
          <div className={styles.zoomBar}>
            <button type="button">-</button>
            <span>100%</span>
            <button type="button">+</button>
            <button type="button">View full size</button>
          </div>
          <p className={styles.privacyLine}>
            <MvpIcon name="lock" /> Your document is secure and private.
            It&apos;s only used to help care for Bruno.
          </p>
        </section>
        <section className={styles.extractionPanel}>
          <h2>
            <MvpIcon name="sparkle" /> AI extraction in progress
          </h2>
          <div className={styles.processingContent}>
            <ol className={styles.processingSteps}>
              <li className={styles.done}>
                <span>
                  <MvpIcon name="upload" />
                </span>
                <strong>Uploading</strong>
                <small>Completed</small>
              </li>
              <li className={styles.active}>
                <span>
                  <MvpIcon name="clock" />
                </span>
                <strong>Reading document</strong>
                <small>Analyzing text and layout...</small>
                <i />
              </li>
              <li>
                <span />
                <strong>Classifying document</strong>
                <small>Identifying document type...</small>
              </li>
              <li>
                <span />
                <strong>Extracting fields</strong>
                <small>Pulling out important details...</small>
              </li>
              <li>
                <span />
                <strong>Preparing review</strong>
                <small>Organizing data for your review...</small>
              </li>
            </ol>
            <div className={styles.livePreview}>
              <h3>
                Extracted details <small>(live preview)</small>
              </h3>
              <PreviewField label="Pet name" value="Bruno" ready />
              <PreviewField label="Vaccine" value="DHPPI" ready />
              <PreviewField label="Date given" value="May 24, 2024" ready />
              <PreviewField label="Clinic" value="Happy Paws Clinic" ready />
              <PreviewField label="Next due date" value="May 24, 2025" />
            </div>
          </div>
          <div className={styles.reviewNotice}>
            <MvpIcon name="shield" />
            <div>
              <strong>
                You&apos;ll review everything before it&apos;s saved.
              </strong>
              <p>
                Nothing will be added to Bruno&apos;s records until you confirm.
              </p>
            </div>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={onReview}
            >
              Review extracted data
            </button>
          </div>
        </section>
      </div>
    </ScreenFrame>
  );
}

function ReviewScreen({ onConfirm }: { onConfirm: () => void }) {
  const fields = [
    ["Pet name", "Bruno", "High", "paw"],
    ["Species", "Dog", "High", "shield"],
    ["Breed", "Golden Retriever", "High", "paw"],
    ["Vaccination", "DHPPI", "High", "syringe"],
    ["Document date", "May 24, 2025", "High", "calendar"],
    ["Clinic name", "Riverside Animal Hospital", "High", "home"],
    ["Next due date", "May 24, 2026", "Medium", "calendar"],
    [
      "Notes (optional)",
      "Add any additional notes...",
      "Needs review",
      "document",
    ],
  ] as const;

  return (
    <ScreenFrame>
      <div className={styles.reviewHeader}>
        <div>
          <button className={styles.backLink} type="button">
            ‹ Documents
          </button>
          <h1>
            Review & confirm extracted data <MvpIcon name="shield" />
          </h1>
          <p>
            Please review the extracted information and confirm it&apos;s
            correct.
          </p>
        </div>
        <div className={styles.secureBanner}>
          <MvpIcon name="shield" />
          <div>
            <strong>We keep your data secure</strong>
            <span>Your information is encrypted and never shared.</span>
          </div>
        </div>
      </div>
      <div className={styles.reviewGrid}>
        <section className={styles.sourceDocument}>
          <div className={styles.panelTitleRow}>
            <div>
              <h2>Source document</h2>
              <p>Bruno_vaccination_record.pdf</p>
            </div>
            <button type="button">
              <MvpIcon name="download" /> Download
            </button>
          </div>
          <MiniDocument extraLarge />
          <div className={styles.zoomBar}>
            <span>1 / 1</span>
            <button type="button">-</button>
            <button type="button">+</button>
            <button type="button">[]</button>
          </div>
        </section>
        <section className={styles.extractedPanel}>
          <div className={styles.panelTitleRow}>
            <h2>
              Extracted information{" "}
              <StatusBadge tone="blue">AI extracted</StatusBadge>
            </h2>
            <button type="button">Need help?</button>
          </div>
          <div className={styles.extractedFields}>
            {fields.map((field) => (
              <div className={styles.extractedField} key={field[0]}>
                <IconBubble
                  icon={field[3]}
                  tone={field[2] === "Medium" ? "orange" : "blue"}
                />
                <label>{field[0]}</label>
                <input defaultValue={field[1]} />
                <StatusBadge
                  tone={
                    field[2] === "Medium"
                      ? "orange"
                      : field[2] === "Needs review"
                        ? "gray"
                        : "green"
                  }
                >
                  {field[2]}
                </StatusBadge>
                <MvpIcon name="chevron" />
              </div>
            ))}
          </div>
          <div className={styles.reminderSuggestion}>
            <MvpIcon name="bell" />
            <div>
              <strong>
                Reminder suggestion{" "}
                <StatusBadge tone="purple">Recommended</StatusBadge>
              </strong>
              <p>
                We can remind you 30 days before Bruno&apos;s vaccination is
                due.
              </p>
            </div>
            <div>
              <span>Suggested reminder</span>
              <strong>April 24, 2026</strong>
              <small>30 days before due date</small>
            </div>
            <button type="button">Edit reminder</button>
          </div>
        </section>
      </div>
      <div className={styles.reviewActions}>
        <button className={styles.secondaryButton} type="button">
          <MvpIcon name="edit" /> Edit fields
        </button>
        <button className={styles.secondaryButton} type="button">
          <MvpIcon name="document" /> Save as document only
        </button>
        <button
          className={styles.confirmButton}
          type="button"
          onClick={onConfirm}
        >
          <MvpIcon name="check" /> Confirm and save{" "}
          <span>Add to Bruno&apos;s timeline & set reminder</span>
        </button>
      </div>
    </ScreenFrame>
  );
}

function RemindersScreen({
  reminderAdded,
  onCreate,
}: {
  reminderAdded: boolean;
  onCreate: () => void;
}) {
  return (
    <ScreenFrame>
      <div className={styles.actionHeader}>
        <TitleBlock
          icon="sun"
          title="Reminders for Bruno"
          intro="Stay on top of appointments, medications, vaccines, and other important care."
        />
        <button
          className={styles.primaryButton}
          type="button"
          onClick={onCreate}
        >
          <MvpIcon name="plus" /> Create reminder
        </button>
      </div>
      <FilterChips
        labels={[
          "Upcoming 6",
          "Completed 24",
          "Medication 3",
          "Vaccines 1",
          "Visits 2",
        ]}
      />
      <div className={styles.remindersLayout}>
        <section className={styles.reminderList}>
          <h2>Upcoming reminders</h2>
          {[
            ...(reminderAdded
              ? [
                  [
                    "Heartworm Prevention (Apoquel)",
                    "Give monthly chewable",
                    "Jun 24, 2025",
                    "In 29 days",
                    "Medication",
                    "stethoscope",
                  ] as const,
                ]
              : []),
            ...reminderRows,
          ].map((row) => (
            <div className={styles.reminderRow} key={row[0]}>
              <IconBubble
                icon={row[5] as IconName}
                tone={
                  row[5] === "syringe"
                    ? "blue"
                    : row[5] === "calendar"
                      ? "purple"
                      : "orange"
                }
              />
              <div>
                <strong>{row[0]}</strong>
                <span>{row[1]}</span>
              </div>
              <div>
                <strong>
                  {row[2]} <em>{row[3]}</em>
                </strong>
                <span>{row[4]}</span>
              </div>
              <button type="button">
                <MvpIcon name="check" /> Mark complete
              </button>
              <button type="button">
                <MvpIcon name="clock" /> Snooze
              </button>
              <button type="button" aria-label={`More options for ${row[0]}`}>
                <MvpIcon name="more" />
              </button>
            </div>
          ))}
        </section>
        <aside className={styles.reminderSide}>
          <Panel title="Reminder preferences" icon="settings">
            <SelectLike label="Default reminder time" value="9:00 AM" />
            <SelectLike label="Snooze default" value="1 day" />
            <SelectLike label="Advance notice" value="1 day before" />
          </Panel>
          <Panel title="Notification settings" icon="bell">
            <ToggleLine label="Email notifications" on />
            <ToggleLine label="Push notifications" on />
            <ToggleLine label="Daily digest" />
            <button className={styles.fullWidthButton} type="button">
              Send test notification
            </button>
          </Panel>
          <div className={styles.noteCard}>
            <MvpIcon name="paw" />{" "}
            <span>All times are shown in your local time (PDT).</span>
          </div>
        </aside>
      </div>
    </ScreenFrame>
  );
}

function AddReminderScreen({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
    <ScreenFrame>
      <div className={styles.actionHeader}>
        <TitleBlock
          icon="bell"
          title="Create reminder"
          intro="Add a care task for Bruno and choose how Caniello should surface it."
        />
        <button
          className={styles.secondaryButton}
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
      <div className={styles.addReminderGrid}>
        <section className={styles.addReminderForm}>
          <h2>Reminder details</h2>
          <div className={styles.petFormGrid}>
            <FormValue label="Title" value="Heartworm Prevention (Apoquel)" />
            <FormValue label="Type" value="Medication" />
            <FormValue label="Due date" value="Jun 24, 2025" />
            <FormValue label="Time" value="9:00 AM" />
            <FormValue label="Repeat" value="Monthly" />
            <FormValue label="Advance notice" value="1 day before" />
          </div>
          <label className={styles.largeTextArea}>
            Notes
            <textarea defaultValue="Give monthly chewable with breakfast. Confirm after dose is given." />
          </label>
          <button
            className={styles.primaryButton}
            type="button"
            onClick={onSave}
          >
            <MvpIcon name="check" /> Save reminder
          </button>
        </section>
        <aside className={styles.addReminderPreview}>
          <Panel title="Reminder preview" icon="bell">
            <div className={styles.previewReminderCard}>
              <IconBubble icon="stethoscope" tone="purple" />
              <div>
                <strong>Heartworm Prevention (Apoquel)</strong>
                <span>Jun 24, 2025 . In 29 days</span>
                <small>Monthly medication reminder</small>
              </div>
            </div>
          </Panel>
          <Panel title="Care context" icon="document">
            <KeyList
              rows={[
                ["Source", "Vaccination record"],
                ["Pet", "Bruno"],
                ["Status", "Owner reviewed"],
                ["Notification", "Local demo only"],
              ]}
            />
          </Panel>
        </aside>
      </div>
    </ScreenFrame>
  );
}

function TimelineScreen({
  reminderAdded,
  onAsk,
}: {
  reminderAdded: boolean;
  onAsk: () => void;
}) {
  const events = reminderAdded
    ? [
        [
          "Jun 24, 2025",
          "9:00 AM",
          "Reminder Created: Heartworm Prevention",
          "Monthly Apoquel reminder added by Anna.",
          "Medication",
          "Upcoming",
          "bell",
        ] as const,
        ...timelineEvents,
      ]
    : timelineEvents;

  return (
    <ScreenFrame>
      <div className={styles.twoColumnHeader}>
        <TitleBlock
          icon="calendar"
          title="Care Timeline"
          intro="A chronological view of Bruno's health, care, and important milestones."
        />
        <PetSummaryWide />
      </div>
      <div className={styles.timelineTabs}>
        {[
          "All",
          "Vaccines",
          "Visits",
          "Medication",
          "Lab Results",
          "Documents",
        ].map((item) => (
          <button key={item} type="button">
            {item}
          </button>
        ))}
        <button type="button">
          <MvpIcon name="download" /> Export timeline
        </button>
      </div>
      <div className={styles.timelineLayout}>
        <section className={styles.timelinePanel}>
          {events.map((event) => (
            <div className={styles.timelineRow} key={`${event[0]}-${event[2]}`}>
              <time>
                <strong>{event[0]}</strong>
                <span>{event[1]}</span>
              </time>
              <span className={styles.timelineDot} />
              <IconBubble
                icon={event[6] as IconName}
                tone={
                  event[4] === "Lab Results"
                    ? "blue"
                    : event[4] === "Documents"
                      ? "red"
                      : "purple"
                }
              />
              <div>
                <h3>{event[2]}</h3>
                <p>{event[3]}</p>
                <small>By: Riverside Animal Hospital</small>
              </div>
              <StatusBadge
                tone={
                  event[5] === "Normal"
                    ? "green"
                    : event[5] === "Upcoming"
                      ? "orange"
                      : "green"
                }
              >
                {event[5]}
              </StatusBadge>
              <button type="button">
                <MvpIcon name="chevron" />
              </button>
            </div>
          ))}
          <button className={styles.loadOlder} type="button">
            Load older events
          </button>
        </section>
        <aside className={styles.timelineSide}>
          <Panel title="Timeline Summary" icon="clock">
            <div className={styles.summaryGrid}>
              <InfoCell label="Total events" value="18" />
              <InfoCell label="Veterinary visits" value="6" />
              <InfoCell label="Vaccines" value="6" />
              <InfoCell label="Medications" value="3" />
            </div>
          </Panel>
          <Panel title="Next Upcoming" icon="calendar">
            <div className={styles.previewReminderCard}>
              <IconBubble icon="calendar" tone="blue" />
              <div>
                <strong>Heartworm Prevention (Apoquel)</strong>
                <span>Jun 24, 2025 . In 29 days</span>
              </div>
            </div>
            <button className={styles.linkButton} type="button">
              View all reminders <MvpIcon name="chevron" />
            </button>
          </Panel>
          <Panel title="Care Insights" icon="sparkle">
            <p>
              Bruno is up to date on core vaccines. Great job keeping up with
              his care.
            </p>
            <button className={styles.linkButton} type="button" onClick={onAsk}>
              Ask Caniello about Bruno <MvpIcon name="chevron" />
            </button>
          </Panel>
        </aside>
      </div>
    </ScreenFrame>
  );
}

function AskScreen({
  draft,
  onDraftChange,
  onSettings,
}: {
  draft: string;
  onDraftChange: (value: string) => void;
  onSettings: () => void;
}) {
  return (
    <ScreenFrame>
      <div className={styles.askHeader}>
        <TitleBlock
          icon="sparkle"
          title="Ask Caniello"
          intro="Your AI assistant for pet care. Ask anything about Bruno's health, behavior, or care."
        />
      </div>
      <div className={styles.askLayout}>
        <aside className={styles.tryPanel}>
          <h2>Try asking:</h2>
          {[
            "When is Bruno's next vaccine due?",
            "Summarize Bruno's last vet visit",
            "What medication is Bruno taking?",
            "Create a note for my petsitter",
          ].map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => onDraftChange(prompt)}
            >
              <IconBubble
                icon={
                  prompt.includes("vaccine")
                    ? "syringe"
                    : prompt.includes("visit")
                      ? "document"
                      : prompt.includes("medication")
                        ? "shield"
                        : "lock"
                }
                tone={prompt.includes("note") ? "orange" : "purple"}
              />
              {prompt}
              <MvpIcon name="chevron" />
            </button>
          ))}
        </aside>
        <section className={styles.chatPanel}>
          <ChatExchange
            question="When is Bruno's next vaccine due?"
            answer="Bruno's next vaccine is the Rabies vaccine, which is due on May 26, 2025."
            source="Vaccination Record (May 26, 2024)"
          />
          <ChatExchange
            question="Summarize Bruno's last vet visit"
            answer="Bruno's last visit was on April 24, 2025 at Riverside Animal Hospital for his annual check-up. His weight was 26.4 kg and body condition was ideal. Heart, lungs, and joints were normal. No concerns were noted."
            source="Annual Vet Visit (Apr 24, 2025)"
          />
          <ChatExchange
            question="What medication is Bruno taking?"
            answer="Bruno is currently taking Apoquel 16 mg once daily for atopic dermatitis. This was started on May 12, 2025."
            source="Medication Record (May 12, 2025)"
          />
          <ChatExchange
            question="Create a note for my petsitter"
            answer="Sure. I created a petsitter note with Bruno's feeding schedule, medication, emergency contacts, and care instructions."
            source="Bruno_Petsitter_Note_May_20_2025.pdf"
            document
          />
          <form
            className={styles.askComposer}
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              aria-label="Ask anything about Bruno"
              value={draft}
              onChange={(event) => onDraftChange(event.target.value)}
              placeholder="Ask anything about Bruno..."
            />
            <button type="button" onClick={onSettings}>
              <MvpIcon name="chevron" />
            </button>
          </form>
          <p className={styles.aiSafety}>
            Caniello AI can make mistakes. Always follow your vet&apos;s advice
            for medical decisions.
          </p>
        </section>
        <aside className={styles.askSide}>
          <PetSummaryCard />
          <Panel title="Recent documents" icon="document">
            {documents.slice(0, 4).map((doc) => (
              <RecentUpload
                key={doc[0]}
                title={doc[0].replace(" Certificate", "")}
                meta={`${doc[2]} . PDF`}
              />
            ))}
          </Panel>
          <Panel title="Suggested prompts" icon="chat">
            {[
              "Is Bruno due for any boosters soon?",
              "How has Bruno's weight changed?",
              "What should I watch for with allergies?",
              "Show Bruno's timeline for this month",
            ].map((item) => (
              <button className={styles.promptButton} type="button" key={item}>
                {item}
                <MvpIcon name="chevron" />
              </button>
            ))}
          </Panel>
          <TipBand compact action="Open settings" onAction={onSettings} />
        </aside>
      </div>
    </ScreenFrame>
  );
}

function SettingsScreen({
  saved,
  onSave,
}: {
  saved: boolean;
  onSave: () => void;
}) {
  return (
    <ScreenFrame>
      <div className={styles.actionHeader}>
        <TitleBlock
          icon="settings"
          title="Settings"
          intro="Manage Anna's account preferences, privacy controls, and Bruno's care defaults."
        />
        <button className={styles.primaryButton} type="button" onClick={onSave}>
          <MvpIcon name="check" /> Save settings
        </button>
      </div>
      {saved ? (
        <div className={styles.savedNotice}>
          <MvpIcon name="check" /> Settings saved for this prototype session.
        </div>
      ) : null}
      <div className={styles.settingsGrid}>
        <Panel title="Profile" icon="user">
          <FormValue label="Full name" value="Anna Johnson" />
          <FormValue label="Email address" value="anna@example.com" />
          <FormValue label="Language" value="English" />
        </Panel>
        <Panel title="Pet care defaults" icon="paw">
          <FormValue label="Active pet" value="Bruno" />
          <FormValue label="Default reminder time" value="9:00 AM" />
          <FormValue label="Timezone" value="PDT" />
        </Panel>
        <Panel title="Notifications" icon="bell">
          <ToggleLine label="Email reminders" on />
          <ToggleLine label="Push notifications" on />
          <ToggleLine label="Weekly digest" />
        </Panel>
        <Panel title="Privacy & data" icon="shield">
          <button className={styles.fullWidthButton} type="button">
            <MvpIcon name="download" /> Export my data
          </button>
          <button className={styles.fullWidthButton} type="button">
            <MvpIcon name="link" /> Manage sharing access
          </button>
          <p className={styles.settingsNote}>
            Account deletion and data export remain controlled owner actions.
            This prototype does not send requests.
          </p>
        </Panel>
        <Panel title="Security" icon="lock">
          <KeyList
            rows={[
              ["Password", "Last updated May 2025"],
              ["Two-step verification", "Not enabled"],
              ["Active sessions", "1 device"],
              ["Data storage", "Encrypted"],
            ]}
          />
        </Panel>
        <Panel title="Medical boundary" icon="shield">
          <p>
            Caniello organizes owner records and citations. It does not
            diagnose, replace a veterinarian, or provide emergency medical
            advice.
          </p>
        </Panel>
      </div>
    </ScreenFrame>
  );
}

function SharingScreen({ onSettings }: { onSettings: () => void }) {
  return (
    <ScreenFrame>
      <div className={styles.twoColumnHeader}>
        <div>
          <button className={styles.backLink} type="button">
            ← Back to Sharing
          </button>
          <h1 className={styles.pageTitle}>Share Care Summary</h1>
          <p className={styles.pageIntro}>
            Create a secure, shareable summary of Bruno&apos;s care information.{" "}
            <StatusBadge tone="green">Verified data</StatusBadge>
          </p>
        </div>
        <PetSummaryWide />
      </div>
      <div className={styles.sharingLayout}>
        <section>
          <h2 className={styles.sectionKicker}>1. Choose summary type</h2>
          <div className={styles.summaryChoices}>
            <SummaryChoice
              icon="stethoscope"
              title="Petsitter Note"
              body="Essential info for sitters and caregivers."
            />
            <SummaryChoice
              icon="stethoscope"
              title="Vet Summary"
              body="Clinical history and health highlights for veterinarians."
            />
            <SummaryChoice
              icon="calendar"
              title="Emergency Card"
              body="Critical info for emergencies and urgent care."
              tone="red"
            />
            <SummaryChoice
              selected
              icon="document"
              title="Full Health Summary"
              body="Complete health record and care history."
              tone="green"
            />
          </div>
          <div className={styles.sharingReadonlyNote}>
            <MvpIcon name="sun" /> All summaries are read-only and do not allow
            editing of your data.
          </div>
        </section>
        <section>
          <h2 className={styles.sectionKicker}>2. Preview your summary</h2>
          <div className={styles.summaryPreview}>
            <div className={styles.summaryPreviewHeader}>
              <span
                className={styles.summaryLogo}
                style={{ backgroundImage: `url(${wordmarkSrc})` }}
                aria-label="Caniello"
                role="img"
              />
              <span>Generated May 26, 2025</span>
            </div>
            <div className={styles.summaryPetHero}>
              <img src={brunoAvatarSrc} alt="Bruno" />
              <div>
                <h3>Bruno</h3>
                <p>Golden Retriever . Male . 3 years old (May 2022)</p>
                <p>26.4 kg . Microchip: 985 111 002 345 678</p>
              </div>
            </div>
            <div className={styles.summaryColumns}>
              <SummaryPreviewSection
                icon="medication"
                title="Medications"
                rows={[
                  "Apoquel 16 mg - Once daily",
                  "Probiotic Chews - Ongoing",
                ]}
              />
              <SummaryPreviewSection
                icon="document"
                title="Vaccinations"
                rows={[
                  "Rabies Vaccine - Valid until May 26, 2028",
                  "DHPPI Vaccine - Valid until May 24, 2026",
                  "Bordetella Vaccine - Valid until May 20, 2026",
                ]}
              />
              <SummaryPreviewSection
                icon="paw"
                title="Feeding"
                rows={[
                  "Food: Royal Canin Golden Retriever Adult",
                  "Amount: 2.5 cups per day",
                  "Treats: Limited to training treats",
                ]}
              />
            </div>
            <div className={styles.summaryNotes}>
              <strong>Important Notes</strong>
              <ul>
                <li>Bruno can be anxious around loud noises.</li>
                <li>
                  Feels most comfortable with slow introductions to new people
                  and dogs.
                </li>
                <li>Loves fetch, morning walks, and chews.</li>
              </ul>
            </div>
            <p className={styles.summaryFooter}>
              <MvpIcon name="shield" /> This summary was generated from your
              verified Caniello records.
            </p>
          </div>
          <p className={styles.sharingBottomNote}>
            <MvpIcon name="lock" /> Shared summaries are read-only and do not
            grant access to your full account.
          </p>
        </section>
        <aside className={styles.sharingSide}>
          <Panel title="3. Share with confidence" icon="link">
            <ShareAction
              icon="link"
              title="Share by secure link"
              body="Create a private link you can copy and share."
            />
            <ShareAction
              icon="pdf"
              title="Export PDF"
              body="Download a printable PDF of the summary."
              tone="red"
            />
            <ShareAction
              icon="mail"
              title="Email summary"
              body="Send the summary directly to someone."
              tone="purple"
            />
            <ShareAction
              icon="shield"
              title="Revoke all access"
              body="Disable all active links and access."
              tone="red"
            />
          </Panel>
          <Panel title="4. Who has access" icon="users">
            <AccessRow
              name="Anna (You)"
              detail="anna@example.com"
              badge="Owner"
            />
            <AccessRow
              name="James (Brother)"
              detail="james@example.com"
              badge="View only"
            />
            <AccessRow
              name="Riverside Animal Hospital"
              detail="Veterinary Clinic"
              badge="View only"
            />
            <button className={styles.fullWidthButton} type="button">
              Manage access
            </button>
          </Panel>
          <button
            className={styles.linkButton}
            type="button"
            onClick={onSettings}
          >
            Open settings <MvpIcon name="chevron" />
          </button>
        </aside>
      </div>
    </ScreenFrame>
  );
}

function SummaryChoice({
  icon,
  title,
  body,
  tone = "purple",
  selected = false,
}: {
  icon: IconName;
  title: string;
  body: string;
  tone?: "green" | "purple" | "red";
  selected?: boolean;
}) {
  return (
    <button
      className={selected ? styles.summaryChoiceSelected : styles.summaryChoice}
      type="button"
    >
      <IconBubble icon={icon} tone={tone} />
      <span>
        <strong>{title}</strong>
        <small>{body}</small>
      </span>
      <i aria-hidden="true" />
    </button>
  );
}

function SummaryPreviewSection({
  icon,
  title,
  rows,
}: {
  icon: IconName;
  title: string;
  rows: string[];
}) {
  return (
    <section>
      <h4>
        <IconBubble
          icon={icon}
          tone={
            icon === "document" ? "green" : icon === "paw" ? "orange" : "purple"
          }
        />{" "}
        {title}
      </h4>
      {rows.map((row) => (
        <p key={row}>{row}</p>
      ))}
    </section>
  );
}

function ShareAction({
  icon,
  title,
  body,
  tone = "blue",
}: {
  icon: IconName;
  title: string;
  body: string;
  tone?: "blue" | "purple" | "red";
}) {
  return (
    <button className={styles.shareAction} type="button">
      <IconBubble icon={icon} tone={tone} />
      <span>
        <strong>{title}</strong>
        <small>{body}</small>
      </span>
      <MvpIcon name="chevron" />
    </button>
  );
}

function AccessRow({
  name,
  detail,
  badge,
}: {
  name: string;
  detail: string;
  badge: string;
}) {
  return (
    <div className={styles.accessRow}>
      <span className={styles.accountAvatar}>{name.charAt(0)}</span>
      <div>
        <strong>{name}</strong>
        <small>{detail}</small>
      </div>
      <StatusBadge tone={badge === "Owner" ? "blue" : "green"}>
        {badge}
      </StatusBadge>
    </div>
  );
}

function ScreenFrame({ children }: { children: React.ReactNode }) {
  return <div className={styles.screenFrame}>{children}</div>;
}

function TitleBlock({
  icon,
  title,
  intro,
}: {
  icon: IconName;
  title: string;
  intro: string;
}) {
  return (
    <div className={styles.titleBlock}>
      <span>
        <MvpIcon name={icon} />
      </span>
      <div>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
    </div>
  );
}

function StepPill({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className={styles.stepPill}>
      <span>{number}</span>
      <MvpIcon
        name={number === "1" ? "paw" : number === "2" ? "document" : "chat"}
      />
      <div>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
    </div>
  );
}

function FormValue({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <label className={compact ? styles.formValueCompact : styles.formValue}>
      <span>{label}</span>
      <input defaultValue={value} />
    </label>
  );
}

function MiniDocument({
  large = false,
  extraLarge = false,
}: {
  large?: boolean;
  extraLarge?: boolean;
}) {
  return (
    <div
      className={`${styles.miniDocument} ${large ? styles.miniDocumentLarge : ""} ${extraLarge ? styles.miniDocumentExtraLarge : ""}`}
    >
      <div className={styles.miniDocHeader}>
        <span>
          <MvpIcon name="paw" />
        </span>
        <div>
          <strong>Riverside Animal Hospital</strong>
          <small>VACCINATION RECORD</small>
        </div>
      </div>
      <div className={styles.miniDocMeta}>
        <p>
          <span>Pet Name:</span> Bruno
        </p>
        <p>
          <span>Species:</span> Dog
        </p>
        <p>
          <span>Breed:</span> Golden Retriever
        </p>
        <p>
          <span>Date of Birth:</span> May 12, 2022
        </p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Vaccine</th>
            <th>Date Given</th>
            <th>Next Due</th>
            <th>Veterinarian</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>DHPPI</td>
            <td>May 24, 2025</td>
            <td>May 24, 2026</td>
            <td>Dr. Emily Carter</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.signature}>Emily Carter</div>
    </div>
  );
}

function PetSummaryCard() {
  return (
    <aside className={styles.petSummaryCard}>
      <h2>Selected pet</h2>
      <div className={styles.petSummaryMain}>
        <img src={brunoAvatarSrc} alt="Bruno" />
        <div>
          <strong>
            Bruno <StatusBadge tone="green">Active</StatusBadge>
          </strong>
          <span>Golden Retriever</span>
          <small>3 years old . Male . 26.4 kg</small>
        </div>
      </div>
      <button type="button">
        View pet profile <MvpIcon name="chevron" />
      </button>
    </aside>
  );
}

function PetSummaryWide() {
  return (
    <button className={styles.petSummaryWide} type="button">
      <img src={brunoAvatarSrc} alt="" />
      <span>
        <strong>Bruno</strong>
        <small>Golden Retriever . 3 years old . Male . 26.4 kg</small>
      </span>
      <MvpIcon name="chevron" />
    </button>
  );
}

function FilterChips({ labels }: { labels: string[] }) {
  return (
    <div className={styles.filterChips}>
      {labels.map((label, index) => (
        <button
          className={index === 0 ? styles.activeChip : ""}
          key={label}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function IconBubble({
  icon,
  tone,
}: {
  icon: IconName;
  tone: "blue" | "green" | "orange" | "purple" | "red";
}) {
  return (
    <span
      className={`${styles.iconBubble} ${styles[`tone${capitalize(tone)}`]}`}
    >
      <MvpIcon name={icon} />
    </span>
  );
}

function StatusBadge({
  tone,
  children,
}: {
  tone: "blue" | "green" | "gray" | "orange" | "purple";
  children: React.ReactNode;
}) {
  return (
    <span
      className={`${styles.statusBadge} ${styles[`badge${capitalize(tone)}`]}`}
    >
      {children}
    </span>
  );
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: IconName;
  children: React.ReactNode;
}) {
  return (
    <section className={styles.panel}>
      <h2>
        <IconBubble
          icon={icon}
          tone={icon === "bell" || icon === "settings" ? "blue" : "orange"}
        />{" "}
        {title}
      </h2>
      {children}
    </section>
  );
}

function KeyList({ rows }: { rows: Array<[string, string]> }) {
  return (
    <dl className={styles.keyList}>
      {rows.map((row) => (
        <div key={row[0]}>
          <dt>{row[0]}</dt>
          <dd>{row[1]}</dd>
        </div>
      ))}
    </dl>
  );
}

function RecentUpload({ title, meta }: { title: string; meta: string }) {
  return (
    <div className={styles.recentUpload}>
      <IconBubble icon="pdf" tone="red" />
      <div>
        <strong>{title}</strong>
        <span>{meta}</span>
      </div>
      <StatusBadge tone="green">Processed</StatusBadge>
    </div>
  );
}

function TipList({ tips }: { tips: string[] }) {
  return (
    <ul className={styles.tipList}>
      {tips.map((tip) => (
        <li key={tip}>
          <MvpIcon name="check" /> {tip}
        </li>
      ))}
    </ul>
  );
}

function SelectLike({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.selectLike}>
      <span>{label}</span>
      <button type="button">
        {value} <MvpIcon name="chevron" />
      </button>
    </div>
  );
}

function ToggleLine({ label, on = false }: { label: string; on?: boolean }) {
  return (
    <div className={styles.toggleLine}>
      <span>{label}</span>
      <button
        className={on ? styles.toggleOn : ""}
        type="button"
        aria-pressed={on}
      />
    </div>
  );
}

function InfoCell({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.infoCell}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function PreviewField({
  label,
  value,
  ready = false,
}: {
  label: string;
  value: string;
  ready?: boolean;
}) {
  return (
    <div className={styles.previewField}>
      <span>{label}</span>
      <strong>{value}</strong>
      <MvpIcon name={ready ? "check" : "clock"} />
    </div>
  );
}

function ChatExchange({
  question,
  answer,
  source,
  document = false,
}: {
  question: string;
  answer: string;
  source: string;
  document?: boolean;
}) {
  return (
    <div className={styles.chatExchange}>
      <div className={styles.questionBubble}>
        <span className={styles.accountAvatar}>A</span>
        <p>{question}</p>
      </div>
      <div className={styles.answerBubble}>
        <p>{answer}</p>
        <div>
          <MvpIcon name={document ? "pdf" : "document"} /> Source: {source}{" "}
          <StatusBadge tone="green">Verified</StatusBadge>
        </div>
      </div>
    </div>
  );
}

function TipBand({
  compact = false,
  action,
  onAction,
}: {
  compact?: boolean;
  action: string;
  onAction?: () => void;
}) {
  return (
    <div className={compact ? styles.tipBandCompact : styles.tipBand}>
      <MvpIcon name="sparkle" />
      <div>
        <strong>Caniello Tip</strong>
        <span>
          {compact
            ? "The more you ask, the more helpful answers Caniello can provide."
            : "Adding a vaccination record first helps us build Bruno's timeline and send the right reminders."}
        </span>
      </div>
      <button type="button" onClick={onAction}>
        {action} <MvpIcon name="chevron" />
      </button>
    </div>
  );
}

function capitalize(value: string) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function MvpIcon({ name }: { name: IconName }) {
  const common = "0 0 24 24";
  const strokeProps = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "home")
    return (
      <svg viewBox={common}>
        <path
          fill="currentColor"
          d="M4 10.3 12 4l8 6.3V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-9.7Z"
        />
      </svg>
    );
  if (name === "chevron")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="m9 6 6 6-6 6" />
      </svg>
    );
  if (name === "search")
    return (
      <svg viewBox={common} {...strokeProps}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    );
  if (name === "bell")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </svg>
    );
  if (name === "paw")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="M8.4 11.3c1 0 1.8-1.3 1.8-2.9S9.4 5.5 8.4 5.5 6.6 6.8 6.6 8.4s.8 2.9 1.8 2.9ZM15.6 11.3c1 0 1.8-1.3 1.8-2.9s-.8-2.9-1.8-2.9-1.8 1.3-1.8 2.9.8 2.9 1.8 2.9Z" />
        <path d="M5.3 15.2c.8.4 1.9-.2 2.4-1.3s.2-2.3-.6-2.7-1.9.2-2.4 1.3-.2 2.3.6 2.7ZM18.7 15.2c.8-.4 1.1-1.6.6-2.7s-1.6-1.7-2.4-1.3-1.1 1.6-.6 2.7 1.6 1.7 2.4 1.3Z" />
        <path d="M8 18.4c0-2.1 1.8-3.8 4-3.8s4 1.7 4 3.8c0 1.1-.8 1.8-1.9 1.8-.8 0-1.2-.4-2.1-.4s-1.3.4-2.1.4C8.8 20.2 8 19.5 8 18.4Z" />
      </svg>
    );
  if (name === "clock")
    return (
      <svg viewBox={common} {...strokeProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  if (name === "document" || name === "pdf")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v5h4M9.5 13h5M9.5 17h5" />
      </svg>
    );
  if (name === "settings")
    return (
      <svg viewBox={common} {...strokeProps}>
        <circle cx="12" cy="12" r="3.3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5v.2a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.7 1.7 0 0 0 9 4.7a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.7 1.7 0 0 0 19.3 9c.2.6.8 1 1.5 1h.2a2 2 0 1 1 0 4h-.2c-.7 0-1.3.4-1.4 1Z" />
      </svg>
    );
  if (name === "chat")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="M7 17 4 20v-4a7 7 0 1 1 3 1Z" />
        <path d="M9 10h.01M13 10h.01M17 10h.01" />
      </svg>
    );
  if (name === "users")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </svg>
    );
  if (name === "sun" || name === "sparkle")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="M12 2v5M12 17v5M2 12h5M17 12h5M4.9 4.9l3.5 3.5M15.6 15.6l3.5 3.5M19.1 4.9l-3.5 3.5M8.4 15.6l-3.5 3.5" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    );
  if (name === "syringe")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="m18 2 4 4M16 4l4 4M4 20l7-7M12 4l8 8M6 18l-2 2M8 16l-3-3 8-8 6 6-8 8-3-3Z" />
      </svg>
    );
  if (name === "stethoscope")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="M6 3v5a4 4 0 0 0 8 0V3M5 3h2M13 3h2" />
        <path d="M10 14a5 5 0 0 0 10 0v-2" />
        <circle cx="20" cy="10" r="2" />
      </svg>
    );
  if (name === "medication")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="M10 21a5 5 0 0 1-7-7l9-9a5 5 0 0 1 7 7Z" />
        <path d="m8.5 8.5 7 7" />
      </svg>
    );
  if (name === "flask")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3" />
        <path d="M8 15h8" />
      </svg>
    );
  if (name === "calendar")
    return (
      <svg viewBox={common} {...strokeProps}>
        <rect x="4" y="5" width="16" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </svg>
    );
  if (name === "folder")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="M3 7h7l2 2h9v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />
      </svg>
    );
  if (name === "shield")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6Z" />
        <path d="m9 12 2 2 4-5" />
      </svg>
    );
  if (name === "lock")
    return (
      <svg viewBox={common} {...strokeProps}>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </svg>
    );
  if (name === "mail")
    return (
      <svg viewBox={common} {...strokeProps}>
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  if (name === "user")
    return (
      <svg viewBox={common} {...strokeProps}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
    );
  if (name === "upload")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="M12 16V4M7 9l5-5 5 5" />
        <path d="M20 16v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3" />
      </svg>
    );
  if (name === "download")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="M12 4v12M7 11l5 5 5-5" />
        <path d="M20 20H4" />
      </svg>
    );
  if (name === "phone")
    return (
      <svg viewBox={common} {...strokeProps}>
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
    );
  if (name === "image")
    return (
      <svg viewBox={common} {...strokeProps}>
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="m20 16-4-4-5 5-2-2-5 5" />
      </svg>
    );
  if (name === "plus")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="M12 5v14M5 12h14" />
      </svg>
    );
  if (name === "check")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  if (name === "more")
    return (
      <svg viewBox={common} fill="currentColor">
        <circle cx="5" cy="12" r="1.8" />
        <circle cx="12" cy="12" r="1.8" />
        <circle cx="19" cy="12" r="1.8" />
      </svg>
    );
  if (name === "edit")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="M12 20h9" />
        <path d="m16.5 3.5 4 4L7 21H3v-4Z" />
      </svg>
    );
  if (name === "link")
    return (
      <svg viewBox={common} {...strokeProps}>
        <path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
        <path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1" />
      </svg>
    );
  if (name === "apple")
    return (
      <svg viewBox={common} fill="currentColor">
        <path d="M16.5 13.1c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.2 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2.1 2.6 2 1-.1 1.4-.7 2.6-.7 1.2 0 1.5.7 2.6.7s1.8-1 2.5-2c.8-1.1 1.1-2.2 1.1-2.3-.1-.1-2.4-.9-2.4-3ZM14.5 7.1c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.6.6-1.1 1.6-1 2.6 1 .1 2-.5 2.6-1.2Z" />
      </svg>
    );

  return (
    <svg viewBox={common} {...strokeProps}>
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}
