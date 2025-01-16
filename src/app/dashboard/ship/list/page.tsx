/**
 * @file src/app/dashboard/ship/list/page.tsx
 * @description 선박 목록을 표시하는 대시보드 페이지
 * @purpose
 * - 등록된 모든 선박의 목록을 테이블 형태로 표시
 * - 선박 데이터의 필터링, 정렬, 검색 기능 제공
 * - 새로운 선박 등록 페이지로의 이동 기능 제공
 * @related-components
 * - ShipListView: 선박 목록 표시 컴포넌트
 */

import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { ShipListView } from 'src/sections/ship/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `선박 목록 | Dashboard - ${CONFIG.appName}` };

/**
 * @component Page
 * @description 선박 목록 페이지의 메인 컴포넌트
 * @returns {JSX.Element} ShipListView 컴포넌트를 렌더링
 */
export default function Page() {
  return <ShipListView />;
}
