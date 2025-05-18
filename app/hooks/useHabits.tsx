import { Habit } from "../types/habit";
import { useFetchAuth } from "./useFetchData";

export const useHabits = ({
  userId
}: {userId: string}) => {
  return useFetchAuth<Habit[]>(['habits'], `/habit/${userId}`, !!userId);
};
