import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { ShipEditView } from 'src/sections/ship/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `선박 수정 | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <ShipEditView />;
}
