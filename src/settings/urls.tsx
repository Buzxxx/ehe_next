// All global APIEnd points should be defined here
import settings, { Server } from "./settings";

const GlobalApiEndpoints = {
  name: "endpoint/value",
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

export default { GlobalApiEndpoints, apiurls };
