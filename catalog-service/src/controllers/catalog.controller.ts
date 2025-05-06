import express, {Request,Response} from 'express';
import Video from '../model/video.model';

export const createVideo = async(req:Request,res:Response) => {

    try {
        const video = await Video.create(req.body)
        res.status(201).json(video)
    } catch (error) {
        res.status(400).json({message: 'Error creating video', error: error});
    }
}

export const getVideos = async (_: Request, res: Response) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos', error: error });
    }
};