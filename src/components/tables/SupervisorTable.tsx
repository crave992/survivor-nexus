import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton } from '@mui/material';
import { Supervisor } from '@/interfaces/Supervisor';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

interface SupervisorTableProps {
  supervisors: Supervisor[];
}

const SupervisorTable: React.FC<SupervisorTableProps> = ({ supervisors }) => {
  const [sortBy, setSortBy] = React.useState<keyof Supervisor>('name'); // Use keyof Supervisor
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Supervisor) => { // Use keyof Supervisor
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedSupervisors = React.useMemo(() => {
    const sorted = [...supervisors];
    sorted.sort((a, b) => {
      const aValue = a[sortBy] || ''; // Provide default value if aValue is undefined
      const bValue = b[sortBy] || ''; // Provide default value if bValue is undefined
      if (aValue === bValue) return 0;
      return sortOrder === 'asc' ? (aValue < bValue ? -1 : 1) : aValue > bValue ? -1 : 1;
    });
    return sorted;
  }, [supervisors, sortBy, sortOrder]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <IconButton sx={{fontSize: '15px'}} onClick={() => handleSort('name')}>
                Name {sortBy === 'name' && <SortArrow direction={sortOrder} />}
              </IconButton>
            </TableCell>
            <TableCell>
              <IconButton sx={{fontSize: '15px'}} onClick={() => handleSort('infected')}>
                Status {sortBy === 'infected' && <SortArrow direction={sortOrder} />}
              </IconButton>
            </TableCell>
            <TableCell>
              Inventory
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedSupervisors.map((supervisor, index) => (
            <TableRow key={index}>
              <TableCell>{supervisor.name}</TableCell>
              <TableCell>{supervisor.infected ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <ul style={{ textAlign: 'center', padding: 0, margin: 0, listStyleType: 'none' }}>
                  {supervisor.inventory.map((item: { item_id: string, quantity: number }) => (
                    <li key={item.item_id}>{`${item.item_id}: ${item.quantity}`}</li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const SortArrow: React.FC<{ direction: 'asc' | 'desc' }> = ({ direction }) => {
  return direction === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />;
};

export default SupervisorTable;
