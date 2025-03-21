import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { LoginFormSchema } from "@/features/auth/form/login";

type UsePostLoginProps = {
  onSuccess: (data: { token: string }) => void;
  onError: (e: Error) => void;
};

export const UsePostLogin = ({ onSuccess, onError }: UsePostLoginProps) => {
  return useMutation({
    mutationFn: async (data: LoginFormSchema) => {
      const response = await axiosInstance.post("/login", data);
      return response.data;
    },
    onSuccess,
    onError,
  });
};
