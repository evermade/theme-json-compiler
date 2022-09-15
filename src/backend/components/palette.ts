import { slugify } from "../utils";

const toHex = (colorAmount: number) => {
  const hex = Math.round(255 * colorAmount).toString(16);

  if (hex.length === 1) {
    return `0${hex}`;
  }

  return hex;
};

const rgb2hex = (color: RGB) => {
  const hexValues = [color["r"], color["g"], color["b"]].map(toHex);

  return ["#", ...hexValues].join("");
};

const rgb2rgba = (color: RGB, opacity: number) => {
  const rgbaValues = [color["r"], color["g"], color["b"]].map((colorAmount) => {
    return Math.round(255 * colorAmount);
  });

  rgbaValues.push(Math.round(opacity * 100) / 100);

  return `rgba(${rgbaValues.join(",")})`;
};

const getPalette = () => {
  const localPaintStyles = figma.getLocalPaintStyles();

  const palette = localPaintStyles.map((localPaintStyle) => {
    const name = localPaintStyle.name;
    const solidPaint = localPaintStyle.paints[0] as SolidPaint;
    const opacity = solidPaint.opacity;

    return {
      name,
      slug: slugify(name),
      color:
        opacity && opacity < 1
          ? rgb2rgba(solidPaint.color, opacity)
          : rgb2hex(solidPaint.color),
    } as WP_Color;
  });

  return palette;
};

export default getPalette;
