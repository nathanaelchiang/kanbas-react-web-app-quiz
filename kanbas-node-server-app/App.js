import express from 'express'
import mongoose from "mongoose";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import cors from "cors";
import UserRoutes from "./Users/routes.js";

mongoose.connect("mongodb+srv://nathanaelchiang1:nYwKH3IqyS7wrGQq@kanbas.e3wsabj.mongodb.net/");

const app = express();
app.use(cors());
app.use(express.json());
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
Hello(app);
UserRoutes(app);
app.listen(process.env.PORT || 4000);
