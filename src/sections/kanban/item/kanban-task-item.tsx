/**
 * @file src/sections/kanban/item/kanban-task-item.tsx
 * @description 칸반 보드의 개별 태스크 아이템을 표시하는 컴포넌트
 * @purpose
 * - 태스크의 요약 정보 표시
 * - 드래그 앤 드롭 기능 지원
 * - 태스크 상세 정보로의 이동 제공
 * @related-components
 * - ItemBase: 태스크 아이템의 기본 구조
 * - KanbanDetails: 태스크 상세 정보
 */

import type { IKanbanTask } from 'src/types/kanban';
import type { UniqueIdentifier } from '@dnd-kit/core';
import type { Theme, SxProps } from '@mui/material/styles';

import { useSortable } from '@dnd-kit/sortable';
import { useBoolean } from 'minimal-shared/hooks';
import { useState, useEffect, useCallback } from 'react';

import { deleteTask, updateTask } from 'src/actions/kanban';

import { toast } from 'src/components/snackbar';

import ItemBase from './item-base';
import { KanbanDetails } from '../details/kanban-details';

// ----------------------------------------------------------------------

type TaskItemProps = {
  disabled?: boolean;
  sx?: SxProps<Theme>;
  task: IKanbanTask;
  columnId: UniqueIdentifier;
};

/**
 * @component KanbanTaskItem
 * @description 개별 태스크 아이템을 렌더링하는 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {Object} props.task - 태스크 정보
 * @param {boolean} props.checked - 태스크 선택 상태
 * @param {Function} props.onSelect - 태스크 선택 핸들러
 * @param {Function} props.onUpdateTask - 태스크 업데이트 핸들러
 */

export function KanbanTaskItem({ task, disabled, columnId, sx }: TaskItemProps) {
  const taskDetailsDialog = useBoolean();

  const { setNodeRef, listeners, isDragging, isSorting, transform, transition } = useSortable({
    id: task?.id,
  });

  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  const handleDeleteTask = useCallback(async () => {
    try {
      deleteTask(columnId, task.id);
      toast.success('Delete success!', { position: 'top-center' });
    } catch (error) {
      console.error(error);
    }
  }, [columnId, task.id]);

  const handleUpdateTask = useCallback(
    async (taskData: IKanbanTask) => {
      try {
        updateTask(columnId, taskData);
      } catch (error) {
        console.error(error);
      }
    },
    [columnId]
  );

  const renderTaskDetailsDialog = () => (
    <KanbanDetails
      task={task}
      open={taskDetailsDialog.value}
      onClose={taskDetailsDialog.onFalse}
      onUpdateTask={handleUpdateTask}
      onDeleteTask={handleDeleteTask}
    />
  );

  return (
    <>
      <ItemBase
        ref={disabled ? undefined : setNodeRef}
        task={task}
        open={taskDetailsDialog.value}
        onClick={taskDetailsDialog.onTrue}
        stateProps={{
          transform,
          listeners,
          transition,
          sorting: isSorting,
          dragging: isDragging,
          fadeIn: mountedWhileDragging,
        }}
        sx={sx}
      />

      {renderTaskDetailsDialog()}
    </>
  );
}

// ----------------------------------------------------------------------

function useMountStatus() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 500);

    return () => clearTimeout(timeout);
  }, []);

  return isMounted;
}
