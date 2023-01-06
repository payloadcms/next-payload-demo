import { CollectionConfig } from 'payload/types';
import { publishedOnly } from '../access/publishedOnly';
import { CallToAction } from '../blocks/CallToAction';
import { Content } from '../blocks/Content';
import { MediaBlock } from '../blocks/Media';
import { hero } from '../fields/hero';
import { slugField } from '../fields/slug';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: (doc, { locale }) => {
      if (doc?.slug) {
        return `${process.env.PAYLOAD_PUBLIC_CMS_URL}/${doc.slug}${locale ? `?locale=${locale}` : ''}`;
      }

      return null;
    },
  },
  access: {
    read: publishedOnly,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            hero,
          ]
        },
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              required: true,
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
              ]
            }
          ]
        }
      ]
    },
    slugField(),
  ]
}