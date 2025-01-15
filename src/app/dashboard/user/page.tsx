import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { UserListView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `사용자 관리 | ${CONFIG.appName}` };

export default function UserListPage() {
  return <UserListView />;
}
