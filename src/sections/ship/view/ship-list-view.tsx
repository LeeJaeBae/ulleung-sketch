'use client';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  TableNoData,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { DashboardContent } from 'src/layouts/dashboard';
import { LoadingScreen } from 'src/components/loading-screen';
import { ShipTableRow, type Ship } from '../components/ship-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: '선박명', width: 220 },
  { id: 'type', label: '선박 종류', width: 180 },
  { id: 'capacity', label: '정원', width: 120 },
  { id: 'status', label: '상태', width: 100 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export function ShipListView() {
  const [ships, setShips] = useState<Ship[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');

  const table = useTable();
  const confirm = useBoolean();

  const loadShips = useCallback(async () => {
    try {
      // TODO: API 호출로 선박 목록 불러오기
      setShips([]);
    } catch (error) {
      console.error('Error loading ships:', error);
      toast.error('선박 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadShips();
  }, [loadShips]);

  const handleDeleteRows = useCallback(async () => {
    try {
      // TODO: 선택된 선박 삭제 로직 구현
      toast.success('선택한 선박이 삭제되었습니다.');
      loadShips();
    } catch (error) {
      console.error('Error deleting ships:', error);
      toast.error('선박 삭제에 실패했습니다.');
    }
  }, [loadShips]);

  const filteredShips = ships.filter((ship) =>
    ship.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const renderFilters = (
    <Stack
      spacing={2}
      direction={{ xs: 'column', md: 'row' }}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      sx={{ p: 2.5 }}
    >
      <Stack direction="row" alignItems="center" spacing={2} flexGrow={1}>
        <TextField
          fullWidth
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="선박명으로 검색..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Stack>
  );

  const renderConfirmDialog = () => (
    <ConfirmDialog
      open={confirm.value}
      onClose={confirm.onFalse}
      title="삭제"
      content={
        <>
          선택한 <strong> {table.selected.length} </strong>척의 선박을 삭제하시겠습니까?
        </>
      }
      action={
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleDeleteRows();
            confirm.onFalse();
          }}
        >
          삭제
        </Button>
      }
    />
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="선박 관리"
        links={[
          { name: '대시보드', href: paths.dashboard.root },
          { name: '선박', href: paths.dashboard.root },
          { name: '목록' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.root}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            새 선박
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        {renderFilters}

        <Box sx={{ position: 'relative' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={filteredShips.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                filteredShips.map((row) => row.id)
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headCells={TABLE_HEAD}
                  rowCount={filteredShips.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      filteredShips.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {filteredShips.map((row) => (
                    <ShipTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRows()}
                      onEditRow={() => {}}
                    />
                  ))}

                  <TableNoData notFound={!filteredShips.length} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={filteredShips.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Box>
      </Card>

      {renderConfirmDialog()}
    </DashboardContent>
  );
}
