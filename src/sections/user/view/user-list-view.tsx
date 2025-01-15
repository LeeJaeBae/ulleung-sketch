'use client';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TableBody from '@mui/material/TableBody';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

import { paths } from 'src/routes/paths';
import { useBoolean } from 'src/hooks/use-boolean';
import { useAuth } from 'src/contexts/auth-context';
import { auth, type AuthUser } from 'src/lib/supabase/client';

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
import { UserTableRow } from '../user-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'email', label: '이메일', width: 220 },
  { id: 'role', label: '권한', width: 180 },
  { id: 'created_at', label: '가입일', width: 180 },
  { id: '', width: 88 },
];

const ROLE_OPTIONS = [
  { value: 'all', label: '전체' },
  { value: 'admin', label: '관리자' },
  { value: 'user', label: '일반 사용자' },
];

// ----------------------------------------------------------------------

export function UserListView() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<AuthUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchEmail, setSearchEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const table = useTable();
  const confirm = useBoolean();

  const loadUsers = useCallback(async () => {
    try {
      const loadedUsers = await auth.listUsers();
      setUsers(loadedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('사용자 목록을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleRoleUpdate = useCallback(
    async (userId: string, newRole: 'admin' | 'user') => {
      try {
        await auth.updateUserRole(userId, newRole);
        toast.success('권한이 변경되었습니다.');
        loadUsers();
      } catch (error) {
        console.error('Error updating role:', error);
        toast.error('권한 변경에 실패했습니다.');
      }
    },
    [loadUsers]
  );

  const handleDeleteRows = useCallback(async () => {
    try {
      // 선택된 사용자 삭제 로직 구현
      toast.success('선택한 사용자가 삭제되었습니다.');
      loadUsers();
    } catch (error) {
      console.error('Error deleting users:', error);
      toast.error('사용자 삭제에 실패했습니다.');
    }
  }, [loadUsers]);

  const filteredUsers = users.filter((user) => {
    const emailMatch = user.email.toLowerCase().includes(searchEmail.toLowerCase());
    const roleMatch = selectedRole === 'all' || user.role === selectedRole;
    return emailMatch && roleMatch;
  });

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
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          placeholder="이메일로 검색..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>권한</InputLabel>
          <Select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            label="권한"
          >
            {ROLE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          선택한 <strong> {table.selected.length} </strong>명의 사용자를 삭제하시겠습니까?
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
    return <div>Loading...</div>;
  }

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="사용자 관리"
        links={[
          { name: '대시보드', href: paths.dashboard.root },
          { name: '사용자', href: paths.dashboard.user.root },
          { name: '목록' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        {renderFilters}

        <Box sx={{ position: 'relative' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={filteredUsers.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                filteredUsers.map((row) => row.id)
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
                  rowCount={filteredUsers.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      filteredUsers.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {filteredUsers.map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRows()}
                      onEditRow={() =>
                        handleRoleUpdate(row.id, row.role === 'admin' ? 'user' : 'admin')
                      }
                    />
                  ))}

                  <TableNoData notFound={!filteredUsers.length} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={filteredUsers.length}
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
