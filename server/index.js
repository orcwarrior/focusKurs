import express from 'express'
import middlewares from './middleware.generic'
import routes from './routes'
import sockets from './sockets'

const app = express();
const PORT = 3001;
let server = app.listen(PORT, () => {
// eslint-disable-next-line no-console
  console.log(`Utworzono serwis dla focusKurs na porcie ${PORT}!`)
});

sockets(server);

middlewares(app);
routes(app);
