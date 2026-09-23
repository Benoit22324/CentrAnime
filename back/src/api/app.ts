import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorHandlerMiddleware, jsonApiResponseMiddleware } from "./middlewares";
import { ApiRouter } from "./routes";
import { initialiseRedisClient } from "./config/redisConfig";
import rateLimit from "express-rate-limit";

const app = express();

initialiseRedisClient();

app.use(cors({
    origin: [
        "http://localhost:5173", "http://127.0.0.1:5173", "http://0.0.0.0:5173",
        "http://localhost:80", "http://127.0.0.1:80", "http://0.0.0.0:80",
        "http://localhost", "http://127.0.0.1", "http://0.0.0.0"
    ],
    credentials: true
}));
app.use(rateLimit({
    limit: 50
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jsonApiResponseMiddleware);

app.use("/api", ApiRouter);

app.use(errorHandlerMiddleware);

app.listen(8000, () => console.log("Serveur lancé !"));