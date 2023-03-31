import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import vector from '../assets/imgs/Vector.svg'
import VideocamIcon from '@mui/icons-material/Videocam';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DoneIcon from '@mui/icons-material/Done';

export default function CourseCard({ course, idx }) {

    const navigate = useNavigate()

    const blueColors = ['#28B3F7', '#506AFF']
    const greenColors = ['#00EA3B', '#00D096']
    const orangeColors = ['#F79F28', '#FF5350']


    const [colors, setColors] = useState([])


    useEffect(()=>{
        switch (idx) {
            case 0:
                setColors(blueColors)
                break;
            case 1:
                setColors(greenColors)
                break;
            case 2:
                setColors(orangeColors)
                break;
            default:
                break;
        }
    },[idx])

    const vectorColorOrange = {filter: 'hue-rotate(140deg)'}
    const vectorColorGreen = {filter: 'hue-rotate(-75deg)'}
    const textStyle = {background: `-webkit-linear-gradient(${colors[0]}, ${colors[1]})`, "WebkitBackgroundClip": "text", "WebkitTextFillColor": "transparent"}
    const textStyleGreen = {background: "-webkit-linear-gradient(#00EA3B, #00D396)", "WebkitBackgroundClip": "text", "WebkitTextFillColor": "transparent"}
    const textStyleOrange = {background: "-webkit-linear-gradient(#F79F28, #FF5350)", "WebkitBackgroundClip": "text", "WebkitTextFillColor": "transparent"}
    
    return (
        //style={idx===1 ? vectorColorGreen : idx === 2 ? vectorColorOrange : {}}
        <div className='course-section'>
            <h1 className='course-title' style={{color: colors[0]}}>{course?.headline}</h1>
            <div className="card" >
                <img className='vector' src={require(`../assets/imgs/Vector${idx}.png`)} alt="" />
                <div className='videos-btn' >
                    <VideocamIcon style={{color: 'white'}}/> 
                    <span>{course?.chapters?.length} videos</span>
                </div>
                {course.completed && <div className="completed"><DoneIcon className='tick'/>Completed</div>}
                <div className="card-bottom">
                    <div>
                        <h2 className='card-desc'>{course?.description}</h2>
                        <ul className="points">
                            {course?.summary?.slice(0,4).map(s => (
                                <li className='card-point' key={s}><span style={{color: colors[0]}} >●</span>  &nbsp; {s}</li>
                            ))}
                        </ul>
                    </div>

                    <div className='go-btn' onClick={()=>navigate(`/${course?.id}`)}>
                        <ArrowForwardIosIcon/>
                    </div>
                </div>
            </div>
        </div>
    )
}
