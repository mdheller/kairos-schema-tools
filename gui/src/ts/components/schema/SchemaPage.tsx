import * as React from "react";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import * as SchemaPageQueryDocument from "api/queries/SchemaPageQuery.graphql";
import {Frame} from "components/frame/Frame";
import {SchemaPageQuery} from "api/queries/types/SchemaPageQuery";
import {StandardLayoutBreadcrumbs} from "components/layout/StandardLayoutBreadcrumbs";
import {StandardLayout} from "components/layout/StandardLayout";
import {
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import {SchemaDetailsTable} from "components/schema/SchemaDetailsTable";
import {NoRoute} from "components/error/NoRoute";
import {StepCard} from "components/schema/StepCard";
import {StepOrderCard} from "components/schema/StepOrderCard";
import {EntityRelationCard} from "components/schema/EntityRelationCard";
import {SlotCard} from "components/schema/SlotCard";
import {Hrefs} from "Hrefs";
import FolderIcon from "@material-ui/icons/Folder";
import {makeStyles} from "@material-ui/core/styles";
import WorkIcon from "@material-ui/icons/Work";

const useStyles = makeStyles((theme) => ({
  nestedListItem: {
    paddingLeft: theme.spacing(12),
  },
}));

export const SchemaPage: React.FunctionComponent = () => {
  let {schemaId, sdfDocumentId} = useParams<{
    schemaId: string;
    sdfDocumentId?: string;
  }>();
  schemaId = decodeURIComponent(schemaId);
  if (sdfDocumentId) {
    sdfDocumentId = decodeURIComponent(sdfDocumentId);
  }

  const query = useQuery<SchemaPageQuery>(SchemaPageQueryDocument, {
    variables: {
      schemaId,
      sdfDocumentId: sdfDocumentId ?? "",
      withSdfDocument: !!sdfDocumentId,
    },
  });

  const hrefs = sdfDocumentId
    ? Hrefs.sdfDocuments
        .sdfDocument({id: sdfDocumentId})
        .schemas.schema({id: schemaId})
    : Hrefs.schemas.schema({id: schemaId});

  const classes = useStyles();

  return (
    <Frame {...query}>
      {({data}) => {
        if (!data.schemaById) {
          return <NoRoute />;
        }

        let breadcrumbs: StandardLayoutBreadcrumbs;
        const schema = Object.assign({}, data.schemaById!, {id: schemaId});
        if (sdfDocumentId) {
          const sdfDocument = data.sdfDocumentById;
          if (!sdfDocument) {
            return <NoRoute />;
          }
          breadcrumbs = {
            schema,
            sdfDocument: {id: sdfDocumentId, name: sdfDocument!.name},
          };
        } else {
          breadcrumbs = {schema};
        }

        const schemaParts: {
          children: React.ReactNode;
          id: string;
          title: string;
        }[] = [];

        schemaParts.push({
          id: hrefs.DETAILS_ID,
          title: "Details",
          children: <SchemaDetailsTable schema={schema} />,
        });

        schemaParts.push({
          id: hrefs.STEPS_ID,
          title: "Steps",
          children: (
            <Grid container direction="column" spacing={4}>
              {schema.steps.map((step) => (
                <Grid item id={hrefs.stepId(step)} key={step.id}>
                  <StepCard step={step} />
                </Grid>
              ))}
            </Grid>
          ),
        });

        schemaParts.push({
          id: hrefs.STEP_ORDER_ID,
          title: "Step order",
          children: (
            <Grid container direction="column" spacing={4}>
              {schema.order.map((stepOrder, stepOrderIndex) => (
                <Grid item key={stepOrderIndex}>
                  <StepOrderCard
                    hrefs={hrefs}
                    stepOrder={stepOrder}
                    stepOrderIndex={stepOrderIndex}
                    steps={schema.steps}
                  />
                </Grid>
              ))}
            </Grid>
          ),
        });

        schemaParts.push({
          id: hrefs.ENTITY_RELATIONS_ID,
          title: "Entity relations",
          children: (
            <Grid container direction="column" spacing={4}>
              {schema.entityRelations.map(
                (entityRelation, entityRelationIndex) => (
                  <Grid item key={entityRelationIndex}>
                    <EntityRelationCard
                      entityRelation={entityRelation}
                      entityRelationIndex={entityRelationIndex}
                      hrefs={hrefs}
                      slots={schema.slots}
                    />
                  </Grid>
                )
              )}
            </Grid>
          ),
        });

        schemaParts.push({
          id: hrefs.SLOTS_ID,
          title: "Slots",
          children: (
            <Grid container direction="column" spacing={4}>
              {schema.slots.map((slot) => (
                <Grid item id={hrefs.slotId(slot)} key={slot.id}>
                  <SlotCard slot={slot} />
                </Grid>
              ))}
            </Grid>
          ),
        });

        return (
          <StandardLayout
            breadcrumbs={breadcrumbs}
            subtitle={schema.id}
            title={
              <span>
                Schema: <strong data-cy="schema-name">{schema.name}</strong>
              </span>
            }
          >
            <Grid container direction="column" spacing={8}>
              <Grid item>
                <List>
                  {schemaParts.map((schemaPart) => (
                    <React.Fragment key={schemaPart.id}>
                      <ListItem>
                        <ListItemIcon>
                          <FolderIcon />
                        </ListItemIcon>
                        <ListItemText>
                          <Link href={hrefs.home + "#" + schemaPart.id}>
                            {schemaPart.title}
                          </Link>
                        </ListItemText>
                      </ListItem>
                      {schemaPart.id === hrefs.SLOTS_ID ||
                      schemaPart.id === hrefs.STEPS_ID ? (
                        <List component="div" disablePadding>
                          {schemaPart.id === hrefs.SLOTS_ID
                            ? schema.slots.map((slot) => (
                                <ListItem
                                  className={classes.nestedListItem}
                                  key={slot.id}
                                >
                                  <ListItemIcon>
                                    <WorkIcon />
                                  </ListItemIcon>
                                  <ListItemText>
                                    <Link href={hrefs.slot(slot)}>
                                      Slot: {slot.roleName}
                                    </Link>
                                  </ListItemText>
                                </ListItem>
                              ))
                            : null}
                          {schemaPart.id === hrefs.STEPS_ID
                            ? schema.steps.map((step) => (
                                <ListItem
                                  className={classes.nestedListItem}
                                  key={step.id}
                                >
                                  <ListItemIcon>
                                    <WorkIcon />
                                  </ListItemIcon>
                                  <ListItemText>
                                    <Link href={hrefs.step(step)}>
                                      Step: {step.name}
                                    </Link>
                                  </ListItemText>
                                </ListItem>
                              ))
                            : null}
                        </List>
                      ) : null}
                    </React.Fragment>
                  ))}
                </List>
              </Grid>
              {schemaParts.map((schemaPart) => (
                <Grid item>
                  <Grid
                    container
                    direction="column"
                    id={schemaPart.id}
                    key={schemaPart.id}
                    spacing={4}
                  >
                    <Grid item>
                      <Typography variant="h4">{schemaPart.title}</Typography>
                    </Grid>
                    <Grid>{schemaPart.children}</Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </StandardLayout>
        );
      }}
    </Frame>
  );
};
