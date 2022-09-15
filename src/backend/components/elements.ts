import { slugify, isNumeric } from "../utils";

const getElements = () => {
  const localTextStyles = figma.getLocalTextStyles();

  const allowedTags = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "link",
    "heading",
    "caption",
    "button",
  ];

  const elements = localTextStyles.reduce(
    (result: WP_Elements, localTextStyle) => {
      const tag = slugify(localTextStyle.name);

      if (allowedTags.indexOf(tag) < 0) {
        return result;
      }

      result[tag] = {
        typography: {
          fontSize: localTextStyle.fontSize,
        },
      };

      if (localTextStyle.lineHeight.unit === "PIXELS") {
        result[tag].typography.lineHeight = localTextStyle.lineHeight.value;
      }

      if (localTextStyle.letterSpacing.unit === "PIXELS") {
        result[tag].typography.letterSpacing =
          localTextStyle.letterSpacing.value;
      }

      if (localTextStyle.textDecoration === "UNDERLINE") {
        result[tag].typography.textDecoration = "underline";
      }

      if (isNumeric(localTextStyle.fontName.style)) {
        result[tag].typography.fontWeight = +localTextStyle.fontName.style;
      }

      return result;
    },
    {}
  );

  return elements;
};

export default getElements;
