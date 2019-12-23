const express=require('express');
const mongodb=require('mongodb');
const router=express.Router();
//Get posts
router.get('/',async(req,res)=>
{
    //res.send("HEEE");
    try{
    const post=await loadpostcollection();
  //  res.send("CONNECTED");
    res.send(await post.find().toArray()); 
    }
    catch(err)
    {
        res.status(401).json(err);
    }
})
router.post('/',async (req,res)=>{
    const posts=await loadpostcollection();
   const ans= await posts.insertOne({
        text:req.body.text,
        createdAt:new Date()
        });
    res.status(201).send(ans);
}
);
router.delete('/:id',async(req,res)=>{
    try{
    const posts=await loadpostcollection();
    const ans=await posts.deleteOne({_id:new mongodb.ObjectID(req.params.id)});
     res.send(ans);
    }
    catch(err)
    {
        res.send(err);
    }

})

async function loadpostcollection()
{
    const client = await mongodb.MongoClient.connect('mongodb+srv://azam-ahmed:ifteqari880@cluster0-9affu.mongodb.net/test',{
        useNewUrlParser:true
    });
    return client.db('vue_express').collection('posts');
}







module.exports=router;