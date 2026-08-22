// Custom HTTPS server for `next start`, so kids' devices on the home wifi
// can reach the app over a locally-trusted certificate (required for
// microphone access / speech-to-text in the browser).
//
// Usage: npm run build && npm run start:https
// Requires certs/localhost.pem + certs/localhost-key.pem (see README).
import { createServer } from "https";
import { readFileSync, existsSync } from "fs";
import next from "next";

const port = Number(process.env.PORT) || 3443;
const certPath = process.env.HTTPS_CERT || "./certs/localhost.pem";
const keyPath = process.env.HTTPS_KEY || "./certs/localhost-key.pem";

if (!existsSync(certPath) || !existsSync(keyPath)) {
  console.error(
    `Missing HTTPS cert/key. Expected ${certPath} and ${keyPath}.\n` +
      `See the README "Local HTTPS setup" section to generate them with mkcert.`
  );
  process.exit(1);
}

const httpsOptions = {
  cert: readFileSync(certPath),
  key: readFileSync(keyPath),
};

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => handle(req, res)).listen(port, "0.0.0.0", () => {
    console.log(`> Ready on https://0.0.0.0:${port} (accessible on your home wifi)`);
  });
});
