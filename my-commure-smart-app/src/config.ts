import { StandalonePreference } from "@commure/smart-core";

const fhirBaseUrl = process.env.REACT_APP_FHIR_BASE_URL;

if (fhirBaseUrl === undefined) {
  throw new Error(
    "Make sure you set your FHIR_BASE_URL! e.g. export REACT_APP_FHIR_BASE_URL=https://api-0000.developer.commure.com/api/v1/r4 && yarn start"
  );
}

export const smartConfig = {
  clientId: "smart_hello_world",
  scopes: ["launch", "openid", "fhiruser", "patient/*.read"],
  redirectUri: `http://localhost:1234/callback`,
  standaloneLaunch: StandalonePreference.IfNecessary,
  fhirBaseUrl
};
