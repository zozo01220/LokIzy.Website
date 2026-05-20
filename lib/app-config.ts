const envAppUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
const envRegistrationEndpoint =
  process.env.NEXT_PUBLIC_REGISTRATION_ENDPOINT?.trim();
const envRegistrationMode =
  process.env.NEXT_PUBLIC_REGISTRATION_MODE?.trim().toLowerCase();
const envSurveyEndpoint = process.env.NEXT_PUBLIC_SURVEY_ENDPOINT?.trim();
const envSurveyMode = process.env.NEXT_PUBLIC_SURVEY_MODE?.trim().toLowerCase();

export const APP_URL =
  envAppUrl && envAppUrl.length > 0
    ? envAppUrl.replace(/\/$/, "")
    : "https://app.lok-izy.fr";

export const LOGIN_URL = `${APP_URL}/Account/Login`;
export const SURVEY_PATH = "/survey";

export const REGISTRATION_ENDPOINT =
  envRegistrationEndpoint && envRegistrationEndpoint.length > 0
    ? envRegistrationEndpoint
    : `${APP_URL}/api/public/register-free`;

export const REGISTRATION_MODE =
  envRegistrationMode === "pending"
    ? "pending"
    : REGISTRATION_ENDPOINT
      ? "live"
      : "pending";

export const SURVEY_ENDPOINT =
  envSurveyEndpoint && envSurveyEndpoint.length > 0
    ? envSurveyEndpoint
    : `/api/public/product-survey`;

export const SURVEY_MODE =
  envSurveyMode === "pending"
    ? "pending"
    : SURVEY_ENDPOINT
      ? "live"
      : "pending";
