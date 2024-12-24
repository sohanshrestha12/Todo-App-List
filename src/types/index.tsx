export interface Todo {
  id: number;
  title: string | null;
  description: string | null;
  isCompleted: boolean;
  created_at: string;
  updated_at: string;
}
