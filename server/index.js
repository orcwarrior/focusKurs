import express from 'express'
import middlewares from './middleware.generic'
import routes from './routes'

const app = express();

app.listen(3000, () => {
// eslint-disable-next-line no-console
  console.log('Utworzono serwis dla focusKurs na porcie 3000!')
});

middlewares(app);
routes(app);

