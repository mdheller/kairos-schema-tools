import {SdfDocument} from "./models/SdfDocument";
import {Schema} from "./models/Schema";

export class TestData {
  static readonly schema: Schema = {
    id: "https://caci.com/kairos/Schemas/CoordinatedBombingAttack",
    name: "Coordinated Bombing Attack",
  };

  static readonly schemas = [TestData.schema];

  static readonly sdfDocument: SdfDocument = {
    id: "https://caci.com/kairos/Submissions/TA1/1234",
    name: TestData.schema.name,
    schemas: [TestData.schema],
  };

  static readonly sdfDocuments = [TestData.sdfDocument];
}
