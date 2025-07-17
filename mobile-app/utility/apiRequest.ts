import errorMessage from "./errorMessage";

import Constants from "expo-constants";

const { API_URL } = Constants.expoConfig?.extra || {};

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions {
  method?: Method;
  body?: any;
  headers?: Record<string, string>;
  token?: string;
}

export const apiRequest = async (
  endpoint: string,
  options: ApiOptions = {}
): Promise<any> => {
  try {
    const { method = "GET", body, headers = {}, token = "" } = options;

    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      ...(body && { body: JSON.stringify(body) }),
    });

    const data = await response.json();

    if (!response.ok) {
      const message = data.message || "Request failed";
      throw new Error(message);
    }

    return data;
  } catch (error) {
    throw new Error(errorMessage(error));
  }
};
