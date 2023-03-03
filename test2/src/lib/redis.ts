import { createClient, RedisClientType } from 'redis';


class Redis{

  _client: RedisClientType | any = null;

  constructor(){
    console.log('running Redis')
  }

  connect(uri: string){
    // connect with redis
    const client = createClient({ socket:{ host:uri , port:6379 }});

    

    client.connect().then(() => {
      this._client = client;
      console.log(`Redis Connected to ${uri}`)
    }).catch(err => {
      console.log(err)
    })
    
  }

  set(){
    this._client.SET('test', 'data')
  }



}

const redis = new Redis();
export { redis }