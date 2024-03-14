import React, { useState } from 'react';
import { Survivor } from '@/interfaces/Survivor';
import { useSurvivorCrud } from '@/utils/useSurvivorsCrud';
import StandardLayout from '@/components/layouts/StandardLayout';
import InventoryTable from '@/components/tables/InventoryTable';
import { Typography } from '@mui/material';

const InventoryPage = () => {
  const { survivors, addSurvivor, sumInventoryQuantities } = useSurvivorCrud();

  return (
    <StandardLayout>
      <div>
        <Typography variant="h5">List if Survivors Inventories</Typography>
        <p>You have {sumInventoryQuantities()} Inventories logged</p>
      </div>
      <InventoryTable survivors={survivors}/>
    </StandardLayout>
  );
};

export default InventoryPage;
