import config from "./aws-exports";

// Source: https://github.com/arelaxtest/amplify-auth-demo/blob/master/src/index.js

var urlsIn = config.oauth.redirectSignIn.split(",");
var urlsOut = config.oauth.redirectSignOut.split(",");
const oauth = {
  domain: config.oauth.domain,
  scope: config.oauth.scope,
  redirectSignIn: config.oauth.redirectSignIn,
  redirectSignOut: config.oauth.redirectSignOut,
  responseType: config.oauth.responseType,
};
var hasLocalhost = (hostname) =>
  Boolean(hostname.match(/localhost/) || hostname.match(/127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/));
var hasHostname = (hostname) => Boolean(hostname.includes(window.location.hostname));
var isLocalhost = hasLocalhost(window.location.hostname);
if (isLocalhost) {
  urlsIn.forEach((e) => {
    if (hasLocalhost(e)) {
      oauth.redirectSignIn = e;
    }
  });
  urlsOut.forEach((e) => {
    if (hasLocalhost(e)) {
      oauth.redirectSignOut = e;
    }
  });
} else {
  urlsIn.forEach((e) => {
    if (hasHostname(e)) {
      oauth.redirectSignIn = e;
    }
  });
  urlsOut.forEach((e) => {
    if (hasHostname(e)) {
      oauth.redirectSignOut = e;
    }
  });
}
var configUpdate = config;
configUpdate.oauth = oauth;

export default configUpdate;
