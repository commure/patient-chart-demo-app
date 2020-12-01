import { StandalonePreference, Config } from "@commure/smart-core";

if (!process.env.REACT_APP_CLIENT_ID || !process.env.REACT_APP_FHIR_BASE_URL) {
  throw new Error('Please define `REACT_APP_CLIENT_ID` and `REACT_APP_FHIR_BASE_URL` in your .env file');
}

const clientId = process.env.REACT_APP_CLIENT_ID;
const fhirBaseUrl = process.env.REACT_APP_FHIR_BASE_URL;

export const smartConfig: Config = {
  clientId,
  scopes: ["launch", "openid", "fhiruser", "patient/*.read"],
  redirectUri: `http://localhost:1234/callback`,
  standaloneLaunch: StandalonePreference.IfNecessary,
  fhirBaseUrl
};
