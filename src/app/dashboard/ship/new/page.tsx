import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { ShipCreateView } from 'src/sections/ship/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `선박 등록 | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <ShipCreateView />;
}
