/**
 * @file src/sections/kanban/components/kanban-drag-overlay.tsx
 * @description 칸반 보드의 드래그 앤 드롭 시 표시되는 오버레이 컴포넌트
 * @purpose
 * - 드래그 중인 요소의 시각적 피드백 제공
 * - 드래그 중인 아이템/컬럼의 스타일 관리
 * - 드래그 앤 드롭 UX 향상
 * @related-components
 * - KanbanColumn: 드래그 가능한 컬럼
 * - KanbanTask: 드래그 가능한 태스크
 */

import type { Theme, SxProps } from '@mui/material/styles';
import type { DropAnimation, UniqueIdentifier } from '@dnd-kit/core';
import type { IKanban, IKanbanTask, IKanbanColumn } from 'src/types/kanban';

import { useId } from 'react';
import { DragOverlay as DndDragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';

import Portal from '@mui/material/Portal';

import ItemBase from '../item/item-base';
import ColumnBase from '../column/column-base';
import { KanbanColumnToolBar } from '../column/kanban-column-toolbar';

// ----------------------------------------------------------------------

type KanbanDragOverlayProps = Pick<IKanban, 'tasks' | 'columns'> & {
  sx?: SxProps<Theme>;
  activeId: UniqueIdentifier | null;
};

const dropAnimation: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
};

/**
 * @component KanbanDragOverlay
 * @description 드래그 중인 요소의 오버레이를 렌더링하는 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.draggedItem - 현재 드래그 중인 아이템 정보
 * @param {string} props.dragType - 드래그 중인 요소의 타입 (컬럼/태스크)
 * @param {Object} props.draggingStyle - 드래그 중 적용할 스타일
 */

export function KanbanDragOverlay({ columns, tasks, activeId, sx }: KanbanDragOverlayProps) {
  const key = useId();

  const columnIds = columns.map((column) => column.id);
  const activeColumn = columns.find((column) => column.id === activeId) as IKanbanColumn;

  const allTasks = Object.values(tasks).flat();
  const activeTask = allTasks.find((task) => task.id === activeId) as IKanbanTask;

  return (
    <Portal>
      <DndDragOverlay adjustScale={false} dropAnimation={dropAnimation}>
        {activeId != null ? (
          columnIds.includes(activeId) ? (
            <ColumnOverlay key={key} column={activeColumn} tasks={tasks[activeId]} sx={sx} />
          ) : (
            <TaskItemOverlay key={key} task={activeTask} sx={sx} />
          )
        ) : null}
      </DndDragOverlay>
    </Portal>
  );
}

// ----------------------------------------------------------------------

type ColumnOverlayProps = {
  column: IKanbanColumn;
  tasks: IKanbanTask[];
  sx?: SxProps<Theme>;
};

function ColumnOverlay({ column, tasks, sx }: ColumnOverlayProps) {
  return (
    <ColumnBase
      slots={{
        header: <KanbanColumnToolBar columnName={column.name} totalTasks={tasks.length} />,
        main: tasks.map((task) => <ItemBase key={task.id} task={task} />),
      }}
      stateProps={{ dragOverlay: true }}
      sx={sx}
    />
  );
}

// ----------------------------------------------------------------------

type TaskItemOverlayProps = {
  task: IKanbanTask;
  sx?: SxProps<Theme>;
};

function TaskItemOverlay({ task, sx }: TaskItemOverlayProps) {
  return <ItemBase task={task} sx={sx} stateProps={{ dragOverlay: true }} />;
}
