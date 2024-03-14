import React, { useState, useEffect, useMemo } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, TablePagination, Button } from '@mui/material';
import { Survivor } from '@/interfaces/Survivor';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { format } from 'date-fns';

interface SurvivorTableProps {
  survivors: Survivor[];
}

const SurvivorTable: React.FC<SurvivorTableProps> = ({ survivors }) => {
  const [sortBy, setSortBy] = useState<keyof Survivor>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortedSurvivors, setSortedSurvivors] = useState<Survivor[]>([]);

  useEffect(() => {
    const sorted = [...survivors];
    sorted.sort((a, b) => {
      const aValue = a[sortBy] || '';
      const bValue = b[sortBy] || '';
      if (aValue === bValue) return 0;
      return sortOrder === 'asc' ? (aValue < bValue ? -1 : 1) : aValue > bValue ? -1 : 1;
    });
    setSortedSurvivors(sorted);
  }, [survivors, sortBy, sortOrder]);

  const handleSort = (field: keyof Survivor) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="overflow-x-auto">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <IconButton className="text-xs" onClick={() => handleSort('name')}>
                  Name {sortBy === 'name' && <SortArrow direction={sortOrder} />}
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton className="text-xs" onClick={() => handleSort('infected')}>
                  Status {sortBy === 'infected' && <SortArrow direction={sortOrder} />}
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton className="text-xs" onClick={() => handleSort('createdAt')}>
                  Date Added {sortBy === 'createdAt' && <SortArrow direction={sortOrder} />}
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? sortedSurvivors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : sortedSurvivors
            ).map((survivor, index) => (
              <TableRow key={index}>
                <TableCell>{survivor.name}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        survivor.infected ? 'bg-red-400' : 'bg-green-400'
                      }`}
                    />
                    <span
                      className={`${
                        survivor.infected ? 'text-red-600' : 'text-green-600'
                      } mr-1 relative bg-opacity-10 rounded-sm px-1`}
                    >
                      {survivor.infected ? 'Infected' : 'Healthy'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {format(new Date(survivor.createdAt), 'MMMM dd, yyyy')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          component="div"
          count={survivors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

const SortArrow: React.FC<{ direction: 'asc' | 'desc' }> = ({ direction }) => {
  return direction === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />;
};

export default SurvivorTable;
