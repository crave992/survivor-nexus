// @/interfaces/Survivor.ts

export interface InventoryItem {
  item_id: string;
  quantity: number;
}

export interface Survivor {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastLocation: {
    latitude: string;
    longitude: string;
  };
  inventory: InventoryItem[];
  infected: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
