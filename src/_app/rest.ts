import express from 'express';
import routes from '../rest';

const router = express.Router();

router.use("/ping", (req, res) => {
  res.send("pong");
});

routes.map((route: any) => {
  router.use(route.basePath, route);
});

export default router;