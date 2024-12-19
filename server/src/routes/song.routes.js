import { Router } from "express";
import {
    addSong,
    listSong,
    removeSong,
    searchSong,
} from "../controllers/songController.js";
import upload from "../middleware/multer.js";

const songRouter = Router();

songRouter.post(
    "/add",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "audio", maxCount: 1 },
    ]),
    addSong,
);
songRouter.get("/list", listSong);
songRouter.post("/remove", removeSong);
songRouter.get("/search/:query", searchSong);

export default songRouter;
