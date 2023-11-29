import type { RichTextField } from 'payload/dist/fields/config/types';
import type { AdapterArguments, RichTextElement, RichTextLeaf } from '@payloadcms/richtext-slate';
import deepMerge from '../../utilities/deepMerge';
import elements from './elements';
import leaves from './leaves';
import { slateEditor } from '@payloadcms/richtext-slate';

type RichText = (
  overrides?: AdapterArguments,
  additions?: {
    elements?: RichTextElement[]
    leaves?: RichTextLeaf[]
  }
) => RichTextField

const richText: RichText = (
  overrides,
  additions = {
    elements: [],
    leaves: [],
  },
) => ({
  name: 'richText',
  type: 'richText',
  required: true,
  editor: slateEditor(deepMerge({
    admin: {
      elements: [
        ...elements,
        ...additions.elements || [],
      ],
      leaves: [
        ...leaves,
        ...additions.leaves || [],
      ],
    },
  }, overrides || {}))
});

export default richText;
