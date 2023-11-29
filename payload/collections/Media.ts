import type { CollectionConfig } from 'payload/types';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: '/tmp',
    formatOptions: {
      format: 'jpeg',
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ]
}