import * as React from "react";
import {Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import {Hrefs} from "Hrefs";
import {Link} from "components/link/Link";
import {SdfDocumentSourceLink} from "components/link/SdfDocumentSourceLink";
import {DefinitionPath} from "models/definition/DefinitionPath";

export const SchemasTable: React.FunctionComponent<{
  schemas: {id: string; label: string; path: DefinitionPath}[];
}> = ({schemas}) => (
  <Table data-cy="schemas-table">
    <TableBody>
      {schemas.map((schema) => {
        const schemaHref = Hrefs.sdfDocuments
          .sdfDocument({id: schema.path.sdfDocument.id})
          .schemas.schema(schema)
          .toString();
        return (
          <TableRow data-cy={"schema-" + schema.id} key={schema.id}>
            <TableCell data-cy="schema-id">
              <Link to={schemaHref}>{schema.id}</Link>
            </TableCell>
            <TableCell data-cy="schema-name">
              <Link to={schemaHref}>{schema.label}</Link>
            </TableCell>
            <TableCell data-cy="schema-source">
              <SdfDocumentSourceLink to={schema.path} />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  </Table>
);
