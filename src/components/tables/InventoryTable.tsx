import React, { useState, useEffect, useMemo } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, TablePagination, Button } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import MyDialog from '@/components/dialogs/MyDialog';
import RequestItem from '@/components/forms/RequestItem';
import { useSurvivorCrud } from '@/utils/useSurvivorsCrud';
import useItems from '@/utils/useItems';
import { InventoryItem, Survivor } from '@/interfaces/Survivor';

interface InventoryTableProps {
  survivors: Survivor[];
}

const InventoryTable: React.FC<InventoryTableProps> = ({ survivors }) => {
  const { addRequestItem, refreshSurvivors } = useSurvivorCrud();
  const { getItemById } = useItems();
  const [sortBy, setSortBy] = useState<keyof Survivor>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedSurvivor, setSelectedSurvivor] = useState<Survivor | null>(null);
  const [itemNames, setItemNames] = useState<{ [key: string]: string }>({});
  useEffect(() => {
    const fetchItemNames = async () => {
      const names: { [key: string]: string } = { ...itemNames };
      const uniqueItemIds = new Set<string>();
      survivors.forEach((survivor) => {
        survivor.inventory.forEach((item) => {
          uniqueItemIds.add(item.item_id);
        });
      });

      const newIds = Array.from(uniqueItemIds).filter(itemId => !names[itemId]);

      if (newIds.length === 0) return;

      try {
        await Promise.all(newIds.map(async (itemId) => {
          const itemData = await getItemById(itemId);
          if (itemData) {
            names[itemId] = itemData.name;
          }
        }));
        setItemNames(names);
      } catch (error) {
        console.error("Error fetching item names:", error);
      }
    };
    fetchItemNames();
  }, [survivors, getItemById, itemNames]); // Include itemNames in dependencies array

  const handleSort = (field: keyof Survivor) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedSurvivors = useMemo(() => {
    const sorted = [...survivors];
    sorted.sort((a, b) => {
      const aValue = a[sortBy] || '';
      const bValue = b[sortBy] || '';
      if (aValue === bValue) return 0;
      return sortOrder === 'asc' ? (aValue < bValue ? -1 : 1) : aValue > bValue ? -1 : 1;
    });
    return sorted;
  }, [survivors, sortBy, sortOrder]); // Remove itemNames from here

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestItem = (survivor: Survivor) => {
    setSelectedSurvivor(survivor);
    setOpenDialog(true);
  };

  const handleSubmitItems = async (survivorId: string, inventoryItems: InventoryItem[]) => {
    try {
      await addRequestItem(survivorId, inventoryItems);
      await refreshSurvivors();
      window.location.reload();
      handleCloseDialog();
    } catch (error) {
      console.error("Error handling item submission:", error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSurvivor(null);
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
              <TableCell>Inventory</TableCell>
              <TableCell>Action</TableCell>
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
                  {
                    survivor.inventory.map((item: { item_id: string; quantity: number }, index: number) => {
                      const itemName = itemNames[item.item_id] || 'Unknown Item';
                      const comma = index === survivor.inventory.length - 1 ? '' : ', ';
                      return <span key={item.item_id}>{`${itemName}: ${item.quantity}${comma}`}</span>;
                    })
                  }
                </TableCell>
                <TableCell>
                  <Button variant="outlined" color="secondary" onClick={() => handleRequestItem(survivor)}>Request Item</Button>
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
      <MyDialog open={openDialog} onClose={handleCloseDialog} title="Request Item">
        <RequestItem survivorId={selectedSurvivor?.id || ''} onSubmit={handleSubmitItems} />
      </MyDialog>
    </div>
  );
};

const SortArrow: React.FC<{ direction: 'asc' | 'desc' }> = ({ direction }) => {
  return direction === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />;
};

export default InventoryTable;
