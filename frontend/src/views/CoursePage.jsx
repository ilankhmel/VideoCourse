import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ListItem from '../cmps/ListItem'
import { courseService } from '../services/course.service'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { setTimestamp } from '../store/actions/course.actions'

export default function CoursePage() {

    const courses = useSelector(state => state.courseModule.courses)

    const params = useParams()
    const dispatch = useDispatch()
    const playerRef = useRef()

    const [course, setCourse] = useState(null)
    const [currChapter, setCurrChapter] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [id, setId] = useState(null)

    useEffect(() => {
        setId(params?.id)

    }, [params?.id])

    useEffect(() => {
        if (id) {
            if (courses) {
                const course = courses.find(course => course.id === id)
                setCourse(course)
            } else {
                getCourse(id)
            }
        }
    }, [id])

    useEffect(() => {
            if (courses) {
                const course = courses.find(course => course.id === id)
                setCourse(course)
            } 
    }, [courses])

    useEffect(() => {
        setCurrChapter(course?.chapters[course.lastPlayingChapter || 0])
    }, [course])

    useEffect(() => {
        if(currChapter?.timeStamp && playerRef.current){
            playerRef.current.currentTime = currChapter?.timeStamp || 0
            
        }
    }, [currChapter])

    useEffect(() => {
        if(playerRef?.current?.currentTime === currChapter?.asset?.resource?.duration){
            setCurrChapter(course?.chapters[course.lastPlayingChapter+1])
        }
    }, [playerRef?.current?.currentTime])

    const getCourse = async (id) => {
        const course = await courseService.getFullCourse(id)
        setCourse(course)
    }

    const getCompletedCount = () => {
        let count = 0
        course?.chapters?.forEach(c => (
            c.completed ? count ++ : ''
        ))
        return count
    }

    const play = () => {
        playerRef.current.play()
    }
    const pause = () => {
        const timeStamp = playerRef?.current?.currentTime
        dispatch(setTimestamp(id, currChapter?.id, timeStamp))
        playerRef.current.pause()
    }


    return (
        <div className='course-page'>
            <div className="video-container">
                <video onPlaying={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} controls muted id='player' src={currChapter?.asset?.resource?.stream?.url} ref={playerRef}>
                </video>
            </div>

            <div className="list-container">
                <div className="list-top">
                    <h2 className='course-title'>{course?.headline}</h2>
                    <div className="chapters-complete">
                        <WorkspacePremiumIcon />
                        <span>{`${getCompletedCount()}/${course?.chapters?.length}`}</span>
                    </div>
                </div>
                <div className="chapter-list">
                    {course?.chapters.map((chapter, idx) => (
                        <ListItem key={chapter?.id} chapter={chapter} idx={idx} setCurrChapter={setCurrChapter} currChapter={currChapter} play={play} pause={pause} isPlaying={isPlaying} setIsPlaying={setIsPlaying} courseId={id} playerRef={playerRef} course={course}/>
                    ))}
                </div>
            </div>
        </div>

    )
}
