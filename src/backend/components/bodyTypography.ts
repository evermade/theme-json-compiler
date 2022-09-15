import { isNumeric } from "../utils";

const getBodyTypography = () => {
  const localTextStyles = figma.getLocalTextStyles();

  const bodyTextStyle = localTextStyles.find((localTextStyle) => {
    return localTextStyle.name.toLowerCase() === "body";
  });

  if (!bodyTextStyle) {
    return undefined;
  }

  const result = {
    fontSize: bodyTextStyle.fontSize,
  } as WP_Typography;

  if (bodyTextStyle.lineHeight.unit === "PIXELS") {
    result.lineHeight = bodyTextStyle.lineHeight.value;
  }

  if (isNumeric(bodyTextStyle.fontName.style)) {
    result.fontWeight = +bodyTextStyle.fontName.style;
  }

  return result;
};

export default getBodyTypography;