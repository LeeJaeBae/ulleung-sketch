import type { InputBaseProps } from '@mui/material/InputBase';

import InputBase, { inputBaseClasses } from '@mui/material/InputBase';

/**
 * @file src/sections/kanban/components/kanban-input-name.tsx
 * @description 칸반 보드의 이름 입력을 위한 커스텀 입력 필드 컴포넌트
 * @purpose
 * - 칸반 보드의 컬럼/태스크 이름 입력
 * - 입력 필드의 스타일 및 동작 커스터마이징
 * - 일관된 입력 UI/UX 제공
 * @related-components
 * - KanbanColumn: 컬럼 이름 입력에 사용
 * - KanbanTask: 태스크 이름 입력에 사용
 */

// ----------------------------------------------------------------------

/**
 * @component KanbanInputName
 * @description 칸반 보드의 이름 입력을 위한 커스텀 입력 필드를 렌더링하는 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.placeholder - 입력 필드 플레이스홀더
 * @param {string} props.value - 입력 필드 값
 * @param {Function} props.onChange - 값 변경 핸들러
 * @param {Object} props.sx - MUI 스타일 props
 */

export function KanbanInputName({ sx, ...other }: InputBaseProps) {
  return (
    <InputBase
      sx={[
        (theme) => ({
          [`&.${inputBaseClasses.root}`]: {
            py: 0.75,
            borderRadius: 1,
            typography: 'h6',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'transparent',
            transition: theme.transitions.create(['padding-left', 'border-color']),
            [`&.${inputBaseClasses.focused}`]: { pl: 0.75, borderColor: 'text.primary' },
          },
          [`& .${inputBaseClasses.input}`]: { typography: 'h6' },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}
