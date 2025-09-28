import { createClient } from "redis";
const client = createClient();

client.on('error',(err)=>{
  console.log("Error in redis client ",err);
})

await client.connect();
export default client;