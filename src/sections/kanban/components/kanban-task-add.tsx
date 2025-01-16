/**
 * @file src/sections/kanban/components/kanban-task-add.tsx
 * @description 칸반 보드에 새로운 태스크를 추가하는 컴포넌트
 * @purpose
 * - 새로운 태스크 생성을 위한 입력 폼 제공
 * - 태스크 제목, 설명 등의 기본 정보 입력
 * - 태스크 생성 취소 기능
 * @related-components
 * - KanbanColumn: 태스크가 추가될 컬럼
 */

import type { IKanbanTask } from 'src/types/kanban';

import { uuidv4 } from 'minimal-shared/utils';
import { useMemo, useState, useCallback } from 'react';

import Paper from '@mui/material/Paper';
import FormHelperText from '@mui/material/FormHelperText';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';

import { fAdd, today } from 'src/utils/format-time';

import { _mock } from 'src/_mock';

// ----------------------------------------------------------------------

type Props = {
  status: string;
  openAddTask: boolean;
  onCloseAddTask: () => void;
  onAddTask: (task: IKanbanTask) => void;
};

/**
 * @component KanbanTaskAdd
 * @description 새로운 태스크 추가를 위한 입력 폼을 렌더링하는 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.status - 태스크가 추가될 컬럼의 상태
 * @param {boolean} props.openAddTask - 태스크 추가 폼 표시 여부
 * @param {Function} props.onAddTask - 태스크 추가 핸들러
 * @param {Function} props.onCloseAddTask - 태스크 추가 폼 닫기 핸들러
 */

export function KanbanTaskAdd({ status, openAddTask, onAddTask, onCloseAddTask }: Props) {
  const [taskName, setTaskName] = useState('');

  const defaultTask: IKanbanTask = useMemo(
    () => ({
      id: uuidv4(),
      status,
      name: taskName.trim() ? taskName : 'Untitled',
      priority: 'medium',
      attachments: [],
      labels: [],
      comments: [],
      assignee: [],
      due: [today(), fAdd({ days: 1 })],
      reporter: { id: _mock.id(16), name: _mock.fullName(16), avatarUrl: _mock.image.avatar(16) },
    }),
    [status, taskName]
  );

  const handleChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  }, []);

  const handleKeyUpAddTask = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        onAddTask(defaultTask);
        setTaskName('');
      }
    },
    [defaultTask, onAddTask]
  );

  const handleCancel = useCallback(() => {
    setTaskName('');
    onCloseAddTask();
  }, [onCloseAddTask]);

  if (!openAddTask) {
    return null;
  }

  return (
    <ClickAwayListener onClickAway={handleCancel}>
      <div>
        <Paper
          sx={[
            (theme) => ({
              borderRadius: 1.5,
              bgcolor: 'background.default',
              boxShadow: theme.vars.customShadows.z1,
            }),
          ]}
        >
          <InputBase
            autoFocus
            fullWidth
            placeholder="Untitled"
            value={taskName}
            onChange={handleChangeName}
            onKeyUp={handleKeyUpAddTask}
            sx={{
              px: 2,
              height: 56,
              [`& .${inputBaseClasses.input}`]: { p: 0, typography: 'subtitle2' },
            }}
          />
        </Paper>

        <FormHelperText sx={{ mx: 1 }}>Press Enter to create the task.</FormHelperText>
      </div>
    </ClickAwayListener>
  );
}
