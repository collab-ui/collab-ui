/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const colors = require("@momentum-ui/tokens/dist/colors.json");

const breadcrumbs = {
  prefix: "lm",
  component: "breadcrumbs",
  color: {
    light: colors.blue[50].name,
    dark: colors.blue[40].name,
    current: {
      light: colors.gray[90].name,
      dark: colors.gray[50].name
    },
    slash: {
      light: colors.gray[50].name,
      dark: colors.gray[40].name
    }
  }
};

module.exports = breadcrumbs;
