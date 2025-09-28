import express from 'express'
import route1 from './routes/routes.js'
const app = express();
// let a=0;
// app.get('/abcep',(req,res)=>{
//     a++;
//    console.log("req came here ",a);
//    res.status(200).json({message:"ok , done re "})
// })
app.use('/route1',route1);
app.listen(3001,()=>{
    console.log("Serfer tarted");
})