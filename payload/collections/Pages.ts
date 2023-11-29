import type { CollectionConfig } from 'payload/types';
import { CallToAction } from '../blocks/CallToAction';
import { Content } from '../blocks/Content';
import { MediaBlock } from '../blocks/Media';
import { hero } from '../fields/hero';
import { slugField } from '../fields/slug';
import { regenerateStaticPage } from '../utilities/regenerateStaticPage';
import { UIField } from '../components/UITest';

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    preview: (doc, { locale }) => {
      if (doc?.slug) {
        return `/${doc.slug}${locale ? `?locale=${locale}` : ""}`;
      }

      return '';
    },
  },
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [
      regenerateStaticPage
    ]
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
    {
      name: 'uiTest',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: UIField,
        }
      }
    }
  ]
}