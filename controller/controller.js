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
        //delete the least oldest used key from redis if there are more than 10 key
        const noOfKeys = await client.dbSize();
        console.log("No of keys ", noOfKeys);
        if(noOfKeys > 3){
            let cursor = '0';
            do{
              const [nextCursor, batch] = await client.scan(cursor);
              console.log("cursor ",nextCursor);
              console.log("batch ", batch);
              cursor = nextCursor;
            }while(cursor !=='0');
            //delete the oldest one key
           
        }

    }
}