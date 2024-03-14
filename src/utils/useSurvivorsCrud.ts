import { supabase } from './supabase';
import { useState, useEffect } from 'react';
import { InventoryItem, Survivor } from '@/interfaces/Survivor';
import useItems from '@/utils/useItems'; // Import the useItems hook

export const useSurvivorCrud = () => {
  const [survivors, setSurvivors] = useState<Survivor[]>([]);
  const { items: allItems } = useItems(); // Fetch items using the useItems hook

  useEffect(() => {
    const fetchSurvivors = async () => {
      try {
        const { data, error } = await supabase.from('tbl_survivors').select('*');
        if (error) {
          throw error;
        } else {
          setSurvivors(data as Survivor[]);
        }
      } catch (error) {
        console.error('Error fetching survivors:', (error as Error).message);
      }
    };

    fetchSurvivors();
  }, []);

  const countInfectedSurvivors = () => {
    return survivors.filter(survivor => survivor.infected).length;
  };

  const countHealthySurvivors = () => {
    return survivors.filter(survivor => !survivor.infected).length;
  };

  const addSurvivor = async (survivor: Survivor) => {
    try {
      const { data, error } = await supabase.from('tbl_survivors').insert([survivor]);
      if (error) {
        throw error;
      } else if (data) {
        setSurvivors(prevSurvivors => [...prevSurvivors, data[0] as Survivor]); // Update state
      }
    } catch (error) {
      console.error('Error adding survivor:', (error as Error).message);
    }
  };

  const deleteSurvivor = async (id: string) => {
    try {
      const { error } = await supabase.from('tbl_survivors').delete().eq('id', id);
      if (error) {
        throw error;
      } else {
        setSurvivors(prevSurvivors => prevSurvivors.filter(survivor => survivor.id !== id));
      }
    } catch (error) {
      console.error('Error deleting survivor:', (error as Error).message);
    }
  };

  const addRequestItem = async (supervisorId: string, inventoryItems: InventoryItem[]) => {
    try {
      const { data, error } = await supabase.from('tbl_survivors').select('inventory').eq('id', supervisorId).single();
      if (error) {
        throw error;
      }
      const updatedInventory = [...data.inventory];

      inventoryItems.forEach(item => {
        const existingItemIndex = updatedInventory.findIndex(i => i.item_id === item.item_id);

        if (existingItemIndex !== -1) {
          updatedInventory[existingItemIndex].quantity += item.quantity;
        } else {
          updatedInventory.push(item);
        }
      });

      const { error: updateError } = await supabase.from('tbl_survivors').update({ inventory: updatedInventory }).eq('id', supervisorId);
      if (updateError) {
        throw updateError;
      }

    } catch (error) {
      console.error('Error adding request item:', (error as Error).message);
    }
  };

  const sumInventoryQuantities = () => {
    let sum = 0;
    survivors.forEach(survivor => {
      survivor.inventory.forEach(item => {
        sum += item.quantity;
      });
    });
    return sum;
  };

  const percentageInfected = () => {
    if (survivors.length === 0) return 0;
    const infectedCount = countInfectedSurvivors();
    return (infectedCount / survivors.length) * 100;
  };

  const percentageNonInfected = () => {
      if (survivors.length === 0) return 0;
      const nonInfectedCount = countHealthySurvivors();
      return (nonInfectedCount / survivors.length) * 100;
  };

  const averageResourceAmount = () => {
    if (survivors.length === 0 || allItems.length === 0) return {}; // Check if survivors or items are available

    const totalResources: { [key: string]: number } = {};
    survivors.forEach(survivor => {
      survivor.inventory.forEach(item => {
        const selectedItem = allItems.find(i => i.id === item.item_id);
        if (selectedItem) {
          totalResources[selectedItem.name] = (totalResources[selectedItem.name] || 0) + item.quantity;
        }
      });
    });

    const avgAmounts: { [key: string]: number } = {};
    Object.keys(totalResources).forEach(resource => {
      avgAmounts[resource] = totalResources[resource] / survivors.length;
    });

    return avgAmounts;
  };

  return {
      survivors,
      countInfectedSurvivors,
      countHealthySurvivors,
      addSurvivor,
      deleteSurvivor,
      addRequestItem,
      sumInventoryQuantities,
      percentageInfected,
      percentageNonInfected,
      averageResourceAmount,
  };
};
