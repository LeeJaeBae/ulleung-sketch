/**
 * @file src/sections/kanban/column/kanban-column.tsx
 * @description 칸반 보드의 개별 컬럼을 표시하는 컴포넌트
 * @purpose
 * - 칸반 보드의 각 상태(컬럼)를 표시
 * - 컬럼 내 카드 목록 관리
 * - 드래그 앤 드롭 기능 지원
 * @related-components
 * - KanbanColumnToolbar: 컬럼 상단의 툴바
 * - ColumnBase: 컬럼의 기본 구조
 */

import type { Theme, SxProps } from '@mui/material/styles';
import type { AnimateLayoutChanges } from '@dnd-kit/sortable';
import type { IKanbanTask, IKanbanColumn } from 'src/types/kanban';

import { useCallback } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { useBoolean } from 'minimal-shared/hooks';
import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';

import { createTask, clearColumn, deleteColumn, updateColumn } from 'src/actions/kanban';

import { toast } from 'src/components/snackbar';

import ColumnBase from './column-base';
import { KanbanTaskAdd } from '../components/kanban-task-add';
import { KanbanColumnToolBar } from './kanban-column-toolbar';

// ----------------------------------------------------------------------

type ColumnProps = {
  disabled?: boolean;
  sx?: SxProps<Theme>;
  tasks: IKanbanTask[];
  column: IKanbanColumn;
  children: React.ReactNode;
};

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

/**
 * @component KanbanColumn
 * @description 칸반 보드의 개별 컬럼을 렌더링하는 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.name - 컬럼 이름
 * @param {string} props.color - 컬럼 색상
 * @param {Array} props.cardIds - 컬럼에 속한 카드 ID 배열
 * @param {Function} props.onUpdateColumn - 컬럼 업데이트 핸들러
 * @param {Function} props.onClearColumn - 컬럼 초기화 핸들러
 * @param {Function} props.onDeleteColumn - 컬럼 삭제 핸들러
 */

export function KanbanColumn({ children, column, tasks, disabled, sx }: ColumnProps) {
  const openAddTask = useBoolean();

  const { attributes, isDragging, listeners, setNodeRef, transition, active, over, transform } =
    useSortable({
      id: column.id,
      data: { type: 'container', children: tasks },
      animateLayoutChanges,
    });

  const tasksIds = tasks.map((task) => task.id);

  const isOverContainer = over
    ? (column.id === over.id && active?.data.current?.type !== 'container') ||
      tasksIds.includes(over.id)
    : false;

  const handleUpdateColumn = useCallback(
    async (columnName: string) => {
      try {
        if (column.name !== columnName) {
          updateColumn(column.id, columnName);

          toast.success('Update success!', { position: 'top-center' });
        }
      } catch (error) {
        console.error(error);
      }
    },
    [column.id, column.name]
  );

  const handleClearColumn = useCallback(async () => {
    try {
      clearColumn(column.id);
    } catch (error) {
      console.error(error);
    }
  }, [column.id]);

  const handleDeleteColumn = useCallback(async () => {
    try {
      deleteColumn(column.id);

      toast.success('Delete success!', { position: 'top-center' });
    } catch (error) {
      console.error(error);
    }
  }, [column.id]);

  const handleAddTask = useCallback(
    async (taskData: IKanbanTask) => {
      try {
        createTask(column.id, taskData);

        openAddTask.onFalse();
      } catch (error) {
        console.error(error);
      }
    },
    [column.id, openAddTask]
  );

  return (
    <ColumnBase
      ref={disabled ? undefined : setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      sx={sx}
      stateProps={{
        dragging: isDragging,
        overContainer: isOverContainer,
        handleProps: { ...attributes, ...listeners },
      }}
      slots={{
        header: (
          <KanbanColumnToolBar
            handleProps={{ ...attributes, ...listeners }}
            totalTasks={tasks.length}
            columnName={column.name}
            onUpdateColumn={handleUpdateColumn}
            onClearColumn={handleClearColumn}
            onDeleteColumn={handleDeleteColumn}
            onToggleAddTask={openAddTask.onToggle}
          />
        ),
        main: children,
        action: (
          <KanbanTaskAdd
            status={column.name}
            openAddTask={openAddTask.value}
            onAddTask={handleAddTask}
            onCloseAddTask={openAddTask.onFalse}
          />
        ),
      }}
    />
  );
}
