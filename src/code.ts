const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

const removeHexFromName = (name: string) => {
  const indexOfHash = name.indexOf("#");

  if (indexOfHash < 0) {
    return name;
  }

  return name.substring(0, indexOfHash).trim();
};

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

if (figma.editorType === "figma") {
  figma.showUI(__html__, { height: 500, width: 500 });

  figma.ui.onmessage = (msg) => {
    if (msg === "palette") {
      const localPaintStyles = figma.getLocalPaintStyles();

      const palette = localPaintStyles.map((localPaintStyle) => {
        const name = removeHexFromName(localPaintStyle.name);
        const solidPaint = localPaintStyle.paints[0] as SolidPaint;

        return {
          name,
          slug: slugify(name),
          color: rgb2hex(solidPaint.color),
        };
      });

      figma.ui.postMessage(palette);
    }

    if (msg === "font-sizes") {
      const localTextStyles = figma.getLocalTextStyles();

      const fontSizes = localTextStyles.map((localTextStyle) => {
        const name = localTextStyle.name;

        return {
          name,
          slug: slugify(name),
          size: localTextStyle.fontSize,
        };
      });

      figma.ui.postMessage(fontSizes);
    }

    if (msg === "close") {
      figma.closePlugin();
    }
  };
}
