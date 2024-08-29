export interface Server {
  baseDomain: string;
  version: string;
}

const ProdServer: Server = {
  baseDomain: "https://www.eheindia.com/",
  version: "1.0.0",
};

const ProdBackendServer: Server = {
  baseDomain: "https://www.eheindustries.com/",
  version: "1.0.0",
};

export default {
  ProdBackendServer,
  ProdServer,
};
