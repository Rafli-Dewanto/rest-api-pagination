import express, { Application, Request, Response }  from "express";
import { PrismaClient } from "@prisma/client";
import response from "./response"

const prisma = new PrismaClient()
const app: Application = express();

app.get('/api/v1', async (req: Request, res: Response) => {
    const { page } = req.query;
    let pageInt: number = 0;
    const perPage = 5;
    const totalRows = await prisma.post.count();
    const totalPages = Math.ceil(totalRows / perPage);

    if (page) {
        pageInt = parseInt(page as string, 10)
        try {
            if (pageInt) {
                const post = await prisma.post.findMany({
                    take: perPage,
                    skip: (pageInt - 1) * perPage
                })
                response(200, "OK", res, post, pageInt, totalRows, totalPages)
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        const post = await prisma.post.findMany({
            take: perPage,
        })
        response(200, "OK", res, post, 1, totalRows, totalPages)
    }
})

app.listen(3000 || process.env.PORT, () => console.log(`listening on http://localhost:3000`));