import React, { useEffect, useState } from 'react'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import DoneIcon from '@mui/icons-material/Done';
import { setLastPlayingChapter } from '../store/actions/course.actions';
import { useDispatch } from 'react-redux';

export default function ListItem({ chapter, idx, setCurrChapter, currChapter, play, pause, isPlaying, setIsPlaying, courseId, playerRef, course }) {

    const [duration, setDuration] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        const duration = secondsToTime(chapter.asset.resource.duration)
        setDuration(duration)
    }, [chapter])

    useEffect(() => {
        if (isPlaying && currChapter === chapter) {
            play()
        } else if (!isPlaying && currChapter === chapter) {
            pause()
        }
    }, [isPlaying])

    useEffect(() => {
        if (currChapter === chapter) {
            setLastChapter()
            play()
        }
    }, [currChapter])


    const setLastChapter = () => {
        dispatch(setLastPlayingChapter(courseId, idx))
    }

    function secondsToTime(secs) {
        var divisor_for_minutes = secs % (60 * 60);
        var minutes = Math.floor(divisor_for_minutes / 60);

        var divisor_for_seconds = divisor_for_minutes % 60;
        var seconds = Math.ceil(divisor_for_seconds);

        if (seconds === 60) {
            minutes += 1
            seconds = 0
        }

        var obj = {
            "m": minutes,
            "s": seconds
        };

        const getString = (obj) => {

            let str = ''
            if (obj.m.toString().length === 1) {
                str += '0' + obj.m + ':'
            } else {
                str += obj.m + ':'
            }

            if (obj.s.toString().length === 1) {
                str += '0' + obj.s
            } else {
                str += obj.s
            }

            return str
        }
        return getString(obj)
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
