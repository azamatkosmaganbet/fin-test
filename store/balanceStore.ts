import { StateStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
}

export interface BalanceState {
  transactions: Array<Transaction>;
  runTransaction: (transaction: Transaction) => void;
  balance: () => number;
  clearTransactions: () => void;
}

// Создаем zustand хранилище с использованием AsyncStorage
export const zustandStorage: StateStorage = {
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, value);
  },
  getItem: async (name) => {
    const value = await AsyncStorage.getItem(name);
    return value ?? null;
  },
  removeItem: async (name) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useBalanceStore = create<BalanceState>()(
  persist(
    (set, get) => ({
      transactions: [],
      runTransaction: (transaction: Transaction) => {
        set((state) => ({ transactions: [...state.transactions, transaction] }));
      },
      balance: () => get().transactions.reduce((acc, transaction) => acc + transaction.amount, 0),
      clearTransactions: () => {
        set({ transactions: [] });
      },
    }),
    {
      name: 'balance',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
