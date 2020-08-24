import * as React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import {SchemasPageQuery} from "api/queries/types/SchemasPageQuery";
import * as SchemasPageQueryDocument from "api/queries/SchemasPageQuery.graphql";
import {Frame} from "components/frame/Frame";
import {StandardLayout} from "components/layout/StandardLayout";
import {Hrefs} from "Hrefs";
import {SchemasTable} from "components/schema/SchemasTable";
import {NoRoute} from "components/error/NoRoute";
import {BreadcrumbsProps} from "components/breadcrumbs/BreadcrumbsProps";
import {Link} from "components/link/Link";
import {DefinitionPath} from "models/definition/DefinitionPath";

export const SchemasPage: React.FunctionComponent = () => {
  let {sdfDocumentId} = useParams<{sdfDocumentId?: string}>();
  if (sdfDocumentId) {
    sdfDocumentId = decodeURIComponent(sdfDocumentId);
  }

  const query = useQuery<SchemasPageQuery>(SchemasPageQueryDocument, {
    fetchPolicy: "no-cache",
    variables: {
      sdfDocumentId: sdfDocumentId ?? "",
      withSdfDocument: !!sdfDocumentId,
    },
  });

  return (
    <Frame {...query}>
      {({data}) => {
        let breadcrumbs: BreadcrumbsProps | undefined;
        type Schema = {id: string; label: string; path: DefinitionPath};
        let schemas: Schema[];
        let subtitle: React.ReactNode | undefined;
        if (sdfDocumentId) {
          const sdfDocument = data.sdfDocumentById;
          if (!sdfDocument) {
            return <NoRoute />;
          }
          breadcrumbs = {
            sdfDocument: {id: sdfDocumentId, label: sdfDocument.label},
          };
          schemas = sdfDocument!.schemas.map((schema) =>
            Object.assign({}, schema, {sdfDocumentId: sdfDocumentId!})
          );
          subtitle = (
            <span>
              Document:{" "}
              <Link
                dataCy="sdf-document-name"
                to={Hrefs.sdfDocuments
                  .sdfDocument({id: sdfDocumentId})
                  .toString()}
              >
                {sdfDocument.label}
              </Link>
            </span>
          );
        } else {
          schemas = data.schemas ?? [];
        }

        return (
          <StandardLayout
            breadcrumbs={breadcrumbs}
            subtitle={subtitle}
            title="Schemas"
          >
            <SchemasTable schemas={schemas} />
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
