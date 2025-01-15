import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { ShipListView } from 'src/sections/ship/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `선박 목록 | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <ShipListView />;
}
