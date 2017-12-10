import cors from 'cors';
import bodyParser from 'body-parser';

// TODO: Not really sure if it's actually needed
let middlewaresInitiated = false;
export default function (app) {
  if (!middlewaresInitiated) {
    middlewaresInitiated = true;
    app.use(cors());
    app.use(bodyParser.json());
  }
}
