import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { AccountSocialsView } from 'src/sections/account/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `Account socials settings | Dashboard - ${CONFIG.appName}`,
};

export default function Page() {
  return <AccountSocialsView />;
}
