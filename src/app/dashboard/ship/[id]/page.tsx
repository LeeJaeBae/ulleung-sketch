/**
 * @file src/app/dashboard/ship/[id]/page.tsx
 * @description 개별 선박의 상세 정보를 표시하는 페이지
 * @purpose
 * - 선박의 모든 상세 정보 표시
 * - 선박 정보 수정 페이지로의 이동 기능
 * - 선박 상태 관리 및 모니터링
 * @dynamic-route
 * - [id]: 선박의 고유 식별자
 * @related-components
 * - ShipDetailsView: 선박 상세 정보 표시 컴포넌트
 */

import type { Metadata } from 'next';

import { CONFIG } from 'src/global-config';

import { ShipDetailsView } from 'src/sections/ship/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `선박 상세 | Dashboard - ${CONFIG.appName}` };

/**
 * @component Page
 * @description 선박 상세 정보 페이지의 메인 컴포넌트
 * @param {Object} props - 페이지 props
 * @param {Object} props.params - URL 파라미터
 * @param {string} props.params.id - 선박 ID
 * @returns {JSX.Element} ShipDetailsView 컴포넌트를 렌더링
 */
export default function Page({ params }: { params: { id: string } }) {
  return <ShipDetailsView />;
}
