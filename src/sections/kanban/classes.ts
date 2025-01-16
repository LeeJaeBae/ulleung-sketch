/**
 * @file src/sections/kanban/classes.ts
 * @description 칸반 보드의 스타일링을 위한 클래스 정의
 * @purpose
 * - 칸반 보드의 각 요소(아이템, 컬럼 등)에 대한 스타일 클래스 관리
 * - 드래그 앤 드롭 상태에 따른 스타일 상태 관리
 */

import { createClasses } from 'src/theme/create-classes';

// ----------------------------------------------------------------------

/**
 * @constant kanbanClasses
 * @description 칸반 보드의 스타일 클래스 정의
 * @property {Function} item - 칸반 아이템의 기본 클래스
 * @property {Function} column - 칸반 컬럼의 기본 클래스
 * @property {Function} itemWrap - 칸반 아이템 래퍼의 클래스
 * @property {Function} columnList - 칸반 컬럼 리스트의 클래스
 * @property {Object} state - 칸반 요소들의 상태 클래스
 */
export const kanbanClasses = {
  item: createClasses('kanban__item'),
  column: createClasses('kanban__column'),
  itemWrap: createClasses('kanban__item__wrap'),
  columnList: createClasses('kanban__column_list'),
  state: {
    fadeIn: '--fade-in',           // 페이드 인 애니메이션 상태
    sorting: '--sorting',          // 정렬 중인 상태
    dragging: '--dragging',        // 드래그 중인 상태
    disabled: '--disabled',        // 비활성화 상태
    dragOverlay: '--drag-overlay', // 드래그 오버레이 표시 상태
    overContainer: '--over-container', // 컨테이너 위에 있는 상태
  },
};
