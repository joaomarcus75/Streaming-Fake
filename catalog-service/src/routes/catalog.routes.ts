import { Router } from "express";
import {createVideo, getVideos } from '../controllers/catalog.controller';

const router = Router();

router.post('/', createVideo);
router.get('/', getVideos);

export default router;