import client from '../lib/redis.js'

export const ProvideData = async (req,res)=>{
    try{
        const {id} = req.params;
        const key = `user${id}`;
       const redisData = await client.get(key);
       if(redisData) return res.status(200).json({user:JSON.parse(redisData)});

     const resp = await fetch(`https://testapi.devtoolsdaily.com/users/${id}`);
     const data = await resp.json();
     await client.set(key,JSON.stringify(data));
     return res.status(200).json({ user: data})
    }
    catch(err){
      console.log("data bringing error ",err);
      return res.status(400).json({message:"Another server erro9r"});
    }
    finally{
        console.log("in finally ")
        const {keys} = await client.scan("0");
        console.log(keys.length);

        if(keys.length >10){

           console.log("inside length")

        const idleTimes = await Promise.all(
            keys.map(async key =>({key, idle: await client.sendCommand(["OBJECT","IDLETIME",key])}))
        )

        console.log("dieal log ",idleTimes);

        const keydelete = idleTimes.reduce((prev,curr)=>(curr.idle < prev.idle ? prev : curr));

        console.log(keydelete.key);

        await client.del(keydelete.key) //oldest key is deleted 
     }
    }
}