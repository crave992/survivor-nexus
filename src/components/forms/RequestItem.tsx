import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { InventoryItem } from '@/interfaces/Survivor';
import useItems from '@/utils/useItems';

interface RequestItemProps {
  survivorId: string;
  onSubmit: (survivorId: string, inventoryItems: InventoryItem[]) => void;
}

const RequestItem: React.FC<RequestItemProps> = ({ survivorId, onSubmit }) => {
  const { items: allItems } = useItems();
  const [forms, setForms] = useState<{ item_id: string; quantity: number }[]>([{ item_id: '', quantity: 0 }]);

  const handleFormChange = (index: number, key: keyof InventoryItem, value: string | number) => {
    const newForms = [...forms];
    const updatedForm = { ...newForms[index] };

    if (key === 'item_id') {
      updatedForm.item_id = value as string;
    } else if (key === 'quantity') {
      updatedForm.quantity = value as number;
    }

    newForms[index] = updatedForm;
    setForms(newForms);
  };

  const handleAddForm = () => {
    setForms(prevForms => [...prevForms, { item_id: '', quantity: 0 }]);
  };

  const handleRemoveForm = (index: number) => {
    setForms(prevForms => prevForms.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSubmit(survivorId, forms);
    setForms([{ item_id: '', quantity: 0 }]);
  };

  const getAvailableItems = (formIndex: number): { id: string; name: string }[] => {
    let availableItems = [...allItems];
    for (let i = 0; i < formIndex; i++) {
      const selectedItemId = forms[i].item_id;
      availableItems = availableItems.filter(item => item.id !== selectedItemId);
    }
    return availableItems;
  };

  const isAllOptionsSelected = (index: number) => forms[index].item_id !== '' && forms[index].quantity !== 0;

  const isAllFormsOptionsSelected = forms.every((form, index) => isAllOptionsSelected(index));

  const isAddButtonDisabled = isAllFormsOptionsSelected || forms.length === allItems.length;

  return (
    <form>
      {forms.map((form, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id={`item-label-${index}`}>Item</InputLabel>
              <Select
                labelId={`item-label-${index}`}
                value={form.item_id}
                onChange={(e) => handleFormChange(index, 'item_id', e.target.value as string)}
              >
                {getAvailableItems(index).map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Quantity"
              type="number"
              fullWidth
              value={form.quantity}
              onChange={(e) => handleFormChange(index, 'quantity', Number(e.target.value))}
            />
          </Grid>
          {index > 0 && (
            <Grid item xs={2}>
              <Button onClick={() => handleRemoveForm(index)} variant="outlined">
                Remove
              </Button>
            </Grid>
          )}
        </Grid>
      ))}
      <Button onClick={handleAddForm} variant="outlined" disabled={isAddButtonDisabled}>
        Add
      </Button>
      <Button onClick={handleSubmit} variant="outlined" color="success">
        Submit
      </Button>
    </form>
  );
};

export default RequestItem;
