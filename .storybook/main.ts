import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import * as sass from 'sass';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-onboarding',
    '@storybook/addon-docs',
  ],
  webpackFinal: async (config) => {
    // Add TypeScript loader configuration
    config.module?.rules?.push({
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
      exclude: /node_modules/,
    });

    // Add CSS loader configuration
    config.module?.rules?.push({
      test: /\.css$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
            },
          },
        },
      ],
    });

    // Add SCSS loader configuration
    config.module?.rules?.push({
      test: /\.s[ac]ss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true,
            },
            importLoaders: 2,
          },
        },
        'resolve-url-loader',
        {
          loader: 'sass-loader',
          options: {
            implementation: sass, // Use the imported sass
            sourceMap: true,
            sassOptions: {},
          },
        },
      ],
    });

    // Configure aliases
    if (config?.resolve?.alias) {
      const projectRoot = process.cwd();
      config.resolve.alias = {
        ...config.resolve.alias,
        fonts: path.resolve(projectRoot, 'src/fonts'),
        src: path.resolve(projectRoot, 'src'),
        components: path.resolve(projectRoot, 'src/components'),
      };
    }

    // Ensure TypeScript extensions are resolved
    if (config.resolve) {
      config.resolve.extensions = [
        ...(config.resolve.extensions || []),
        '.ts',
        '.tsx',
      ];
    }

    return config;
  },
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: false,
      },
    },
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  autodocs: 'tag',
};

export default config;