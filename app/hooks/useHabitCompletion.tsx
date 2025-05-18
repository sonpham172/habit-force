import { useMutation, useQueryClient } from '@tanstack/react-query';
import { POSTAuth } from '@/app/utils/api';

export const useHabitCompletion = () => {
  const queryClient = useQueryClient();

  const completeHabit = useMutation({
    mutationFn: async (habitId: string) => {
      return await POSTAuth<{ message: string }>(`/habit/${habitId}/complete`, {});
    },
    onSuccess: () => {
      // Invalidate the habits query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['habits'] });
    },
  });

  return {
    completeHabit: completeHabit.mutate,
    isLoading: completeHabit.isPending,
  };
}; 