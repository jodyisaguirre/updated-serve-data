const express = require ('express')
const app = express()
const students = require ('./cohorts.js')
let port = 3000

app.get ('/', (req,res) =>{
  res.send('Soft as cake 🍰 ')
})

app.get ('/students',(req,res) =>{
  res.json({students})
})

app.get ('/students/:id',(req,res, next) =>{
  const id = req.params.id
  const student = students.filter(student =>{
    return student.id == id
})
    if (!student.length){
      next()
    }

  res.json({student: student[0]})
})



app.use(notFound)
app.use(errorHandler)




function notFound(req, res, next) {
  res.status(404).send({error: 'You Done Messed Up A-Aron', status: 404, url: req.originalUrl})
}

// eslint-disable-next-line
function errorHandler(err, req, res, next) {
  console.error('ERROR', err)
  const stack =  process.env.NODE_ENV !== 'production' ? err.stack : undefined
  res.status(500).send({error: err.message, stack, url: req.originalUrl})
}


app.listen(port, () => console.log("Sever running on port 3000"))
