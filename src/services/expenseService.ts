import { config } from '../firebase/firebaseConfig';
import { Expense } from '../components/types'; 
import 'firebase/firestore'

const db = config.firestore;


const collectionName = 'expenses';

export const addExpense = async (expense: Expense) => {
  try {
    await db.collection(collectionName).add(expense);
    console.log('Expense added successfully');
  } catch (error) {
    console.error('Error adding expense: ', error);
  }
};

export const getExpenses = async (): Promise<Expense[]> => {
  try {
    const snapshot = await db.collection(collectionName).get();
    const expenses: Expense[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    snapshot.forEach((doc: { data: () => any; id: any; }) => {
      const data = doc.data();
      expenses.push({ id: doc.id, ...data } as Expense);
    });
    return expenses;
  } catch (error) {
    console.error('Error getting expenses: ', error);
    return [];
  }
};

export const deleteExpense = async (expenseId: string) => {
  try {
    await db.collection(collectionName).doc(expenseId).delete();
    console.log('Expense deleted successfully');
  } catch (error) {
    console.error('Error deleting expense: ', error);
  }
};

export const updateExpense = async (expenseId: string, updatedExpense: Expense) => {
  try {
    await db.collection(collectionName).doc(expenseId).update(updatedExpense);
    console.log('Expense updated successfully');
  } catch (error) {
    console.error('Error updating expense: ', error);
  }
};
