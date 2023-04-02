import React, { useEffect, useState } from 'react'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import DoneIcon from '@mui/icons-material/Done';
import { setLastPlayingChapter } from '../store/actions/course.actions';
import { useDispatch } from 'react-redux';
import { utilService } from '../services/util.service';

export default function ListItem({ chapter, idx, setCurrChapter, currChapter, play, pause, isPlaying, setIsPlaying, courseId, playerRef, course }) {

    const [duration, setDuration] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        const duration = utilService.secondsToTime(chapter.asset.resource.duration)
        setDuration(duration)
    }, [chapter])

    useEffect(() => {
        //If current chapter is this chapter, play if isPlaying is true, and pause if false.
       
        if (currChapter === chapter) {    
            isPlaying ? play() : pause()
        } 

    }, [isPlaying])

    useEffect(() => {

        //On currChapter change, if current chapter is this chapter, 
        //set the currect "lastPlayingChapter" property on the course object, and auto-play the chapter using play().
        if (currChapter === chapter) {
            setLastChapter()
            play()
        }
    }, [currChapter])


    const setLastChapter = () => {
        dispatch(setLastPlayingChapter(courseId, idx))
    }

    const handleClick = () => {
        if (currChapter !== chapter) {
            pause()
            setCurrChapter(chapter)
        } else {
            setIsPlaying(!isPlaying)
        }
    }




    return (
        <div className={chapter === currChapter ? 'list-item selected' : 'list-item'} onClick={()=>setCurrChapter(chapter)} >
            <div className='left-side'>
                <div className='play-btn' onClick={handleClick}>  
                    {chapter.completed == true ? <DoneIcon className='done-icon' /> : ""}
                    {<span className={chapter.completed ? 'play-pause hidden' : 'play-pause'}>{isPlaying && chapter == currChapter ? <PauseCircleOutlineIcon /> : <PlayCircleOutlineIcon />}</span> }
                </div>
                <div className='item-number'>{idx + 1}.</div>
                <p>{chapter.title}</p>
            </div>
            <p>{duration}</p>
        </div>
    )
}
