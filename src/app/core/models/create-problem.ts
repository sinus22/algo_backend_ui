export interface CreateProblem {
  num: number;
  title: string;
  body?: string;
  comment?: string;
  timeLimit?: number;
  memoryLimit?: number;
  status: boolean;
  type: number;
  ball?: number;
}
