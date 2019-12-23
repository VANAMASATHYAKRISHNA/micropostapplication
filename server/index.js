const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const app=express();
app.use(bodyparser.json());
app.use(cors());
const port=process.env.PORT || 5000;
const posts=require('./routes/api/posts');
app.use('/api/posts',posts);
//handle production
if(process.env.NODE_ENV=== 'production'){
    //static folder
    app.use(express.static(__dirname+'/public/'));
    //Handle single page application
    app.get(/.*/,(req,res)=>{
        res.sendFile(__dirname+'/public/index.html')
    });
}
app.listen(port,()=>console.log('Server started at 5000'));