import { GlobalConfig } from "payload/types";
import link from "../fields/link";

export const MainMenu: GlobalConfig = {
  slug: 'main-menu',
  graphQL: {
    name: 'MainMenu',
  },
  access: {
    read: ({ req: { user } }) => {
      if (Boolean(user)) return true;
      return false;
    }
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      fields: [
        link({
          appearances: false,
        }),
      ]
    }
  ]
}