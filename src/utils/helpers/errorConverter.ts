import { OperationOutcome } from "@commure/fhir-types/r4/types";

export function errorToOperationOutcome(
  error: Error,
  resourceType: string
): OperationOutcome {
  let operationOutcomeError: OperationOutcome;
  try {
    operationOutcomeError = JSON.parse(error.message) as OperationOutcome;
  } catch (e) {
    operationOutcomeError = {
      resourceType,
      issue: []
    };
  }
  return operationOutcomeError;
}
