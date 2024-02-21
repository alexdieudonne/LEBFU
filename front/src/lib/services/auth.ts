import { ApiSuccessBase, ApiResponseMessage } from "@/types/ApiBase";
import api from "./api";
import { LoginResponse } from "@/types/Auth";
import { User, UserRegister } from "@/types/User";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<ApiResponseMessage, UserRegister>({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    login: build.mutation<LoginResponse, Record<"email" | "password", string>>({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useRegisterMutation,
  useLoginMutation,
} = authApi;
