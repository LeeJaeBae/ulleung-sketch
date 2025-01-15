import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { ShipDetailsView } from 'src/sections/ship/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `선박 상세 | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <ShipDetailsView />;
}
