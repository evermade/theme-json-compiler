import getBodyTypography from "./components/bodyTypography";
import getElements from "./components/elements";
import getPalette from "./components/palette";

if (figma.editorType === "figma") {
  figma.showUI(__html__, { height: 500, width: 500, themeColors: true });

  figma.ui.onmessage = (msg) => {
    if (msg === "close") {
      return figma.closePlugin();
    }

    const themejson = {
      version: 2,
      styles: {
        typography: getBodyTypography(),
        elements: getElements(),
      },
      settings: {
        color: {
          palette: getPalette(),
        },
      },
    };

    figma.ui.postMessage(themejson);
  };
}
