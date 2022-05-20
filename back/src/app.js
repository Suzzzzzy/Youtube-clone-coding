import express from "express";
import cors from "cors";
import { registerRouter } from "./routes/registerRouter";
import { loginRouter } from "./routes/loginRouter";
import { videoRouter } from "./routes/videoRouter";
import { subscriberRouter } from "./routes/subscriberRouter";
import { commentRouter } from "./routes/commentRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(registerRouter);
app.use(loginRouter);
app.use(videoRouter);
app.use(commentRouter);
app.use(subscriberRouter);
app.use(errorMiddleware);

export { app };
