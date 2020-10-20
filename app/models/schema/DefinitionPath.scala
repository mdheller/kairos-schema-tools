package models.schema

import edu.rpi.tw.twks.uri.Uri

final case class DefinitionPath(sdfDocument: DefinitionPath.DefinitionPathSdfDocument)

object DefinitionPath {
  final case class DefinitionPathPrimitive(id: Uri, slot: Option[DefinitionPathPrimitiveSlot]) {}

  final case class DefinitionPathPrimitiveSlot(id: Uri)

  final case class DefinitionPathProvenanceDataObject(id: String)

  final case class DefinitionPathStep(id: Uri, participant: Option[DefinitionPathStepParticipant])

  final case class DefinitionPathStepParticipant(id: Uri)

  final case class DefinitionPathSchema(id: Uri, provenanceDataObject: Option[DefinitionPathProvenanceDataObject], slot: Option[DefinitionPathSchemaSlot], step: Option[DefinitionPathStep]) {
    var definedCount = 0
    if (provenanceDataObject.isDefined) {
      definedCount += 1
    }
    if (slot.isDefined) {
      definedCount += 1
    }
    if (step.isDefined) {
      definedCount += 1
    }
    if (definedCount > 1) {
      throw new IllegalArgumentException("must specify one of provenance data object or slot or step")
    }
  }

  final case class DefinitionPathSchemaSlot(id: Uri)

  final case class DefinitionPathSdfDocument(id: Uri, primitive: Option[DefinitionPathPrimitive], schema: Option[DefinitionPathSchema]) {
    if (primitive.isDefined && schema.isDefined) {
      throw new IllegalArgumentException("may only specify one of primitive or schema")
    }
  }

  class DefinitionPathSdfDocumentBuilder(sdfDocumentId: Uri) {
    class DefinitionPathPrimitiveBuilder(primitiveId: Uri) {
      def build = DefinitionPath(sdfDocument = DefinitionPathSdfDocument(id = sdfDocumentId, primitive = Some(DefinitionPathPrimitive(id = primitiveId, slot = None)), schema = None))
      def slot(id: Uri) = DefinitionPath(sdfDocument = DefinitionPathSdfDocument(id = sdfDocumentId, primitive = Some(DefinitionPathPrimitive(id = primitiveId, slot = Some(DefinitionPathPrimitiveSlot(id = id)))), schema = None))
    }

    class DefinitionPathSchemaBuilder(schemaId: Uri) {
      class DefinitionPathSchemaStepBuilder(stepId: Uri) {
        def build = DefinitionPath(sdfDocument = DefinitionPathSdfDocument(id = sdfDocumentId, primitive = None, schema = Some(DefinitionPathSchema(id = schemaId, provenanceDataObject = None, slot = None, step = Some(DefinitionPathStep(id = stepId, participant = None))))))
        def participant(id: Uri) = DefinitionPath(sdfDocument = DefinitionPathSdfDocument(id = sdfDocumentId, primitive = None, schema = Some(DefinitionPathSchema(id = schemaId, provenanceDataObject = None, slot = None, step = Some(DefinitionPathStep(id = stepId, participant = Some(DefinitionPathStepParticipant(id = id))))))))
      }

      def build = DefinitionPath(sdfDocument = DefinitionPathSdfDocument(id = sdfDocumentId, primitive = None, schema = Some(DefinitionPathSchema(id = schemaId, provenanceDataObject = None, slot = None, step = None))))
      def provenanceDataObject(id: String) = DefinitionPath(sdfDocument = DefinitionPathSdfDocument(id = sdfDocumentId, primitive = None, schema = Some(DefinitionPathSchema(id = schemaId, provenanceDataObject = Some(DefinitionPathProvenanceDataObject(id = id)), slot = None, step = None))))
      def slot(id: Uri) = DefinitionPath(sdfDocument = DefinitionPathSdfDocument(id = sdfDocumentId, primitive = None, schema = Some(DefinitionPathSchema(id = schemaId, provenanceDataObject = None, slot = Some(DefinitionPathSchemaSlot(id = id)), step = None))))
      def step(id: Uri) = new DefinitionPathSchemaStepBuilder(stepId = id)
    }


    def build = DefinitionPath(sdfDocument = DefinitionPathSdfDocument(id = sdfDocumentId, primitive = None, schema = None))
    def primitive(id: Uri) = new DefinitionPathPrimitiveBuilder(primitiveId = id)
    def schema(id: Uri) = new DefinitionPathSchemaBuilder(schemaId = id)
  }

  def sdfDocument(id: Uri) = new DefinitionPathSdfDocumentBuilder(id)
}
