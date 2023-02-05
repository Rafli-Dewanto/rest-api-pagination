import { Response } from 'express';

const response = (code: number, status: String, res: Response, data: any, page: number, total: number, totalPages: number, perPage: number): void => {
    res.status(code).json({
        page,
        per_page: perPage,
        total,
        total_pages: totalPages,
        code,
        status,
        data,
    })
}

export default response;