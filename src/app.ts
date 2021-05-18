import express, { Application } from "express";
import passport from "passport";
import * as bodyParser from 'body-parser';
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import routes from "./routes";

const app: Application = express();

app.use(passport.initialize());
app.use(bodyParser.json({
    limit: '50mb',
    verify(req: any, res, buf, encoding) {
        req.rawBody = buf;
    }
}));
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use('/api/v1', routes);

app.get('/', (req, res) => res.json({status:"success", message:"Home API", data:null, success:true}));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.all('*', (req, res) => {
  res.statusCode = 404;
  res.json({status:"success", message:"404", success:false});
});

export {app};