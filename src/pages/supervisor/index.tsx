import React, { useState } from 'react';
import { Button } from '@mui/material';
import MyDialog from '@/components/dialogs/MyDialog';
import SupervisorForm from '@/components/forms/SupervisorForm';
import { Supervisor } from '@/interfaces/Supervisor';
import { useSupervisorCrud } from '@/utils/useSupervisorCrud'; // Import the useSupervisorCrud hook
import SupervisorTable from '@/components/tables/SupervisorTable';

const SupervisorPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { supervisors, addSupervisor } = useSupervisorCrud(); // Destructure addSupervisor from the hook

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCreateSupervisor = async (supervisor: Supervisor) => {
    try {
      await addSupervisor(supervisor); // Call the addSupervisor function directly
      console.log('Supervisor added successfully');
      handleCloseDialog();
    } catch (error: Error | any) {
      console.error('Error adding supervisor:', error.message);
      // Handle error scenario, e.g., show error message to the user
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Create Supervisor
      </Button>
      <SupervisorTable supervisors={supervisors}/>
      <MyDialog open={openDialog} onClose={handleCloseDialog} title="Create Supervisor">
        <SupervisorForm onSubmit={handleCreateSupervisor} />
      </MyDialog>
    </div>
  );
};

export default SupervisorPage;
