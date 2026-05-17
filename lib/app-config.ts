const envAppUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
const envRegistrationEndpoint =
  process.env.NEXT_PUBLIC_REGISTRATION_ENDPOINT?.trim();
const envRegistrationMode =
  process.env.NEXT_PUBLIC_REGISTRATION_MODE?.trim().toLowerCase();

export const APP_URL =
  envAppUrl && envAppUrl.length > 0
    ? envAppUrl.replace(/\/$/, "")
    : "https://locativeapp.azurewebsites.net";

export const LOGIN_URL = `${APP_URL}/Account/Login`;
export const SIGNUP_PATH = "/inscription";

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
