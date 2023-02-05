import { Router } from "express";
import Post from '../controller/post.controller'

const router = Router()
const postController = new Post()

router.route('/')
    .get(postController.get)


export default router;