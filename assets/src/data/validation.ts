import Validator, {
  ValidationError,
  ValidationSchema,
} from "fastest-validator";
import { Element, FighterType, Limit, Range } from "~/assets/src/data/fighters";
import { CardType } from "~/store/card";
import { FavorType } from "~/store/favor";

const statisticPattern = /^(-|[0-9]{0,1})$/g;
const healthPattern = /^(-|[0-9]{0,2})$/g;
const imagePattern =
  /(.*\.png)|(data:image\/(png|jpe?g);base64,([A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?)/g;

const fighterDataSchema: ValidationSchema = {
  type: "object",
  optional: true,
  props: {
    name: { type: "string" },
    suffix: { type: "string", default: "" },
    type: {
      type: "enum",
      values: [FighterType.COMMON, FighterType.ELITE, FighterType.MINION],
    },
    twoSided: { type: "boolean", default: false },

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

    // Legacy properties:
    comment: { type: "string", optional: true },
    version: { type: "string", optional: true },
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

const favorSchema: ValidationSchema = {
  type: "object",
  optional: true,
  props: {
    type: { type: "enum", values: [FavorType.REGULAR, FavorType.SUPERIOR] },
    name: { type: "string" },
    effect: { type: "string" },
  },
};

const challengeSchema: ValidationSchema = {
  type: "object",
  optional: true,
  props: {
    name: { type: "string" },
    powers: {
      type: "array",
      min: 3,
      max: 3,
      items: {
        type: "object",
        props: {
          name: { type: "string" },
          description: { type: "string" },
          glyphs: { type: "number", integer: true, min: 0, max: 8 },
          isActive: { type: "boolean" },
        },
      },
    },
  },
};

const basicDataSchema: ValidationSchema = {
  type: "object",
  // This object is only optional to support legacy JSON files.
  optional: true,
  props: {
    type: {
      type: "enum",
      values: [CardType.FIGHTER, CardType.FAVOR, CardType.CHALLENGE],
    },
    comment: { type: "string", default: "" },
    version: { type: "string", default: "" },
  },
};

const cardSchema: ValidationSchema = {
  $$root: true,
  type: "object",
  props: {
    id: { type: "string" },
    card: basicDataSchema,
    data: fighterDataSchema,
    reverse: fighterDataSchema,
    favor: favorSchema,
    challenge: challengeSchema,
    dpi: { type: "number", integer: true, optional: true },
    background: {
      type: "object",
      optional: true,
      props: {
        original: { type: "string", pattern: imagePattern },
        cropped: { type: "string", pattern: imagePattern, optional: true },
        useCropped: { type: "boolean" },
        cropper: cropperDataSchema,
      },
    },
    figurine: {
      type: "object",
      optional: true,
      props: {
        original: { type: "string", pattern: imagePattern },
        cropped: { type: "string", pattern: imagePattern, optional: true },
        useCropped: { type: "boolean" },
        height: { type: "number" },
        offsetX: { type: "number" },
        offsetY: { type: "number" },
        cropper: cropperDataSchema,
      },
    },
    reverseFigurine: {
      type: "object",
      optional: true,
      props: {
        original: { type: "string", pattern: imagePattern },
        cropped: { type: "string", pattern: imagePattern, optional: true },
        useCropped: { type: "boolean" },
        height: { type: "number" },
        offsetX: { type: "number" },
        offsetY: { type: "number" },
        cropper: cropperDataSchema,
        useSameImage: { type: "boolean" },
      },
    },
  },
  custom: (value: any, errors: ValidationError[], _: any, field: string) => {
    let cardType: CardType = CardType.FIGHTER;
    const definedType = value?.card?.type;
    // Preventing from assigning invalid types:
    if (definedType === CardType.FIGHTER) {
      cardType = CardType.FIGHTER;
    } else if (definedType === CardType.FAVOR) {
      cardType = CardType.FAVOR;
    } else if (definedType === CardType.CHALLENGE) {
      cardType = CardType.CHALLENGE;
    }

    switch (cardType) {
      case CardType.FIGHTER:
        let isTwoSided = false;
        if (!value.data) {
          errors.push({
            type: "missingProperty",
            field: "data",
            message: `Fighter cards must include a "data" property.`,
          });
        } else {
          isTwoSided = "twoSided" in value.data ? value.data.twoSided : false;
        }
        if (!value.figurine) {
          errors.push({
            type: "missingProperty",
            field: "figurine",
            message: `Fighter cards must include a "figurine" property.`,
          });
        }
        if (isTwoSided) {
          if (!value.reverse) {
            errors.push({
              type: "missingProperty",
              field: "reverse",
              message: `Two-sided fighter cards must include a "reverse" property.`,
            });
          }
          if (!value.reverseFigurine) {
            errors.push({
              type: "missingProperty",
              field: "reverseFigurine",
              message: `Two-sided fighter cards must include a "reverseFigurine" property.`,
            });
          }
        } else if (!value.background) {
          errors.push({
            type: "missingProperty",
            field: "background",
            message: `Fighter cards must include a "background" property.`,
          });
        }
        break;
      case CardType.FAVOR:
        if (!value.favor) {
          errors.push({
            type: "missingProperty",
            field: "favor",
            message: `Favor cards must include a "favor" property.`,
          });
        }
        break;
      case CardType.CHALLENGE:
        if (!value.challenge) {
          errors.push({
            type: "missingProperty",
            field: "challenge",
            message: `Challenge cards must include a "challenge" property.`,
          });
        }
        break;
    }
    return value;
  },
};

const validator = new Validator({
  useNewCustomCheckerFunction: true,
}).compile(cardSchema);

export function validateCardData(card: any): ValidationError[] {
  const errors = validator(card);
  return errors === true ? [] : (errors as ValidationError[]);
}
