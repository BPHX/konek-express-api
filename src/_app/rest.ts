import express from 'express';
import routes from '../rest';

const router = express.Router();

router.use("/ping", (req, res) => {
  res.send("pong");
});

routes.forEach((route: any) => {
  if (route.basePath) {
    router.use(route.basePath, route);
  } else {
    router.use(route);
  }
});

export default router;