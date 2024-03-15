// @/utils/useItems.ts

import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { Items } from '@/interfaces/Items';

const useItems = () => {
  const [items, setItems] = useState<Items[]>([]);
  const [isItems, setIsItems] = useState<boolean>(false);
  const fetchItems = async () => {
    try {
      const { data, error } = await supabase.from('tbl_items').select('*');
      if (error) {
        throw error;
      }
      if (data) {
        setItems(data);
        setIsItems(true);
      }
    } catch (error) {
      console.error('Error fetching items:', (error as Error).message);
    }
  };

  const getItemById = async (id: string) => {
    try {
      const { data, error } = await supabase.from('tbl_items').select('*').eq('id', id).single();
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error fetching item by ID:', (error as Error).message);
      return null;
    }
  };

  const addItem = async (newItem: Omit<Items, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>) => {
    try {
      const { data, error } = await supabase.from('tbl_items').insert({
        ...newItem,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setIsItems(true);
      if (error) {
        throw error;
      }
      if (data) {
        setItems(prevItems => [...prevItems, data[0]]);
      }
    } catch (error) {
      console.error('Error adding item:', (error as Error).message);
    }
  };

  const updateItem = async (id: string, updatedItem: Omit<Items, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const { error } = await supabase.from('tbl_items').update({
        ...updatedItem,
        updatedAt: new Date(),
      }).eq('id', id);
      setIsItems(true);
      if (error) {
        throw error;
      }
      setItems(prevItems =>
        prevItems.map(item => (item.id === id ? { ...item, ...updatedItem, updatedAt: new Date() } : item))
      );
    } catch (error) {
      console.error('Error updating item:', (error as Error).message);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase.from('tbl_items').delete().eq('id', id);
      setIsItems(true);
      if (error) {
        throw error;
      }
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', (error as Error).message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [isItems]);

  return {
    items,
    fetchItems,
    getItemById,
    addItem,
    updateItem,
    deleteItem,
  };
};

export default useItems;
