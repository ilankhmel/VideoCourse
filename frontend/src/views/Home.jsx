import React from 'react'
import CourseCard from '../cmps/CourseCard';

export default function Home({courses}) {

    return (
        <div className='home'>
            <div className="page-header">
                <h1>BIGVU 101 Crash Course</h1>
                <p>Zero editing experience to pro - your journey starts here.</p>
                <p>Watch step-by-step video lessons on how to make videos with impact.</p>
            </div>
            <div className="courses">
                {courses?.map((c,idx) => (
                    <CourseCard key={c.id} course={c} idx={idx} />
                ))}
            </div>
        </div>
    )
}
