import { Context } from "koa";
const main = (ctx: Context) => {
  ctx.response.body = "live-room-service";
};

export default main;
