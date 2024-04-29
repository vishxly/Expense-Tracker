export interface Expense {
  id: string;
  description?: string;
  amount: number;
  title: string;
  category: string;
  remark?: string;
  userId: string;
}
