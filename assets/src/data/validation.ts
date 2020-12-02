import Validator, {
  ValidationError,
  ValidationSchema,
} from "fastest-validator";
import { Element, Limit, Range } from "~/assets/src/data/fighters";

const statisticPattern = /^(-|[0-9]{0,1})$/g;
const healthPattern = /^(-|[0-9]{0,2})$/g;
const imagePattern = /(.*\.png)|(data:image\/(png|jpe?g);base64,([A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=))/g;

const krosmasterDataSchema: ValidationSchema = {
  type: "object",
  props: {
    name: { type: "string" },
    type: { type: "enum", values: ["common", "elite", "minion"] },
    comment: { type: "string", default: "" },

    mp: { type: "string", pattern: statisticPattern },
    hp: { type: "string", pattern: healthPattern },
    ap: { type: "string", pattern: statisticPattern },

    powers: {
      type: "array",
      empty: true,
      min: 0,
      max: 3,
      items: {
        type: "object",
        props: { name: { type: "string" }, description: { type: "string" } },
      },
    },

    spells: {
      type: "array",
      empty: true,
      min: 0,
      max: 3,
      items: {
        type: "object",
        props: {
          name: { type: "string" },
          description: { type: "string" },
          damage: {
            type: "object",
            props: {
              element: {
                type: "enum",
                values: [
                  Element.NONE,
                  Element.AIR,
                  Element.EARTH,
                  Element.FIRE,
                  Element.WATER,
                ],
              },
              value: { type: "number", integer: true, min: 0, max: 9 },
            },
          },
          range: {
            type: "object",
            props: {
              type: {
                type: "enum",
                values: [Range.REGULAR, Range.SPECIAL],
              },
              value: {
                type: "array",
                min: 2,
                max: 2,
                items: { type: "number", integer: true, min: 0, max: 9 },
                custom: (
                  value: number[],
                  errors: ValidationError[],
                  _: any,
                  field: string
                ) => {
                  if (value && value.length === 2) {
                    const minRange = value[0];
                    const maxRange = value[1];
                    if (minRange > maxRange) {
                      errors.push({
                        type: "rangeMinMax",
                        field: field,
                        message:
                          "Minimum spell range cannot be higher than maximum spell range in {field}.",
                      });
                    }
                  }
                  return value;
                },
              },
            },
          },
          limit: {
            type: "object",
            props: {
              type: {
                type: "enum",
                values: [Limit.NONE, Limit.TARGET, Limit.TURN],
              },
              value: { type: "number", integer: true, min: 0, max: 9 },
            },
          },
        },
      },
    },
  },
  custom: (value: any, errors: ValidationError[], _: any, field: string) => {
    const maximumAbilitiesCount = value?.type === "minion" ? 1 : 3;
    const abilitiesCount =
      (value?.spells?.length || 0) + (value?.powers?.length || 0);
    if (abilitiesCount > maximumAbilitiesCount) {
      errors.push({
        type: "maxAbilities",
        field: "data",
        message: `This card cannot have more than ${maximumAbilitiesCount} abilities. Found ${abilitiesCount}.`,
      });
    }
    return value;
  },
};
const cropperDataSchema: ValidationSchema = {
  type: "object",
  optional: true,
  props: {
    canvasData: {
      type: "object",
      optional: true,
      props: {
        left: { type: "number", optional: true },
        top: { type: "number", optional: true },
        width: { type: "number", optional: true },
        height: { type: "number", optional: true },
        naturalWidth: { type: "number", optional: true },
        naturalHeight: { type: "number", optional: true },
      },
    },
    croppingData: {
      type: "object",
      optional: true,
      props: {
        x: { type: "number", optional: true },
        y: { type: "number", optional: true },
        width: { type: "number", optional: true },
        height: { type: "number", optional: true },
        rotate: { type: "number", optional: true },
        scaleX: { type: "number", optional: true },
        scaleY: { type: "number", optional: true },
      },
    },
  },
};
const krosmasterSchema: ValidationSchema = {
  id: { type: "string" },
  data: krosmasterDataSchema,
  background: {
    type: "object",
    props: {
      original: { type: "string", pattern: imagePattern },
      cropped: { type: "string", pattern: imagePattern },
      useCropped: { type: "boolean" },
      cropper: cropperDataSchema,
    },
  },
  figurine: {
    type: "object",
    props: {
      original: { type: "string", pattern: imagePattern },
      cropped: { type: "string", pattern: imagePattern },
      useCropped: { type: "boolean" },
      height: { type: "number" },
      offsetX: { type: "number" },
      offsetY: { type: "number" },
      cropper: cropperDataSchema,
    },
  },
};

const validator = new Validator({
  useNewCustomCheckerFunction: true,
}).compile(krosmasterSchema);

export function validateKrosmasterData(krosmaster: any): ValidationError[] {
  const errors = validator(krosmaster);
  return errors === true ? [] : errors;
}
