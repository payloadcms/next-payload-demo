import { buildConfig } from 'payload/config';
import path from 'path';
import seo from '@payloadcms/plugin-seo';
import { Users } from './collections/Users';
import { Pages } from './collections/Pages';
import { MainMenu } from './globals/MainMenu';
import { Media } from './collections/Media';

export default buildConfig({
  collections: [
    Media,
    Pages,
    Users,
  ],
  globals: [
    MainMenu,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    seo({
      collections: [
        'pages',
      ],
      uploadsCollection: 'media',
    })
  ],
});
