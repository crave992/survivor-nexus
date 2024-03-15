import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import MyDialog from '@/components/dialogs/MyDialog';
import SurvivorForm from '@/components/forms/SurvivorForm';
import { Survivor } from '@/interfaces/Survivor';
import { useSurvivorCrud } from '@/utils/useSurvivorsCrud';
import SurvivorTable from '@/components/tables/SurvivorTable';
import StandardLayout from '@/components/layouts/StandardLayout';

const SurvivorPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  
  const { survivors, addSurvivor, countHealthySurvivors } = useSurvivorCrud();

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateSurvivor = async (survivor: Survivor) => {
    try {
      await addSurvivor(survivor);
      console.log('Survivor added successfully');
      handleCloseDialog();
    } catch (error: Error | any) {
      console.error('Error adding survivor:', error.message);
    }
  };

  const healthySurvivorText = () => {
    const count = countHealthySurvivors();
    if (count === 1) {
      return 'healthy survivor';
    } else {
      return 'healthy survivors';
    }
  };

  return (
    <StandardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <Typography variant="h5">List of Survivors</Typography>
          <p>You have {countHealthySurvivors()} {healthySurvivorText()}</p>
        </div>
        <Button
          variant="outlined"
          sx={{
            bgcolor: 'primary.main',
            '&:hover': {
              bgcolor: 'gray.800',
            },
          }}
          onClick={handleOpenDialog}
        >
          + Add Survivor
        </Button>
      </div>
      <SurvivorTable survivors={survivors}/>
      <MyDialog open={openDialog} onClose={handleCloseDialog} title="Add Survivor">
        <SurvivorForm onSubmit={handleCreateSurvivor} />
      </MyDialog>
    </StandardLayout>
  );
};

export default SurvivorPage;
