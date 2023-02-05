import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import response from '../response';

const prisma = new PrismaClient();

class Post {
    async get(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const page  = parseInt(req.query.page as string);
            const limit  = parseInt(req.query.limit as string);
            const perPage = limit ? limit : 5;
            const totalRows = await prisma.post.count();
            const totalPages = Math.ceil(totalRows / perPage);
            
            if (page) {
                const post = await prisma.post.findMany({
                    take: perPage,
                    skip: (page - 1) * perPage,
                })
                response(200, "OK", res, post, page, totalRows, totalPages, perPage)
            } else {
                const post = await prisma.post.findMany({
                    take: perPage
                })
                response(200, "OK", res, post, 1, totalRows, totalPages, perPage)
            }
            
        } catch (error) {
            next(error)
        }
    }
}

export default Post