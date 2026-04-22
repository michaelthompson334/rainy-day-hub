import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFavorites() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useInternetIdentity();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery<string[]>({
    queryKey: ["favorites"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFavorites();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });

  const addMutation = useMutation({
    mutationFn: async (linkId: string) => {
      if (!actor) throw new Error("No actor");
      return actor.addFavorite(linkId);
    },
    onMutate: async (linkId: string) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });
      const prev = queryClient.getQueryData<string[]>(["favorites"]) ?? [];
      queryClient.setQueryData<string[]>(["favorites"], [...prev, linkId]);
      return { prev };
    },
    onError: (_err, _linkId, ctx) => {
      if (ctx?.prev !== undefined) {
        queryClient.setQueryData<string[]>(["favorites"], ctx.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async (linkId: string) => {
      if (!actor) throw new Error("No actor");
      return actor.removeFavorite(linkId);
    },
    onMutate: async (linkId: string) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });
      const prev = queryClient.getQueryData<string[]>(["favorites"]) ?? [];
      queryClient.setQueryData<string[]>(
        ["favorites"],
        prev.filter((id) => id !== linkId),
      );
      return { prev };
    },
    onError: (_err, _linkId, ctx) => {
      if (ctx?.prev !== undefined) {
        queryClient.setQueryData<string[]>(["favorites"], ctx.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const isFavorited = (linkId: string) => favorites.includes(linkId);

  const toggleFavorite = (linkId: string) => {
    if (isFavorited(linkId)) {
      removeMutation.mutate(linkId);
    } else {
      addMutation.mutate(linkId);
    }
  };

  return {
    favorites,
    isLoading,
    isFavorited,
    toggleFavorite,
  };
}
