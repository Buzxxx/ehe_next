const DEBUG = true;
export const DEFAULT_LOGIN_REDIRECT = "/home";
export const DEFAULT_LOGOUT_REDIRECT = "/auth/login";

export interface Server {
  baseDomain: string;
  version: string;
}

let ProdServer: Server = {
  baseDomain: "https://www.eheindia.com/",
  version: "1.0.0",
};

let ProdBackendServer: Server = {
  baseDomain: "https://www.eheindustries.com/",
  version: "1.0.0",
};

if (DEBUG) {
  ProdServer = {
    baseDomain: "http://localhost:3000/",
    version: "1.0.0",
  };

  ProdBackendServer = {
    baseDomain: "http://127.0.0.1:8000/",
    version: "1.0.0",
  };
}

const Servers = {
  ProdBackendServer,
  ProdServer,
};

export default Servers;
