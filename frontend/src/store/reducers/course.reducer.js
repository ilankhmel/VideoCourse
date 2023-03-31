const INITIAL_STATE = {
    courses: null,
}

export function courseReducer(state = INITIAL_STATE, action){
     switch (action.type) {
        case 'SET_COURSES':
            return {
                ...state,
                courses: action.courses
            }
        case 'UPDATE_VIDEO_TIMESTAMP':
            return {
                ...state,
                courses: [...action.courses]
            }
        case 'SET_LAST_CHAPTER':
            return {
                ...state,
                courses: [...action.courses]
            }
     
        default:
            return state
     }
}