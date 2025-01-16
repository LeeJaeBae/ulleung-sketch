/**
 * @file src/sections/kanban/view/kanban-view.tsx
 * @description 칸반 보드의 메인 뷰 컴포넌트
 * @purpose
 * - 전체 칸반 보드 UI 구성 및 관리
 * - 드래그 앤 드롭 기능의 핵심 로직 구현
 * - 컬럼과 태스크의 상태 관리
 * @related-components
 * - KanbanColumn: 칸반 컬럼 컴포넌트
 * - KanbanTaskItem: 칸반 태스크 아이템
 * - KanbanColumnAdd: 새 컬럼 추가
 */

'use client';

import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
  CollisionDetection,
} from '@dnd-kit/core';

import { useRef, useState, useEffect, useCallback } from 'react';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSensor,
  DndContext,
  useSensors,
  MouseSensor,
  TouchSensor,
  closestCenter,
  pointerWithin,
  closestCorners,
  KeyboardSensor,
  getFirstCollision,
  MeasuringStrategy,
} from '@dnd-kit/core';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { DashboardContent } from 'src/layouts/dashboard';
import { moveTask, moveColumn, useGetBoard } from 'src/actions/kanban';

import { EmptyContent } from 'src/components/empty-content';

import { kanbanClasses } from '../classes';
import { coordinateGetter } from '../utils';
import { KanbanColumn } from '../column/kanban-column';
import { KanbanTaskItem } from '../item/kanban-task-item';
import { KanbanColumnAdd } from '../column/kanban-column-add';
import { KanbanColumnSkeleton } from '../components/kanban-skeleton';
import { KanbanDragOverlay } from '../components/kanban-drag-overlay';

// ----------------------------------------------------------------------

/**
 * @constant PLACEHOLDER_ID
 * @description 새 컬럼 추가를 위한 플레이스홀더 ID
 */
const PLACEHOLDER_ID = 'placeholder';

/**
 * @constant cssVars
 * @description 칸반 보드의 기본 스타일 변수
 */
const cssVars = {
  '--item-gap': '16px',
  '--item-radius': '12px',
  '--column-gap': '24px',
  '--column-width': '336px',
  '--column-radius': '16px',
  '--column-padding': '20px 16px 16px 16px',
};

// ----------------------------------------------------------------------

/**
 * @component KanbanView
 * @description 칸반 보드의 메인 뷰를 렌더링하는 컴포넌트
 * @features
 * - 드래그 앤 드롭을 통한 태스크/컬럼 재정렬
 * - 컬럼 고정 모드 지원
 * - 반응형 레이아웃
 */
export function KanbanView() {
  const { board, boardLoading, boardEmpty } = useGetBoard();

  const recentlyMovedToNewContainer = useRef(false);
  const lastOverId = useRef<UniqueIdentifier | null>(null);

  const [columnFixed, setColumnFixed] = useState(true);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const columnIds = board.columns.map((column) => column.id);

  const isSortingContainer = activeId != null ? columnIds.includes(activeId) : false;

  /**
   * @description 드래그 앤 드롭을 위한 센서 설정
   * - 마우스: 3px 이동 시 활성화
   * - 터치: 250ms 지연, 5px 허용 오차
   * - 키보드: 커스텀 좌표 계산기 사용
   */
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 3 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
    useSensor(KeyboardSensor, { coordinateGetter })
  );

  /**
   * @function collisionDetectionStrategy
   * @description 드래그 앤 드롭 시 충돌 감지 전략
   * @param {Object} args - 충돌 감지에 필요한 인자들
   * @returns {Array} 충돌이 감지된 드롭 영역 목록
   */
  const collisionDetectionStrategy: CollisionDetection = useCallback(
    (args) => {
      if (activeId && activeId in board.tasks) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            (column) => column.id in board.tasks
          ),
        });
      }

      // Start by finding any intersecting droppable
      const pointerIntersections = pointerWithin(args);
      const cornersCollisions = closestCorners(args);
      const centerCollisions = closestCenter(args);

      // OLD
      // const intersections = pointerIntersections.length > 0 ? pointerIntersections : rectIntersection(args);

      // NEW
      // https://github.com/clauderic/dnd-kit/issues/900#issuecomment-2068314434
      const intersections =
        !!pointerIntersections.length && !!centerCollisions.length && !!cornersCollisions.length
          ? pointerIntersections
          : null;

      let overId = getFirstCollision(intersections, 'id');

      if (overId != null) {
        if (overId in board.tasks) {
          const columnItems = board.tasks[overId].map((task) => task.id);

          // If a column is matched and it contains items (columns 'A', 'B', 'C')
          if (columnItems.length > 0) {
            // Return the closest droppable within that column
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                (column) => column.id !== overId && columnItems.includes(column.id)
              ),
            })[0]?.id;
          }
        }

        lastOverId.current = overId;

        return [{ id: overId }];
      }

      // When a draggable item moves to a new column, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new column, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeId, board?.tasks]
  );

  /**
   * @function findColumn
   * @description 주어진 ID에 해당하는 컬럼을 찾는 함수
   * @param {UniqueIdentifier} id - 찾을 컬럼/태스크 ID
   * @returns {string|undefined} 컬럼 ID
   */
  const findColumn = (id: UniqueIdentifier) => {
    if (id in board.tasks) {
      return id;
    }

    return Object.keys(board.tasks).find((key) =>
      board.tasks[key].map((task) => task.id).includes(id)
    );
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, []);

  /**
   * @function onDragStart
   * @description 드래그 시작 시 호출되는 핸들러
   */
  const onDragStart = ({ active }: DragStartEvent) => {
    setActiveId(active.id);
  };

  /**
   * @function onDragOver
   * @description 드래그 중 다른 요소 위에 있을 때 호출되는 핸들러
   */
  const onDragOver = ({ active, over }: DragOverEvent) => {
    const overId = over?.id;

    if (overId == null || active.id in board.tasks) {
      return;
    }

    const overColumn = findColumn(overId);
    const activeColumn = findColumn(active.id);

    if (!overColumn || !activeColumn) {
      return;
    }

    if (activeColumn !== overColumn) {
      const activeItems = board.tasks[activeColumn].map((task) => task.id);
      const overItems = board.tasks[overColumn].map((task) => task.id);
      const overIndex = overItems.indexOf(overId);
      const activeIndex = activeItems.indexOf(active.id);

      let newIndex: number;

      if (overId in board.tasks) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      recentlyMovedToNewContainer.current = true;

      const updateTasks = {
        ...board.tasks,
        [activeColumn]: board.tasks[activeColumn].filter((task) => task.id !== active.id),
        [overColumn]: [
          ...board.tasks[overColumn].slice(0, newIndex),
          board.tasks[activeColumn][activeIndex],
          ...board.tasks[overColumn].slice(newIndex, board.tasks[overColumn].length),
        ],
      };

      moveTask(updateTasks);
    }
  };

  /**
   * @function onDragEnd
   * @description 드래그 종료 시 호출되는 핸들러
   */
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id in board.tasks && over?.id) {
      const activeIndex = columnIds.indexOf(active.id);
      const overIndex = columnIds.indexOf(over.id);
      const updateColumns = arrayMove(board.columns, activeIndex, overIndex);

      moveColumn(updateColumns);
    }

    const activeColumn = findColumn(active.id);

    if (!activeColumn) {
      setActiveId(null);
      return;
    }

    const overId = over?.id;

    if (overId == null) {
      setActiveId(null);
      return;
    }

    const overColumn = findColumn(overId);

    if (overColumn) {
      const activeContainerTaskIds = board.tasks[activeColumn].map((task) => task.id);
      const overContainerTaskIds = board.tasks[overColumn].map((task) => task.id);

      const activeIndex = activeContainerTaskIds.indexOf(active.id);
      const overIndex = overContainerTaskIds.indexOf(overId);

      if (activeIndex !== overIndex) {
        const updateTasks = {
          ...board.tasks,
          [overColumn]: arrayMove(board.tasks[overColumn], activeIndex, overIndex),
        };

        moveTask(updateTasks);
      }
    }

    setActiveId(null);
  };

  /**
   * @function renderLoading
   * @description 로딩 상태 UI를 렌더링
   */
  const renderLoading = () => (
    <Box sx={{ gap: 'var(--column-gap)', display: 'flex', alignItems: 'flex-start' }}>
      <KanbanColumnSkeleton />
    </Box>
  );

  /**
   * @function renderEmpty
   * @description 빈 상태 UI를 렌더링
   */
  const renderEmpty = () => <EmptyContent filled sx={{ py: 10, maxHeight: { md: 480 } }} />;

  /**
   * @function renderList
   * @description 칸반 보드의 메인 컨텐츠를 렌더링
   */
  const renderList = () => (
    <DndContext
      id="dnd-kanban"
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <Stack sx={{ flex: '1 1 auto', overflowX: 'auto' }}>
        <Stack
          sx={{
            pb: 3,
            display: 'unset',
            ...(columnFixed && { minHeight: 0, display: 'flex', flex: '1 1 auto' }),
          }}
        >
          <Box
            sx={[
              (theme) => ({
                display: 'flex',
                gap: 'var(--column-gap)',
                ...(columnFixed && {
                  minHeight: 0,
                  flex: '1 1 auto',
                  [`& .${kanbanClasses.columnList}`]: {
                    ...theme.mixins.hideScrollY,
                    flex: '1 1 auto',
                  },
                }),
              }),
            ]}
          >
            <SortableContext
              items={[...columnIds, PLACEHOLDER_ID]}
              strategy={horizontalListSortingStrategy}
            >
              {board?.columns.map((column) => (
                <KanbanColumn key={column.id} column={column} tasks={board.tasks[column.id]}>
                  <SortableContext
                    items={board.tasks[column.id]}
                    strategy={verticalListSortingStrategy}
                  >
                    {board.tasks[column.id].map((task) => (
                      <KanbanTaskItem
                        key={task.id}
                        task={task}
                        columnId={column.id}
                        disabled={isSortingContainer}
                      />
                    ))}
                  </SortableContext>
                </KanbanColumn>
              ))}

              <KanbanColumnAdd id={PLACEHOLDER_ID} />
            </SortableContext>
          </Box>
        </Stack>
      </Stack>

      <KanbanDragOverlay
        columns={board?.columns}
        tasks={board?.tasks}
        activeId={activeId}
        sx={cssVars}
      />
    </DndContext>
  );

  return (
    <DashboardContent
      maxWidth={false}
      sx={{
        ...cssVars,
        pb: 0,
        pl: { sm: 3 },
        pr: { sm: 0 },
        flex: '1 1 0',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          pr: { sm: 3 },
          mb: { xs: 3, md: 5 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4">Kanban</Typography>

        <FormControlLabel
          label="Fixed column"
          labelPlacement="start"
          control={
            <Switch
              checked={columnFixed}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setColumnFixed(event.target.checked);
              }}
              inputProps={{ id: 'fixed-column-switch' }}
            />
          }
        />
      </Box>

      {boardLoading ? renderLoading() : <>{boardEmpty ? renderEmpty() : renderList()}</>}
    </DashboardContent>
  );
}
