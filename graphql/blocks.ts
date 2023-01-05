import { LINK_FIELDS } from "./link";

export const CALL_TO_ACTION = `
...on CalltoAction {
  blockType
  ctaBackgroundColor
  richText
  links {
    link ${LINK_FIELDS()}
  }
}
`

export const CONTENT = `
...on Content {
  blockType
  contentBackgroundColor
  layout
  columnOne {
    richText
    enableLink
    link ${LINK_FIELDS()}
  }
  columnTwo {
    richText
    enableLink
    link ${LINK_FIELDS()}
  }
  columnThree {
    richText
    enableLink
    link ${LINK_FIELDS()}
  }
}
`

export const MEDIA_BLOCK = `
...on MediaBlock {
  blockType
  mediaBlockBackgroundColor
  position
  media {
    mimeType
    filename
    width
    height
    alt
  }
  caption
}
`
