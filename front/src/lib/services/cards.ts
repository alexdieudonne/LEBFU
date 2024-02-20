import api from "./api";
import { User, UserCookieType } from "@/types/User";
import { setCredentials } from "./slices/authSlice";
import { getUserCookie, setUserCookie } from "../helpers/UserHelper";
import { ApiSuccessBase } from "@/types/ApiBase";
import { Card, CardAnswerResponse, CreateCardRequest } from "@/types/Card";

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCards: build.query<Array<Card>, void>({
            query: () => {
                return {
                    url: `/cards`,
                    method: "GET",
                };
            },
            providesTags: ["Cards"],
        }),
        createCard: build.mutation<void, CreateCardRequest>({
            query: (body) => {
                return {
                    url: `/cards`,
                    method: "POST",
                    body,
                };
            },
            invalidatesTags: ["Cards"],
        }),
        getTodayCardQuizz: build.query<void, Card>({
            query: () => {
                return {
                    url: `/cards/quizz`,
                    method: "GET",
                };
            },
            providesTags: ["CardsQuizz"],
        }),
        sendAnswerCardQuizz: build.query<CardAnswerResponse, Pick<Card, "id">>({
            query: (id) => {
                return {
                    url: `/cards/${id}/quizz`,
                    method: "PATCH",
                };
            },
            providesTags: ["CardsQuizz"],
        }),

    }),
    overrideExisting: true,
});

export const {
    useLazyGetTodayCardQuizzQuery,
    useLazyGetCardsQuery,
    useGetCardsQuery,
    useLazySendAnswerCardQuizzQuery,
    useCreateCardMutation,
} = userApi;
