import express, { Request } from 'express';
import AuthRoutes from '../auth/rest';
import ClassroomRoutes from '../classroom/rest';
import UserRoutes from '../user/rest';
import RoleRoutes from '../role/rest';

const router = express.Router();

router.use("/ping", (req, res) => {
  res.send("pong");
});

router.use("/auth", AuthRoutes);
router.use("/classroom", ClassroomRoutes);
router.use("/user", UserRoutes);
router.use("/role", RoleRoutes);

export default router;