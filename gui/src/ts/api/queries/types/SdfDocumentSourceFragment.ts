/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { ValidationMessageType } from "./../../graphqlGlobalTypes";

// ====================================================
// GraphQL fragment: SdfDocumentSourceFragment
// ====================================================

export interface SdfDocumentSourceFragment_schemas_slots_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_slots {
  __typename: "Slot";
  id: string;
  label: string;
  sourceJsonNodeLocation: SdfDocumentSourceFragment_schemas_slots_sourceJsonNodeLocation;
}

export interface SdfDocumentSourceFragment_schemas_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_steps_participants_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_steps_participants {
  __typename: "StepParticipant";
  id: string;
  label: string;
  sourceJsonNodeLocation: SdfDocumentSourceFragment_schemas_steps_participants_sourceJsonNodeLocation;
}

export interface SdfDocumentSourceFragment_schemas_steps_sourceJsonNodeLocation {
  __typename: "JsonNodeLocation";
  column: number;
  line: number;
}

export interface SdfDocumentSourceFragment_schemas_steps {
  __typename: "Step";
  id: string;
  label: string;
  participants: SdfDocumentSourceFragment_schemas_steps_participants[] | null;
  sourceJsonNodeLocation: SdfDocumentSourceFragment_schemas_steps_sourceJsonNodeLocation;
}

export interface SdfDocumentSourceFragment_schemas {
  __typename: "Schema";
  id: string;
  label: string;
  sdfDocumentId: string;
  slots: SdfDocumentSourceFragment_schemas_slots[];
  sourceJsonNodeLocation: SdfDocumentSourceFragment_schemas_sourceJsonNodeLocation;
  steps: SdfDocumentSourceFragment_schemas_steps[];
}

export interface SdfDocumentSourceFragment_validationMessages_path {
  __typename: "SchemaPath";
  schemaId: string | null;
  sdfDocumentId: string;
  slotId: string | null;
  stepId: string | null;
  stepParticipantId: string | null;
}

export interface SdfDocumentSourceFragment_validationMessages {
  __typename: "ValidationMessage";
  message: string;
  path: SdfDocumentSourceFragment_validationMessages_path;
  type: ValidationMessageType;
}

export interface SdfDocumentSourceFragment {
  __typename: "SdfDocument";
  id: string;
  label: string;
  schemas: SdfDocumentSourceFragment_schemas[];
  sdfVersion: string;
  sourceJson: string;
  validationMessages: SdfDocumentSourceFragment_validationMessages[];
}
