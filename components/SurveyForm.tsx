"use client";

import Link from "next/link";
import { useState } from "react";
import { SURVEY_ENDPOINT, SURVEY_MODE } from "@/lib/app-config";

const CANCEL_URL = "https://lokizy-web.vercel.app/";

type SurveyFormValues = {
  fullName: string;
  email: string;
  profile: string;
  surveyPain: string;
  surveyFeature: string;
  surveyPrice: string;
  notifyOnLaunch: boolean;
};

type SurveyErrors = Partial<Record<keyof SurveyFormValues, string>>;

type SubmissionState =
  | { type: "idle" }
  | { type: "preview"; payload: Record<string, unknown> }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

const initialValues: SurveyFormValues = {
  fullName: "",
  email: "",
  profile: "",
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

    if (!input.fullName.trim()) {
      nextErrors.fullName = "Le nom complet est requis.";
    }

    if (!input.email.trim()) {
      nextErrors.email = "L'email est requis.";
    } else if (!emailPattern.test(input.email.trim())) {
      nextErrors.email = "Entrez une adresse email valide.";
    }

    if (!input.profile.trim()) {
      nextErrors.profile = "Le profil est requis.";
    }

    return nextErrors;
  }

  function buildPayload(input: SurveyFormValues) {
    return {
      fullName: input.fullName.trim(),
      email: input.email.trim(),
      profile: input.profile.trim(),
      surveyPain: input.surveyPain.trim() || null,
      surveyFeature: input.surveyFeature.trim() || null,
      surveyPrice: input.surveyPrice.trim() || null,
      notifyOnLaunch: input.notifyOnLaunch,
      source: "website_survey_form",
      createdAtPreview: new Date().toISOString(),
    };
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
        message:
          extractSuccessMessage(responseBody) ||
          "Sondage enregistré avec succès.",
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
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#0f6f34]">
            Sondage produit
          </p>
          <h1 className="text-4xl font-bold text-[#101513] sm:text-5xl">
            Participer au sondage Lok Izy.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-[#66736d]">
            Le produit n&apos;est pas encore en phase de vente publique. Ce
            formulaire nous aide à mieux comprendre les besoins prioritaires et
            à préparer le futur branchement de la collecte.
          </p>
        </div>

        <div className="mb-8 rounded-3xl border border-[#16a34a]/15 bg-[#e8f7ee] p-5 text-[#0f6f34]">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em]">
                Statut du formulaire
              </p>
              <p className="mt-1 text-base font-semibold">
                {SURVEY_MODE === "live"
                  ? "Endpoint connecté"
                  : "Sondage prêt, en attente du branchement base de données"}
              </p>
            </div>
            <span className="inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0f6f34]">
              {SURVEY_MODE === "live" ? "Live" : "Preview"}
            </span>
          </div>
          <p className="mt-4 text-sm leading-6">
            {SURVEY_MODE === "live"
              ? "Le formulaire envoie maintenant une requête réelle vers l'endpoint public de sondage."
              : "Le bouton ne soumet rien pour l'instant. Il prépare simplement la structure qui sera reliée plus tard à la DB ou à un endpoint."}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              id="fullName"
              label="Nom complet"
              required
              value={values.fullName}
              error={errors.fullName}
              onChange={(value) => updateField("fullName", value)}
              placeholder="Prénom Nom"
            />
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
            <div className="space-y-2">
              <FieldLabel htmlFor="profile" required>
                Profil
              </FieldLabel>
              <select
                id="profile"
                value={values.profile}
                onChange={(event) => updateField("profile", event.target.value)}
                className={`h-14 w-full rounded-2xl border bg-white px-4 text-[#101513] outline-none transition focus:ring-4 ${
                  errors.profile
                    ? "border-[#f04438] focus:border-[#f04438] focus:ring-[#f04438]/10"
                    : "border-[#d9e5de] focus:border-[#16a34a] focus:ring-[#16a34a]/10"
                }`}
              >
                <option value="">Sélectionner un profil</option>
                <option value="proprietaire">Propriétaire / admin</option>
                <option value="locataire">Locataire</option>
                <option value="partenaire">Partenaire</option>
                <option value="autre">Autre</option>
              </select>
              {errors.profile ? (
                <p className="text-sm font-medium text-[#b42318]">
                  {errors.profile}
                </p>
              ) : null}
            </div>

            <TextareaField
              id="surveyPain"
              label="1. Je développe une plateforme de gestion locative pour petits propriétaires. Quelle est votre plus grosse galère aujourd'hui ?"
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
              placeholder="Exemple : 15 EUR/mois, 29 EUR/mois, 49 EUR/mois..."
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
                    values.notifyOnLaunch ? "bg-[#16a34a]" : "bg-[#cfd9d3]"
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
                    Activé pour recevoir l'information quand Lok Izy sera disponible.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-14 items-center justify-center rounded-full bg-[#0f6f34] px-7 text-base font-semibold text-white shadow-lg shadow-[#16a34a]/20 transition hover:bg-[#0b4f25] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Enregistrement..." : "Enregistrer"}
            </button>
            <Link
              href={CANCEL_URL}
              className="inline-flex h-14 items-center justify-center rounded-full border border-[#d9e5de] bg-white px-7 text-base font-semibold text-[#0f6f34] transition hover:border-[#0f6f34] hover:bg-[#e8f7ee]"
            >
              Abandonner
            </Link>
          </div>

          {submissionState.type === "preview" ? (
            <article className="rounded-3xl border border-dashed border-[#16a34a]/25 p-6">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#0f6f34]">
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

          {submissionState.type === "success" ? (
            <article className="rounded-3xl border border-[#16a34a]/20 bg-[#e8f7ee] p-6 text-[#0f6f34]">
              <p className="text-sm font-bold uppercase tracking-[0.18em]">
                Sondage enregistré
              </p>
              <p className="mt-3 text-base leading-7">
                {submissionState.message}
              </p>
            </article>
          ) : null}

          {submissionState.type === "error" ? (
            <article className="rounded-3xl border border-[#f04438]/20 bg-[#fef3f2] p-6 text-[#b42318]">
              <p className="text-sm font-bold uppercase tracking-[0.18em]">
                Erreur d'enregistrement
              </p>
              <p className="mt-3 text-base leading-7">
                {submissionState.message}
              </p>
            </article>
          ) : null}
        </form>
      </div>
    </div>
  );
}

type BaseFieldProps = {
  id: string;
  label: string;
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
            : "border-[#d9e5de] focus:border-[#16a34a] focus:ring-[#16a34a]/10"
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
        className="w-full rounded-2xl border border-[#d9e5de] bg-white px-4 py-4 text-[#101513] outline-none transition focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10"
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
