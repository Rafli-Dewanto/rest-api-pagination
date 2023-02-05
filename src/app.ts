import express, { Application }  from "express";
import { notFound } from "./middleware/404";
import { errorHandler } from "./middleware/errorHandler";
import postRoute from './routes/post.route'

const app: Application = express();

app.use(express.json())
app.use('/api/posts', postRoute)
app.use(notFound)
app.use(errorHandler)
app.listen(3000 || process.env.PORT, () => console.log(`listening on http://localhost:3000`));