/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const colors = require("@momentum-ui/tokens/dist/colors.json");

const pagination = {
  prefix: "md",
  component: "pagination",
  color: {
    light: colors.gray[50].name,
    dark: colors.gray[60].name,
    current: {
      light: colors.white[100].name,
      dark: colors.white[100].name
    }
  },
  "bg-current": {
    light: colors.blue[50].name,
    dark: colors.blue[60].name
  },

  "bg-hover": {
    light: colors.blue[60].name,
    dark: colors.blue[70].name
  },
  nav: {
    color: {
      light: colors.gray[70].name,
      dark: colors.gray[70].name
    },
    focus: {
      light: colors.blue[60].name,
      dark: colors.blue[70].name
    },
    hover: {
      light: colors.blue[60].name,
      dark: colors.blue[70].name
    },
    disabled: {
      light: colors.gray[30].name,
      dark: colors.gray[30].name
    }
  },
  "dots-color": {
    light: colors.gray[30].name,
    dark: colors.gray[40].name,
    current: {
      light: colors.blue[50].name,
      dark: colors.blue[60].name
    }
  }
};

module.exports = pagination;
