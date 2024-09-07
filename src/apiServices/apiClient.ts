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
  } catch (error: any) {
    // Check if error is an instance of Error
    console.error("api client error :", error);
    return false;
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
