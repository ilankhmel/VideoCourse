const router = require("express").Router()
const axios = require("axios")

//Get all courses

router.get('/', async (req,res)=>{
    try{
        const courses = await axios.get('https://interviews.bigvu.tv/course/list',{auth: {
            username: 'bigvu',
            password: 'interview'
          }})
          res.status(200).send(courses.data)
    }catch(err){
        console.log(err);
        res.status(400).send(err)
    }
})

//Get full course (with chapters)

router.get('/:id', async (req,res)=>{
    
    try{
        const course = await axios.get(`https://interviews.bigvu.tv/course/${req.params.id}`,{auth: {
            username: 'bigvu',
            password: 'interview'
          }})
          res.status(200).send(course.data)
    }catch(err){
        console.log(err);
        res.status(400).send(err)
    }
})

module.exports = router