const path = require('path')
const express = require('express')

const app = express();
const publicDir = path.join(__dirname, './public')

app.set('view engine', 'hbs')
app.use(express.static(publicDir))
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())

app.get("/", (req, res) => {
    res.render("index")
})

app.post('/', (req, res) => {
    let { mass, height } = req.body
    height = height * 0.01
    const bmi = mass/(height * height)
    
    let answer = ""
    if(bmi < 18.5) {  answer = "underweight"}
    else if(bmi < 24.9) {  answer = "normal"}
    else if(bmi < 29.9) {  answer = "overweight"}
    else if(bmi < 34.9) {  answer = "obese"}
    else { answer = "extremely obese"}

    return res.render("index", {
        bmi: bmi,
        answer: answer,
    })
})

app.listen(3000, ()=>{
    console.log('server started on port 3000')
})

