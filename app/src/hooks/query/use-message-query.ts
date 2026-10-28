import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  createMessage,
  deleteMessage,
  getManyMessage,
  getMessageById,
  updateMessage,
} from "@/apis/message.api";
import type {
  CreateMessage,
  GetManyMessageReq,
  UpdateMessageReq,
} from "@/types/message.type";

function useGetManyMessage(req: GetManyMessageReq) {
  return useQuery({
    queryKey: ["messages", req.id, req.at, req.region],
    queryFn: () => getManyMessage(req),
    enabled: !!req.id && !!req.at,
    staleTime: 5 * 60 * 1000,
  });
}

function useGetMessageById(id: string | undefined) {
  return useQuery({
    queryKey: ["messages", id],
    queryFn: () => getMessageById(id ?? ""),
    enabled: !!id,
  });
}

function useCreateMessage(id: string | undefined) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  if (!id) {
    toast.error("Không thể lấy thông tin khách hàng!");
    navigate(`/customers`);
  }

  return useMutation({
    mutationFn: (data: CreateMessage) => createMessage(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      toast.success(data.message);
      navigate(`/customers/${id}`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}

function useUpdateMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, id }: { id: string; data: UpdateMessageReq }) =>
      updateMessage(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}

function useDeleteMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMessage(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
}

export {
  useCreateMessage,
  useDeleteMessage,
  useGetManyMessage,
  useGetMessageById,
  useUpdateMessage,
};
