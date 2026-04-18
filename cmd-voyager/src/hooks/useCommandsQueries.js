import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCommand,
  deleteCommand,
  getCommand,
  getCommands,
  interactWithCommand,
  updateCommand,
} from "@/services/commandsService";

export const commandKeys = {
  all: ["commands"],
  detail: (id) => ["commands", id],
};

export function useCommands() {
  return useQuery({
    queryKey: commandKeys.all,
    queryFn: getCommands,
  });
}

export function useCommand(id) {
  return useQuery({
    queryKey: commandKeys.detail(id),
    queryFn: () => getCommand(id),
    enabled: !!id,
  });
}

export function useAddCommand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addCommand,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: commandKeys.all });
    },
  });
}

export function useUpdateCommand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, patch }) => updateCommand(id, patch),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: commandKeys.all });
      qc.invalidateQueries({ queryKey: commandKeys.detail(vars.id) });
    },
  });
}

export function useDeleteCommand() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteCommand,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: commandKeys.all });
    },
  });
}

// 🔥 COPY = usage increment
export function useIncrementUsage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => interactWithCommand(id, "copy"),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: commandKeys.all });
    },
  });
}

// ⭐ FAVORITE toggle
export function useToggleFavorite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => interactWithCommand(id, "favorite"),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: commandKeys.all });
    },
  });
}
