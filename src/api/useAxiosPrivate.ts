import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRefreshToken } from "./useRefreshToken";
import { useUser } from "../stores/useUser";
import { axiosPrivate } from "./apiConstants";
import useClearAppState from "../hooks/useClearAppState";

export const useAxiosPrivate = () => {
  const { accessToken, updateAccessToken } = useUser();
  const clearAppState = useClearAppState();
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const retriedRequests = new Set<string>();
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization)
          config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(new Error(error.message));
      },
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error: unknown) => {
        if (axios.isAxiosError<{ messages: string }>(error)) {
          const axiosError = error;
          const responseStatus = axiosError.response?.status;
          const originalRequest = axiosError.config;

          const alreadyRetried = retriedRequests.has(
            originalRequest?.url ?? "",
          );

          // if access token is expired
          // then refresh the access token
          // and retry the original request
          if (
            originalRequest &&
            responseStatus === 401 &&
            // !originalRequest._retry &&
            !alreadyRetried
          ) {
            // originalRequest._retry = true;
            retriedRequests.add(originalRequest.url ?? "");

            try {
              const res = await refresh();
              const newAccessToken = res.data.accessToken;
              updateAccessToken(newAccessToken);

              // was trying to use axiosPrivate.defaults.headers.common but it didn't work. may be because we are supplying originalRequest to axiosPrivate instead
              // axiosPrivate.defaults.headers.common[
              //   "Authorization"
              // ] = `Bearer ${newAccessToken}`;

              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

              return axiosPrivate(originalRequest);
            } catch (retriedReqError) {
              if (axios.isAxiosError(retriedReqError)) {
                return Promise.reject(retriedReqError);
              }

              return Promise.reject(
                new Error(
                  "This must be an axios error. please check if something is wrong",
                ),
              );
            }
          }

          //if refresh token is expired
          if (responseStatus === 403) {
            clearAppState();
            navigate("/login", {
              state: {
                from: location.pathname + location.search,
              },
            });
          } else {
            // console.log("in else ", axiosError);
            return Promise.reject(axiosError);
          }
        }
      },
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [
    accessToken,
    refresh,
    updateAccessToken,
    location.pathname,
    location.search,
    navigate,
    clearAppState,
  ]);

  return axiosPrivate;
};
