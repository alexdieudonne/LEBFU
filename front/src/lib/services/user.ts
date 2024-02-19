import api from "./api";
import { User, UserCookieType } from "@/types/User";
import { setCredentials } from "./slices/authSlice";
import { getUserCookie, setUserCookie } from "../helpers/UserHelper";
import { ApiSuccessBase } from "@/types/ApiBase";

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getMe: build.query<ApiSuccessBase<{ user: User }>, void>({
            query: () => {
                return {
                    url: `/users/me`,
                    method: "GET",
                };
            },
            async onQueryStarted(_, { queryFulfilled, dispatch, }) {
                const session = await getUserCookie(UserCookieType.SESSION);
                if (session.user) {
                    dispatch(setCredentials({ user: session.user }));
                }
                const { data } = await queryFulfilled;
                setUserCookie(UserCookieType.SESSION, ({
                    user: data.data.user
                }));
                dispatch(setCredentials({ user: data.data.user }));
            },
            providesTags: ["Me"],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetMeQuery,
    useLazyGetMeQuery,
} = userApi;
