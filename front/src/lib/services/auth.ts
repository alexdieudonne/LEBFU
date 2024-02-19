import { ApiSuccessBase } from "@/types/ApiBase";
import api from "./api";
import { LoginResponse } from "@/types/Auth";
import { User, UserRegister } from "@/types/User";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<Pick<ApiSuccessBase<any>['response'], "message">, UserRegister>({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    login: build.mutation<ApiSuccessBase<LoginResponse>, Record<"email" | "password", string>>({
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
