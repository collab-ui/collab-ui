import * as webpack from "webpack";
import { commonDev } from '../webpack.config';

/**
 * merge two arrays into one and remove the duplicates
 *
 * @param merger
 * @param mergee
 * @returns {Array<any>} merged unique array
 */
const mergeUnique = (merger: Array<any>, mergee?: Array<any>) =>
  mergee ?
    merger.concat(mergee.filter((item: any) => merger.indexOf(item) === -1)) :
    merger;

module.exports = {
  stories: [
    "../src/components/**/*.stories.ts",
    "../src/components/**/*.stories.mdx",
    "../src/internal-components/color-table/ColorTable.stories.ts",
    "../src/internal-components/color-table/*.stories.mdx"
  ],

  addons: [
    "@storybook/addon-knobs/register",
    "@storybook/addon-a11y/register",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "@storybook/addon-actions",
    "@storybook/addon-viewport"
  ],

  webpackFinal: async (storybookConfig: webpack.Configuration, { configType }: { configType : "DEVELOPMENT" | "PRODUCTION" }) => {

    console.log("Storybook build mode: ", configType);

    // RESOLVE
    {
      storybookConfig.resolve = storybookConfig.resolve || {};

      // EXTENSIONS
      {
        storybookConfig.resolve.extensions = mergeUnique(storybookConfig.resolve?.extensions || [], commonDev.resolve?.extensions || []);
      }

      // ALIAS
      {
        storybookConfig.resolve.alias = commonDev.resolve?.alias;
      }
    }

    // MODULE
    {
      storybookConfig.module = storybookConfig.module || { rules: [] };

      // RULES
      {
        storybookConfig.module.rules = mergeUnique(storybookConfig.module.rules, commonDev.module?.rules || []);
      }
    }

    // PLUGINS
    {

      // Storybook production has it's own tuned HtmlWebpackPlugin
      const omitPluginNames = (configType === "DEVELOPMENT") ? [] : ["HtmlWebpackPlugin"];

      const plugins = (commonDev.plugins || []).filter(p => omitPluginNames.indexOf(p.constructor.name) === -1);

      storybookConfig.plugins = mergeUnique(storybookConfig.plugins || [], plugins);
    }

    return storybookConfig;
  }
}
