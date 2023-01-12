import express, { Request, Response } from 'express';
import { AppRequest } from '../_app';
import Agora from "agora-access-token";
import protect from '../utils/middlewares/protect';
import requestHandler from '../utils/request-handler';

const router : any = express.Router();
router.basePath = "/room";

router.get("/", () => {

});

router.post("/:id/token", protect(), requestHandler(async (req : AppRequest, res: Response) => {
  const { body, context, params, userid } = req;
  const agora : any = context.resolve("agora");
  const { publisher } = body;
  const role = publisher ? Agora.RtcRole.PUBLISHER : Agora.RtcRole.SUBSCRIBER;
  const channel = `konek-${params.id}`;
  // const current = Math.floor(Date.now() / 1000);
  // const expiry = current + agora.expiry;
  const uuid = parseInt(userid || '') || 0;
  const token = Agora.RtcTokenBuilder.buildTokenWithUid(agora.appid, agora.cert, channel, uuid , role, 4294967295);
  return {
    channel,
    expiry: agora.expiry,
    token,
    role
  }

}));

export default router;