import type { PaperProps } from '@mui/material/Paper';

import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';

// ----------------------------------------------------------------------

type KanbanColumnSkeletonProps = PaperProps & {
  itemCount?: number;
};

/**
 * @component KanbanColumnSkeleton
 * @description 칸반 보드의 컬럼 스켈레톤을 렌더링하는 컴포넌트
 * @param {Object} props - 컴포넌트 props
 * @param {number} props.itemCount - 컬럼 내 태스크 아이템 수
 * @param {Object} props.sx - MUI 스타일 props
 * @purpose
 * - 칸반 보드 로딩 중 컬럼 레이아웃 피드백 제공
 * - 컬럼 내 태스크 아이템 수 설정
 * - 컬럼 스타일 커스터마이징
 * @related-components
 * - KanbanColumn: 컬럼 컴포넌트
 * - KanbanTaskItem: 태스크 아이템 컴포넌트
 */

export function KanbanColumnSkeleton({ itemCount = 3, sx, ...other }: KanbanColumnSkeletonProps) {
  return Array.from({ length: itemCount }, (_, index) => (
    <Paper
      key={index}
      variant="outlined"
      sx={[
        () => ({
          display: 'flex',
          gap: 'var(--item-gap)',
          flexDirection: 'column',
          p: 'var(--column-padding)',
          width: 'var(--column-width)',
          borderRadius: 'var(--column-radius)',
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Skeleton sx={{ pt: '75%', borderRadius: 1.5 }} />
      {[0].includes(index) && <Skeleton sx={{ pt: '50%', borderRadius: 1.5 }} />}
      {[0, 1].includes(index) && <Skeleton sx={{ pt: '25%', borderRadius: 1.5 }} />}
      {[0, 1, 2].includes(index) && <Skeleton sx={{ pt: '25%', borderRadius: 1.5 }} />}
    </Paper>
  ));
}
