import { supabase } from './supabase';
import { useState, useEffect } from 'react';
import { Supervisor } from '@/interfaces/Supervisor'; // Import Supervisor interface

export const useSupervisorCrud = () => {
  const [supervisors, setSupervisors] = useState<Supervisor[]>([]);

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const { data, error } = await supabase.from('tbl_supervisors').select('*');
        if (error) {
          throw error;
        } else {
          setSupervisors(data as Supervisor[]);
        }
      } catch (error) {
        console.error('Error fetching supervisors:', (error as Error).message);
      }
    };

    fetchSupervisors();
  }, []);

  const addSupervisor = async (supervisor: Supervisor) => {
    try {
      const { data, error } = await supabase.from('tbl_supervisors').insert([supervisor]);
      if (error) {
        throw error;
      } else if (data) {
        setSupervisors(prevSupervisors => [...prevSupervisors, data[0] as Supervisor]);
      }
    } catch (error) {
      console.error('Error adding supervisor:', (error as Error).message);
    }
  };

  const deleteSupervisor = async (id: string) => {
    try {
      const { error } = await supabase.from('tbl_supervisors').delete().eq('id', id);
      if (error) {
        throw error;
      } else {
        setSupervisors(prevSupervisors => prevSupervisors.filter(supervisor => supervisor.id !== id));
      }
    } catch (error) {
      console.error('Error deleting supervisor:', (error as Error).message);
    }
  };

  return {
    supervisors,
    addSupervisor,
    deleteSupervisor
  };
};
