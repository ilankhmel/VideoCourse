import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom'

import './App.css';
import { storageService } from './services/storage.service';
import { loadCourses, setCourses } from './store/actions/course.actions';
import CoursePage from './views/CoursePage';
import Home from './views/Home';

function App() {

  const dispatch = useDispatch()
  const courses = useSelector(state => state.courseModule.courses)

  useEffect(() => {
      const courses = storageService.loadFromStorage('courses')
      if (!courses) {
          dispatch(loadCourses())
      }else{
          dispatch(setCourses(courses))
      }
  }, [])

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home courses={courses} />}></Route>
        <Route path='/:id' element={<CoursePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
