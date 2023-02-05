import { Response } from 'express';

interface Data {
    code: number,
    status: string,
    data: any,
    page: number,
    total: number,
    totalPages: number,
    perPage: number
}

const response = (res: Response, data: Data): void => {
    res.status(data.code).json({
        page: data.page,
        per_page: data.perPage,
        total: data.total,
        total_pages: data.totalPages,
        code: data.code,
        status: data.status,
        data: data.data,
    })
}

export default response;