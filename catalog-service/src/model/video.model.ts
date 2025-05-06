import mongoose from 'mongoose'

const videoSchema = new mongoose.Schema({
    title: {type: String, require: true},
    description: String,
    duration: Number,
    url: String,
}, {timestamps:true});

const Video = mongoose.model('Video', videoSchema);

export default Video;