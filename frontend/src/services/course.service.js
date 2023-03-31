import axios from "axios"

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:8800/api/'
    
export const courseService = {
    getCourses,
    getFullCourse,
}

async function getCourses(){
    const courses = await axios.get(`${BASE_URL}course`)
    return courses.data.result
}

async function getFullCourse(courseId){
    const fullCourse = await axios.get(`${BASE_URL}course/${courseId}`)
    return fullCourse.data
}