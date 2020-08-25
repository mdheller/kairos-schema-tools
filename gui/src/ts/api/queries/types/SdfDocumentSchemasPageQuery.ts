/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SdfDocumentSchemasPageQuery
// ====================================================

export interface SdfDocumentSchemasPageQuery_sdfDocumentById_schemas_path_sdfDocument_primitive_slot {
  __typename: "DefinitionPathPrimitiveSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSchemasPageQuery_sdfDocumentById_schemas_path_sdfDocument_primitive {
  __typename: "DefinitionPathPrimitive";
  id: string;
  label: string | null;
  slot: SdfDocumentSchemasPageQuery_sdfDocumentById_schemas_path_sdfDocument_primitive_slot | null;
}

export interface SdfDocumentSchemasPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_slot {
  __typename: "DefinitionPathSchemaSlot";
  id: string;
  label: string | null;
}

export interface SdfDocumentSchemasPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_step_participant {
  __typename: "DefinitionPathStepParticipant";
  id: string;
  label: string | null;
}

export interface SdfDocumentSchemasPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_step {
  __typename: "DefinitionPathStep";
  id: string;
  label: string | null;
  participant: SdfDocumentSchemasPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_step_participant | null;
}

export interface SdfDocumentSchemasPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema {
  __typename: "DefinitionPathSchema";
  id: string;
  label: string | null;
  slot: SdfDocumentSchemasPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_slot | null;
  step: SdfDocumentSchemasPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema_step | null;
}

export interface SdfDocumentSchemasPageQuery_sdfDocumentById_schemas_path_sdfDocument {
  __typename: "DefinitionPathSdfDocument";
  id: string;
  primitive: SdfDocumentSchemasPageQuery_sdfDocumentById_schemas_path_sdfDocument_primitive | null;
  schema: SdfDocumentSchemasPageQuery_sdfDocumentById_schemas_path_sdfDocument_schema | null;
}

export interface SdfDocumentSchemasPageQuery_sdfDocumentById_schemas_path {
  __typename: "DefinitionPath";
  sdfDocument: SdfDocumentSchemasPageQuery_sdfDocumentById_schemas_path_sdfDocument;
}

export interface SdfDocumentSchemasPageQuery_sdfDocumentById_schemas {
  __typename: "Schema";
  id: string;
  label: string;
  path: SdfDocumentSchemasPageQuery_sdfDocumentById_schemas_path;
}

export interface SdfDocumentSchemasPageQuery_sdfDocumentById {
  __typename: "SdfDocument";
  label: string;
  schemas: SdfDocumentSchemasPageQuery_sdfDocumentById_schemas[];
}

export interface SdfDocumentSchemasPageQuery {
  sdfDocumentById: SdfDocumentSchemasPageQuery_sdfDocumentById | null;
}

export interface SdfDocumentSchemasPageQueryVariables {
  sdfDocumentId: string;
}
