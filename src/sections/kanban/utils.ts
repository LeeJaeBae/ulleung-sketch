/**
 * @file src/sections/kanban/utils.ts
 * @description 칸반 보드의 드래그 앤 드롭 기능을 위한 유틸리티 함수
 * @purpose
 * - 키보드 네비게이션을 통한 드래그 앤 드롭 기능 제공
 * - 드래그 앤 드롭 시 충돌 감지 및 위치 계산
 */

/* eslint-disable consistent-return */
/* eslint-disable default-case */
import type { DroppableContainer, KeyboardCoordinateGetter } from '@dnd-kit/core';

import { KeyboardCode, closestCorners, getFirstCollision } from '@dnd-kit/core';

/**
 * @constant directions
 * @description 키보드 네비게이션에서 사용되는 방향키 코드 배열
 */
const directions: string[] = [
  KeyboardCode.Down,
  KeyboardCode.Right,
  KeyboardCode.Up,
  KeyboardCode.Left,
];

/**
 * @function coordinateGetter
 * @description 키보드 이벤트에 따른 드래그 요소의 새로운 좌표를 계산
 * @param {KeyboardEvent} event - 키보드 이벤트
 * @param {Object} context - 드래그 앤 드롭 컨텍스트
 * @param {Object} context.active - 현재 활성화된 드래그 요소
 * @param {Map} context.droppableRects - 드롭 가능한 영역의 위치 정보
 * @param {DroppableContainers} context.droppableContainers - 드롭 가능한 컨테이너 목록
 * @param {DOMRect} context.collisionRect - 충돌 감지를 위한 영역 정보
 * @returns {Object|undefined} 새로운 좌표 또는 undefined
 */
export const coordinateGetter: KeyboardCoordinateGetter = (
  event,
  { context: { active, droppableRects, droppableContainers, collisionRect } }
) => {
  if (directions.includes(event.code)) {
    event.preventDefault();

    if (!active || !collisionRect) {
      return;
    }

    // 드롭 가능한 컨테이너 필터링
    const filteredContainers: DroppableContainer[] = [];

    droppableContainers.getEnabled().forEach((entry) => {
      if (!entry || entry?.disabled) {
        return;
      }

      const rect = droppableRects.get(entry.id);

      if (!rect) {
        return;
      }

      const data = entry.data.current;

      // 컨테이너 타입 체크 및 자식 요소 확인
      if (data) {
        const { type, children } = data;

        if (type === 'container' && children?.length > 0) {
          if (active.data.current?.type !== 'container') {
            return;
          }
        }
      }

      // 방향키에 따른 컨테이너 필터링
      switch (event.code) {
        case KeyboardCode.Down:
          if (collisionRect.top < rect.top) {
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Up:
          if (collisionRect.top > rect.top) {
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Left:
          if (collisionRect.left >= rect.left + rect.width) {
            filteredContainers.push(entry);
          }
          break;
        case KeyboardCode.Right:
          if (collisionRect.left + collisionRect.width <= rect.left) {
            filteredContainers.push(entry);
          }
          break;
      }
    });

    // 가장 가까운 드롭 영역 찾기
    const collisions = closestCorners({
      active,
      collisionRect,
      droppableRects,
      droppableContainers: filteredContainers,
      pointerCoordinates: null,
    });
    const closestId = getFirstCollision(collisions, 'id');

    // 새로운 좌표 계산
    if (closestId != null) {
      const newDroppable = droppableContainers.get(closestId);
      const newNode = newDroppable?.node.current;
      const newRect = newDroppable?.rect.current;

      if (newNode && newRect) {
        // 플레이스홀더인 경우 중앙 정렬
        if (newDroppable.id === 'placeholder') {
          return {
            x: newRect.left + (newRect.width - collisionRect.width) / 2,
            y: newRect.top + (newRect.height - collisionRect.height) / 2,
          };
        }

        // 컨테이너인 경우 패딩 적용
        if (newDroppable.data.current?.type === 'container') {
          return { x: newRect.left + 20, y: newRect.top + 74 };
        }

        // 기본 위치
        return { x: newRect.left, y: newRect.top };
      }
    }
  }

  return undefined;
};
