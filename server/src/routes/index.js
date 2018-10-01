import { Router } from 'express';
import blogsRouter from './blogs';
import authorsRouter from "./authors";
import tagsRouter from "./tags";
import authRouter from './auth';
import usersRouter from './users';
import { isLoggedIn, tokenMiddleware } from '../middleware/auth.mw';

let router = Router();

router.use('/auth', authRouter);

router.route('*')
    .post(tokenMiddleware, isLoggedIn)
    .put(tokenMiddleware, isLoggedIn)
    .delete(tokenMiddleware, isLoggedIn);

router.use('/blogs', blogsRouter);
router.use('/authors', authorsRouter);
router.use('/tags', tagsRouter);
router.use('/users', usersRouter);

export default router;