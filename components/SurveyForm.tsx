"use client";

import Link from "next/link";
import { useState } from "react";
import { SURVEY_ENDPOINT, SURVEY_MODE } from "@/lib/app-config";

const CANCEL_URL = "https://lokizy-web.vercel.app/";

type SurveyFormValues = {
  email: string;
  surveyPain: string;
  surveyFeature: string;
  surveyPrice: string;
  notifyOnLaunch: boolean;
};

type SurveyErrors = Partial<Record<keyof SurveyFormValues, string>>;

type SubmissionState =
  | { type: "idle" }
  | { type: "preview"; payload: Record<string, unknown> }
  | { type: "success"; notifyOnLaunch: boolean }
  | { type: "error"; message: string };

const initialValues: SurveyFormValues = {
  email: "",
  surveyPain: "",
  surveyFeature: "",
  surveyPrice: "",
  notifyOnLaunch: true,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SurveyForm() {
  const [values, setValues] = useState<SurveyFormValues>(initialValues);
  const [errors, setErrors] = useState<SurveyErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    type: "idle",
  });

  function updateField<Key extends keyof SurveyFormValues>(
    field: Key,
    value: SurveyFormValues[Key],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validateForm(input: SurveyFormValues) {
    const nextErrors: SurveyErrors = {};

    if (input.notifyOnLaunch) {
      if (!input.email.trim()) {
        nextErrors.email = "L'email est requis.";
      } else if (!emailPattern.test(input.email.trim())) {
        nextErrors.email = "Entrez une adresse email valide.";
      }
    }

    return nextErrors;
  }

  function buildPayload(input: SurveyFormValues) {
    return {
      ...(input.notifyOnLaunch
        ? { email: input.email.trim() || null }
        : {}),
      surveyPain: input.surveyPain.trim() || null,
      surveyFeature: input.surveyFeature.trim() || null,
      surveyPrice: input.surveyPrice.trim() || null,
      notifyOnLaunch: input.notifyOnLaunch,
      source: "website_survey_form",
      createdAtPreview: new Date().toISOString(),
    };
  }

  function closeModal() {
    setSubmissionState({ type: "idle" });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    setSubmissionState({ type: "idle" });

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const payload = buildPayload(values);

    if (SURVEY_MODE !== "live" || !SURVEY_ENDPOINT) {
      setSubmissionState({
        type: "preview",
        payload,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(SURVEY_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseBody = await readResponseBody(response);

      if (!response.ok) {
        throw new Error(extractErrorMessage(responseBody));
      }

      setSubmissionState({
        type: "success",
        notifyOnLaunch: values.notifyOnLaunch,
      });
      setValues(initialValues);
    } catch (error) {
      setSubmissionState({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Une erreur inconnue est survenue pendant l'enregistrement.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="glass-card p-8 sm:p-10">
        <div className="mb-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#4f6455]">
            Sondage produit
          </p>
          <h1 className="text-4xl font-bold text-[#101513] sm:text-5xl">
            Participer au sondage Lok Izy.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#66736d]">
            Le produit n&apos;est pas encore en phase de vente publique. Ce
            formulaire nous aide à mieux comprendre les besoins prioritaires et à
            préparer le futur branchement de la collecte.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextareaField
              id="surveyPain"
              label={
                <>
                  Je développe une plateforme de gestion locative pour petits propriétaires.
                  <br />
                  <br />
                  1. Quelle est votre plus grosse galère aujourd'hui ?
                </>
              }
              value={values.surveyPain}
              onChange={(value) => updateField("surveyPain", value)}
              placeholder="Décrivez la difficulté principale que vous rencontrez aujourd'hui."
              className="sm:col-span-2"
            />
            <TextareaField
              id="surveyFeature"
              label="2. Quelle fonctionnalité vous ferait gagner le plus de temps ?"
              value={values.surveyFeature}
              onChange={(value) => updateField("surveyFeature", value)}
              placeholder="Exemple : relances automatiques, suivi des incidents, quittances, dashboard..."
              className="sm:col-span-2"
            />
            <TextareaField
              id="surveyPrice"
              label="3. Si un logiciel vous faisait gagner 5h/mois, combien seriez-vous prêt à payer ?"
              value={values.surveyPrice}
              onChange={(value) => updateField("surveyPrice", value)}
              placeholder="Exemple : 5 EUR/mois, 10 EUR/mois, 15 EUR/mois..."
              className="sm:col-span-2"
            />

            <div className="sm:col-span-2">
              <div className="flex items-center gap-4 rounded-3xl border border-[#d9e5de] bg-white px-5 py-4">
                <button
                  type="button"
                  role="switch"
                  aria-checked={values.notifyOnLaunch}
                  onClick={() =>
                    updateField("notifyOnLaunch", !values.notifyOnLaunch)
                  }
                  className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full transition ${
                    values.notifyOnLaunch
                      ? "bg-[var(--sage-accent)]"
                      : "bg-[#cfd9d3]"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 rounded-full bg-white shadow transition ${
                      values.notifyOnLaunch
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </button>

                <div>
                  <p className="text-sm font-semibold text-[#101513]">
                    Être informé de la sortie du produit
                  </p>
                  <p className="mt-1 text-sm text-[#66736d]">
                    Activé pour recevoir l&apos;information quand Lok Izy sera
                    disponible.
                  </p>
                </div>
              </div>
            </div>

            {values.notifyOnLaunch ? (
              <div className="sm:col-span-2">
                <FormField
                  id="email"
                  label="Email"
                  required
                  type="email"
                  value={values.email}
                  error={errors.email}
                  onChange={(value) => updateField("email", value)}
                  placeholder="nom@entreprise.com"
                />
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--sage-accent)] px-7 text-base font-semibold text-white shadow-lg shadow-[rgba(127,190,141,0.24)] transition hover:bg-[var(--sage-accent-dark)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </button>
            <Link
              href={CANCEL_URL}
              className="inline-flex h-14 items-center justify-center rounded-full border border-[#d9e5de] bg-white px-7 text-base font-semibold text-[#4f6455] transition hover:border-[#4f6455] hover:bg-[#edf1ee]"
            >
              Abandonner
            </Link>
          </div>

          {submissionState.type === "preview" ? (
            <article className="rounded-3xl border border-dashed border-[#6f8674]/25 p-6">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#4f6455]">
                Preview du futur payload
              </p>
              <p className="mb-4 text-sm leading-6 text-[#66736d]">
                Cette donnée n&apos;est pas encore envoyée. Elle montre
                simplement ce qui pourra être stocké ou transmis quand nous
                brancherons la DB.
              </p>
              <pre className="overflow-x-auto rounded-2xl bg-[#101513] p-5 text-sm leading-6 text-[#e8f7ee]">
                {JSON.stringify(submissionState.payload, null, 2)}
              </pre>
            </article>
          ) : null}
        </form>

        {submissionState.type === "success" ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-xl rounded-[2rem] bg-white p-8 shadow-2xl ring-1 ring-black/10">
              <div className="flex items-center justify-center rounded-full bg-emerald-100 p-4">
                <svg
                  className="h-10 w-10 text-emerald-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="mt-6 text-3xl font-semibold text-[#101513]">
                C'est bon !
              </h2>
              <p className="mt-4 text-base leading-7 text-[#445144]">
                {submissionState.notifyOnLaunch
                  ? "Votre demande est bien enregistrée. Nous vous informerons dès que Lok Izy sera disponible."
                  : "Merci, votre réponse anonyme a bien été enregistrée."}
              </p>
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex h-14 items-center justify-center rounded-full bg-[#101513] px-7 text-base font-semibold text-white transition hover:bg-[#333]"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {submissionState.type === "error" ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-xl rounded-[2rem] bg-white p-8 shadow-2xl ring-1 ring-black/10">
              <div className="flex items-center justify-center rounded-full bg-[#fef3f2] p-4">
                <svg
                  className="h-10 w-10 text-[#b42318]"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 8.5V12"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M12 15.5H12.01"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
              <h2 className="mt-6 text-3xl font-semibold text-[#101513]">
                Erreur
              </h2>
              <p className="mt-4 text-base leading-7 text-[#445144]">
                {submissionState.message}
              </p>
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex h-14 items-center justify-center rounded-full bg-[#101513] px-7 text-base font-semibold text-white transition hover:bg-[#333]"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

type BaseFieldProps = {
  id: string;
  label: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

type FormFieldProps = BaseFieldProps & {
  type?: string;
};

function FormField({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  required = false,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <FieldLabel htmlFor={id} required={required}>
        {label}
      </FieldLabel>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`h-14 w-full rounded-2xl border bg-white px-4 text-[#101513] outline-none transition focus:ring-4 ${
          error
            ? "border-[#f04438] focus:border-[#f04438] focus:ring-[#f04438]/10"
            : "border-[#d9e5de] focus:border-[var(--sage-accent)] focus:ring-[var(--sage-accent)]/10"
        }`}
      />
      {error ? (
        <p className="text-sm font-medium text-[#b42318]">{error}</p>
      ) : null}
    </div>
  );
}

function TextareaField({
  id,
  label,
  value,
  onChange,
  placeholder,
  className,
}: BaseFieldProps) {
  return (
    <div className={`space-y-2 ${className ?? ""}`}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={5}
        className="w-full rounded-2xl border border-[#d9e5de] bg-white px-4 py-4 text-[#101513] outline-none transition focus:border-[var(--sage-accent)] focus:ring-4 focus:ring-[var(--sage-accent)]/10"
      />
    </div>
  );
}

function FieldLabel({
  htmlFor,
  required = false,
  children,
}: {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-[#101513]">
      {children}
      {required ? <span className="ml-1 text-[#f04438]">*</span> : null}
    </label>
  );
}

async function readResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text ? { message: text } : null;
}

function extractErrorMessage(body: unknown) {
  if (typeof body === "string" && body.trim()) {
    return body;
  }

  if (body && typeof body === "object") {
    const candidate = body as Record<string, unknown>;

    if (typeof candidate.message === "string" && candidate.message.trim()) {
      return candidate.message;
    }

    if (typeof candidate.error === "string" && candidate.error.trim()) {
      return candidate.error;
    }

    if (Array.isArray(candidate.errors) && candidate.errors.length > 0) {
      const first = candidate.errors[0];
      if (typeof first === "string") {
        return first;
      }
    }
  }

  return "Impossible d'enregistrer le sondage pour le moment.";
}

function extractSuccessMessage(body: unknown) {
  if (body && typeof body === "object") {
    const candidate = body as Record<string, unknown>;
    if (typeof candidate.message === "string" && candidate.message.trim()) {
      return candidate.message;
    }
  }

  return "";
}
