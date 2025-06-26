import express, { Response } from "express";
import cors from "cors";
import quizRoutes from "./routes/quiz-route";

const app = express();
const port = process.env.APP_PORT || 3001;

app.use(
	cors({
		origin: process.env.FRONTEND_ORIGIN,
	})
);
app.use(express.json());
app.use("/", quizRoutes);

app.get("/", (_, res: Response) => {
	res.send("Quiz Builder API is running");
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
