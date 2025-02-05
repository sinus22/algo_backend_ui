export interface ContestStanding {
  id: number;
  contestId: number;
  userId: number;
  problemId: number;
  wrongAttempt: number;
  isAccepted: boolean;
  time: number;
  createdAt: Date;
  updatedAt: Date;
}
