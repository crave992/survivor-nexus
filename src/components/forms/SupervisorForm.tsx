import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4
import { TextField, Button, FormControlLabel, Checkbox, Grid } from '@mui/material';
import { Supervisor } from '@/interfaces/Supervisor';

interface SupervisorFormProps {
  onSubmit: (supervisor: Supervisor) => void;
  initialData?: Supervisor;
}

const SupervisorForm: React.FC<SupervisorFormProps> = ({ onSubmit, initialData }) => {
  const [supervisor, setSupervisor] = useState<Supervisor>({
    id: uuidv4(),
    name: '',
    age: 0,
    gender: '',
    lastLocation: {
      latitude: '',
      longitude: '',
    },
    inventory: [],
    infected: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  useEffect(() => {
    if (initialData) {
      setSupervisor(initialData);
    }
  }, [initialData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSupervisor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSupervisor(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleLastLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSupervisor(prevState => ({
      ...prevState,
      lastLocation: {
        ...prevState.lastLocation,
        [name]: value
      }
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(supervisor);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={supervisor.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="number"
            label="Age"
            name="age"
            value={supervisor.age}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Gender"
            name="gender"
            value={supervisor.gender}
            onChange={handleChange}
          />
        </Grid>
        <Grid container spacing={2} item xs={12}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Location Latitude"
              name="latitude"
              value={supervisor.lastLocation.latitude}
              onChange={handleLastLocationChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Location Longitude"
              name="longitude"
              value={supervisor.lastLocation.longitude}
              onChange={handleLastLocationChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox checked={supervisor.infected} onChange={handleCheckboxChange} name="infected" />}
            label="Infected"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SupervisorForm;
