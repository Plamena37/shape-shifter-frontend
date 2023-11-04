import axios, { AxiosError } from "axios";
import { format, subYears } from "date-fns";
import { DecodedToken } from "./interfaces";
import jwt_decode from "jwt-decode";

export function isAxiosError<ResponseType>(
  error: unknown
): error is AxiosError<ResponseType> {
  return axios.isAxiosError(error);
}

export const getAuthorizationHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return `Bearer ${token}`;
  }
};

export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return token;
  }
};

export const getCurrentUserIdAndEmail = () => {
  const userToken = getTokenFromLocalStorage();
  if (userToken) {
    const { email, id }: DecodedToken = jwt_decode(userToken);
    return { email, id };
  }
};

export const fiveYearsBeforeToday = () =>
  format(subYears(new Date(), 5), "yyyy-MM-dd");

export const formatDate = (date: Date | undefined) =>
  format(new Date(date!), "yyyy-MM-dd");
