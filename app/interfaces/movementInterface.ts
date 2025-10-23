export interface Movement {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  account: string;
  pending: boolean;
}

export type Sorted = "date" | "amount";
