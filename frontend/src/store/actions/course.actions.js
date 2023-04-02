import { courseService } from "../../services/course.service";
import { storageService } from "../../services/storage.service";

export function loadCourses(){

    return async (dispatch) => {
        try{
            const courses = await courseService.getCourses()
            const fullCoursesPromises = courses.map(async course => {
                const fullCourse = await courseService.getFullCourse(course?.id)
                return fullCourse
            })
            const fullCourses = await Promise.all(fullCoursesPromises)
            dispatch({type: 'SET_COURSES', courses: [...fullCourses]})

            storageService.saveToStorage('courses', fullCourses)

        }catch(err){
            console.log(err);
        }
    }
}
export function setCourses(){

    return async (dispatch, getState) => {
        try{
            const courses = storageService.loadFromStorage('courses')
            dispatch({type: 'SET_COURSES', courses})

        }catch(err){
            console.log(err);
        }
    }
}

export function setTimestamp(courseId, chapterId, timeStamp){

    return async (dispatch, getState) => {
        try{
            const courses = getState().courseModule.courses
            const course = courses.find(course => course.id == courseId)
            let chapter = course.chapters.find(chapter=> chapter.id == chapterId)
            chapter.timeStamp = timeStamp
            if(chapter.asset.resource.duration == timeStamp) chapter.timeStamp = 0
            if(timeStamp >= 10) chapter.completed = true

            function _checkIfCompletedCourse(){
                return course.chapters.every(chapter => chapter.completed === true)
            }

            if(_checkIfCompletedCourse()){
                course.completed = true
            }

            dispatch({type: 'UPDATE_VIDEO_TIMESTAMP', courses})

            storageService.saveToStorage('courses', courses)

        }catch(err){
            console.log(err);
        }
    }
}

export function setLastPlayingChapter(courseId, chapterIdx){
    return async (dispatch, getState) => {
        try{
            const courses = getState().courseModule.courses
            const course = courses.find(course => course.id == courseId)
            course.lastPlayingChapter = chapterIdx
            dispatch({type: 'SET_LAST_CHAPTER', courses})
            storageService.saveToStorage('courses', courses)
        }catch(err){
            console.log(err);
        }
    }
}
