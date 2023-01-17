import express, { Request, Response } from 'express';
import { AppRequest } from '../_app';
import Agora from "agora-access-token";
import protect from '../utils/middlewares/protect';
import requestHandler from '../utils/request-handler';
import RoomService from './room-service';
import { BadRequestError } from '../utils/middlewares/error-handler';

const router : any = express.Router();
router.basePath = "/room";

router.get("/:id", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, params } = req as AppRequest;
  const roomService = context.resolve("roomService") as RoomService;
  return await roomService.get(params.id);
}));

router.get("/", protect(), requestHandler(async (req: Request, res: Response) => {
  const { context, query } = req as AppRequest;
  const roomService = context.resolve("roomService") as RoomService;
  return await roomService.find(query);
}));

router.post("/", protect(),  requestHandler(async (req: Request, res: Response) => {
  const { context, body: room, userid } = req as AppRequest;
  const roomService = context.resolve("roomService") as RoomService;
  return await roomService.create(room, userid);
}));

router.put("/:id", requestHandler(async (req: Request, res: Response) => {
  const { context, params, body: room } = req as AppRequest;
  if (!room?.id || room?.id !== params?.id)
  throw new BadRequestError(`The provided id does not matched.`);
const roomService = context.resolve("roomService") as RoomService;
return await roomService.update({...room});
}));


router.post("/:id/token", protect(), requestHandler(async (req : AppRequest, res: Response) => {
  const { body, context, params, userid } = req;
  console.log({ body, context, params, userid })
  const agora : any = context.resolve("agora");
  const { publisher } = body;
  const role = publisher ? Agora.RtcRole.PUBLISHER : Agora.RtcRole.SUBSCRIBER;
  const channel = `konek-${params.id}`;
  const current = Math.floor(Date.now() / 1000);
  const expiry = current + 3600;
  const uuid = parseInt(userid || '') || 0;
  const token = Agora.RtcTokenBuilder.buildTokenWithUid(agora.appid, agora.cert, channel, uuid, role, expiry);
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