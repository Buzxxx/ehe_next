import settings, { Server } from "@/settings/settings";

export interface RequestOptions {
  method: string;
  headers?: HeadersInit;
  body?: string;
}

const apiClient = async (
  endpoint: string,
  serverName: string,
  options: RequestOptions
) => {
  const url = apiurls(endpoint, serverName);
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (!response.ok) {
      // Throw an error with the status text if the response is not OK
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // Assuming the API returns JSON
    return await response.json();
  } catch (error) {
    // Check if error is an instance of Error
    if (error instanceof Error) {
      // Handle known error types
      console.error("Fetch error:", error.message);
      throw new Error(error.message || "An unknown error occurred");
    } else {
      // Handle unknown error types
      console.error("An unknown error occurred: mcode:2851");
      throw new Error("An unknown error occurred: mcode:2851");
    }
    return;
  }
};

function apiurls(endpoint: string, serverName: string): string {
  const server: Server | undefined = (settings as any)[serverName];
  if (!server) {
    throw new Error(`Server configuration '${serverName}' not found.`);
  }

  const baseUrl = server.baseDomain.endsWith("/")
    ? server.baseDomain.slice(0, -1)
    : server.baseDomain;
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  return `${baseUrl}${path}`;
}

export default apiClient;
