import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4
import { TextField, Button, FormControlLabel, Checkbox, Grid, RadioGroup, Radio, Typography } from '@mui/material';
import { Survivor } from '@/interfaces/Survivor';

interface SurvivorFormProps {
  onSubmit: (survivor: Survivor) => void;
  initialData?: Survivor;
}

const SurvivorForm: React.FC<SurvivorFormProps> = ({ onSubmit, initialData }) => {
  const [survivor, setSurvivor] = useState<Survivor>({
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
      setSurvivor(initialData);
    }
  }, [initialData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSurvivor(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setSurvivor(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleLastLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSurvivor(prevState => ({
      ...prevState,
      lastLocation: {
        ...prevState.lastLocation,
        [name]: value
      }
    }));
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSurvivor(prevState => ({
      ...prevState,
      gender: event.target.value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(survivor);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={survivor.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="number"
            label="Age"
            name="age"
            value={survivor.age}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Gender</Typography>
          <RadioGroup
            aria-label="gender"
            name="gender"
            value={survivor.gender}
            onChange={handleGenderChange}
          >
            <div className="flex justify-start">
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </div>
          </RadioGroup>
        </Grid>
        <Grid container spacing={2} item xs={12}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Location Latitude"
              name="latitude"
              value={survivor.lastLocation.latitude}
              onChange={handleLastLocationChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Location Longitude"
              name="longitude"
              value={survivor.lastLocation.longitude}
              onChange={handleLastLocationChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox checked={survivor.infected} onChange={handleCheckboxChange} name="infected" />}
            label="Infected"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SurvivorForm;
