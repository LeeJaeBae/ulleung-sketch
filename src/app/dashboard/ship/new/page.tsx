/**
 * @file src/app/dashboard/ship/new/page.tsx
 * @description 새로운 선박을 등록하는 페이지
 * @purpose
 * - 새로운 선박 정보 입력 폼 제공
 * - 선박 정보 유효성 검사
 * - 선박 등록 프로세스 관리
 * @related-components
 * - ShipCreateView: 선박 등록 폼 컴포넌트
 */

import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { ShipCreateView } from 'src/sections/ship/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `새 선박 등록 | Dashboard - ${CONFIG.appName}` };

/**
 * @component Page
 * @description 새 선박 등록 페이지의 메인 컴포넌트
 * @returns {JSX.Element} ShipCreateView 컴포넌트를 렌더링
 */
export default function Page() {
  return <ShipCreateView />;
}
