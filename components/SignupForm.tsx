"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LOGIN_URL,
  REGISTRATION_ENDPOINT,
  REGISTRATION_MODE,
} from "@/lib/app-config";

type SignupFormValues = {
  contactFirstName: string;
  contactLastName: string;
  ownerEmail: string;
  password: string;
  confirmPassword: string;
};

type SignupErrors = Partial<Record<keyof SignupFormValues, string>>;

type SubmissionState =
  | { type: "idle" }
  | { type: "pending_preview"; payload: Record<string, unknown> }
  | { type: "success"; message: string; loginUrl: string }
  | { type: "error"; message: string };

const initialValues: SignupFormValues = {
  contactFirstName: "",
  contactLastName: "",
  ownerEmail: "",
  password: "",
  confirmPassword: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupForm() {
  const [values, setValues] = useState<SignupFormValues>(initialValues);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    type: "idle",
  });

  function updateField<Key extends keyof SignupFormValues>(
    field: Key,
    value: SignupFormValues[Key],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function validateForm(input: SignupFormValues) {
    const nextErrors: SignupErrors = {};

    if (!input.contactFirstName.trim()) {
      nextErrors.contactFirstName = "Le prenom du contact est requis.";
    }

    if (!input.contactLastName.trim()) {
      nextErrors.contactLastName = "Le nom du contact est requis.";
    }

    if (!input.ownerEmail.trim()) {
      nextErrors.ownerEmail = "L'email de connexion est requis.";
    } else if (!emailPattern.test(input.ownerEmail.trim())) {
      nextErrors.ownerEmail = "Entre une adresse email valide.";
    }

    if (!input.password) {
      nextErrors.password = "Le mot de passe est requis.";
    } else if (input.password.length < 8) {
      nextErrors.password =
        "Le mot de passe doit contenir au moins 8 caracteres.";
    }

    if (!input.confirmPassword) {
      nextErrors.confirmPassword = "Confirme le mot de passe.";
    } else if (input.confirmPassword !== input.password) {
      nextErrors.confirmPassword =
        "Le mot de passe et sa confirmation ne correspondent pas.";
    }

    return nextErrors;
  }

  function buildPayload(input: SignupFormValues) {
    const ownerDisplayName = `${input.contactFirstName.trim()} ${input.contactLastName.trim()}`.trim();
    const contactEmail = input.ownerEmail.trim();
    const organizationName = ownerDisplayName || contactEmail;

    return {
      plan: "Free",
      organizationName,
      legalName: organizationName,
      contactFirstName: input.contactFirstName.trim(),
      contactLastName: input.contactLastName.trim(),
      contactEmail,
      contactPhone: null,
      billingEmail: contactEmail,
      ownerDisplayName,
      ownerEmail: contactEmail,
      ownerPassword: input.password,
      companyName: null,
      notes: null,
    };
  }

  function buildPreviewPayload(payload: Record<string, unknown>) {
    return {
      ...payload,
      ownerPassword: "********",
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
    const previewPayload = buildPreviewPayload(payload);

    if (REGISTRATION_MODE !== "live" || !REGISTRATION_ENDPOINT) {
      setSubmissionState({
        type: "pending_preview",
        payload: previewPayload,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(REGISTRATION_ENDPOINT, {
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
          "Compte cree. Tu peux maintenant te connecter a l'application.",
        loginUrl: extractLoginUrl(responseBody) || LOGIN_URL,
      });
      setValues(initialValues);
    } catch (error) {
      setSubmissionState({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Une erreur inconnue est survenue pendant l'inscription.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="glass-card p-8 sm:p-10">
        <div className="mb-8">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-[#0f6f34]">
            Offre Free
          </p>
          <h1 className="text-4xl font-bold text-[#101513] sm:text-5xl">
            Cree ton compte LokIzy.
          </h1>
        </div>

        <div className="mb-8 rounded-3xl border border-[#16a34a]/15 bg-[#e8f7ee] p-5 text-[#0f6f34]">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.14em]">
                Mode inscription
              </p>
              <p className="mt-1 text-base font-semibold">
                {REGISTRATION_MODE === "live"
                  ? "Endpoint connecte"
                  : "Endpoint pas encore pret"}
              </p>
            </div>
            <span className="inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0f6f34]">
              {REGISTRATION_MODE === "live" ? "Live" : "Preview"}
            </span>
          </div>
          <p className="mt-4 text-sm leading-6">
            {REGISTRATION_MODE === "live"
              ? "Le formulaire envoie maintenant une requete reelle vers l'endpoint public d'inscription."
              : "Aucun compte n'est cree pour l'instant. Le submit affiche simplement la requete qui sera envoyee au futur endpoint."}
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              id="contactFirstName"
              label="Prenom"
              value={values.contactFirstName}
              error={errors.contactFirstName}
              onChange={(value) => updateField("contactFirstName", value)}
              placeholder="Prenom"
            />
            <FormField
              id="contactLastName"
              label="Nom"
              value={values.contactLastName}
              error={errors.contactLastName}
              onChange={(value) => updateField("contactLastName", value)}
              placeholder="Nom"
            />
            <FormField
              id="ownerEmail"
              label="Email de connexion"
              type="email"
              value={values.ownerEmail}
              error={errors.ownerEmail}
              onChange={(value) => updateField("ownerEmail", value)}
              placeholder="nom@entreprise.com"
            />
            <div className="space-y-2">
              <label
                htmlFor="plan"
                className="text-sm font-semibold text-[#101513]"
              >
                Plan
              </label>
              <div className="flex h-14 items-center rounded-2xl border border-[#d9e5de] bg-[#f7faf8] px-4 text-sm font-bold text-[#0f6f34]">
                Free
              </div>
            </div>
            <FormField
              id="password"
              label="Mot de passe"
              type="password"
              value={values.password}
              error={errors.password}
              onChange={(value) => updateField("password", value)}
              placeholder="Au moins 8 caracteres"
            />
            <FormField
              id="confirmPassword"
              label="Confirmation du mot de passe"
              type="password"
              value={values.confirmPassword}
              error={errors.confirmPassword}
              onChange={(value) => updateField("confirmPassword", value)}
              placeholder="Retape le mot de passe"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-14 items-center justify-center rounded-full bg-[#0f6f34] px-7 text-base font-semibold text-white shadow-lg shadow-[#16a34a]/20 transition hover:bg-[#0b4f25] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting
                ? "Creation en cours..."
                : REGISTRATION_MODE === "live"
                  ? "Creer mon compte Free"
                  : "Tester le formulaire"}
            </button>
            <Link
              href={LOGIN_URL}
              className="inline-flex h-14 items-center justify-center rounded-full border border-[#d9e5de] bg-white px-7 text-base font-semibold text-[#0f6f34] transition hover:border-[#0f6f34] hover:bg-[#e8f7ee]"
            >
              J'ai deja un compte
            </Link>
          </div>

          {submissionState.type === "pending_preview" ? (
            <article className="rounded-3xl border border-dashed border-[#16a34a]/25 p-6">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-[#0f6f34]">
                Preview de requete
              </p>
              <pre className="overflow-x-auto rounded-2xl bg-[#101513] p-5 text-sm leading-6 text-[#e8f7ee]">
                {JSON.stringify(submissionState.payload, null, 2)}
              </pre>
            </article>
          ) : null}

          {submissionState.type === "success" ? (
            <article className="rounded-3xl border border-[#16a34a]/20 bg-[#e8f7ee] p-6 text-[#0f6f34]">
              <p className="text-sm font-bold uppercase tracking-[0.18em]">
                Inscription envoyee
              </p>
              <p className="mt-3 text-base leading-7">
                {submissionState.message}
              </p>
              <a
                href={submissionState.loginUrl}
                className="mt-5 inline-flex rounded-full bg-[#0f6f34] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0b4f25]"
              >
                Aller a la connexion
              </a>
            </article>
          ) : null}

          {submissionState.type === "error" ? (
            <article className="rounded-3xl border border-[#f04438]/20 bg-[#fef3f2] p-6 text-[#b42318]">
              <p className="text-sm font-bold uppercase tracking-[0.18em]">
                Erreur d'inscription
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

type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
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
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-[#101513]">
        {label}
      </label>
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

  return "Impossible de creer le compte pour le moment.";
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

function extractLoginUrl(body: unknown) {
  if (body && typeof body === "object") {
    const candidate = body as Record<string, unknown>;
    if (typeof candidate.loginUrl === "string" && candidate.loginUrl.trim()) {
      return candidate.loginUrl;
    }
  }

  return "";
}
