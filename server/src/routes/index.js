import { Router } from "express";

const rootRouter = Router();

rootRouter.use("/auth", require("./auth.routes"));
rootRouter.use("/song", require("./song.routes"));
rootRouter.use("/album", require("./album.routes"));

export default rootRouter;
