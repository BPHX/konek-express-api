import express, { Request, Response } from 'express';
import { AppRequest } from '../_app';
import Agora from "agora-access-token";
import protect from '../utils/middlewares/protect';
import requestHandler from '../utils/request-handler';
import RoomService from './room-service';
import { BadRequestError } from '../utils/middlewares/error-handler';

const router : any = express.Router();
router.basePath = "/room";

router.get("/:id", requestHandler(async (req: Request, res: Response) => {
  const { context, params } = req as AppRequest;
  const roomService = context.resolve("roomService") as RoomService;
  return await roomService.get(params.id);
}));

// permissions here

router.get("/", requestHandler(async (req: Request, res: Response) => {
  const { context } = req as AppRequest;
  const roomService = context.resolve("roomService") as RoomService;
  return await roomService.find(null);
}));

router.post("/",  requestHandler(async (req: Request, res: Response) => {
  const { context, body: room, userid } = req as AppRequest;
  const roomService = context.resolve("roomService") as RoomService;
  console.log({ context, body: room, userid });
  //return await roomService.create(user);
}));

router.put("/:id", requestHandler(async (req: Request, res: Response) => {
  const { context, params, body: user } = req as AppRequest;
  const userid = user?.id;
  console.log({ context, body: user, userid, params });
  if (!user?.id || user?.id !== params?.id)
    throw new BadRequestError(`The provided id does not matched.`);
  
  const roleService = context.resolve("roomService") as RoomService;
  
  //return await roleService.update({...user});
}));

router.post("/:id/token", protect(), requestHandler(async (req : AppRequest, res: Response) => {
  const { body, context, params, userid } = req;
  const agora : any = context.resolve("agora");
  const { publisher } = body;
  const role = publisher ? Agora.RtcRole.PUBLISHER : Agora.RtcRole.SUBSCRIBER;
  const channel = `konek-${params.id}`;
  const current = Math.floor(Date.now() / 1000);
  const expiry = current + 3600;
  const uuid = parseInt(userid || '') || 0;
  const token = Agora.RtcTokenBuilder.buildTokenWithUid(agora.appid, agora.cert, channel, 0, role, expiry);
  return {
    uuid,
    appid: agora.appid,
    channel,
    expiry: expiry,
    token,
    role
  }

}));

export default router;