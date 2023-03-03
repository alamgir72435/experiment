import nats, { Stan } from "node-nats-streaming"

class Nats {
  private _client?:Stan;

  connect(clusterId:string,clientId:string, url:string ){
    this._client = nats.connect(clusterId,clientId,{ url });
    return new Promise((resolve, reject) => {
      this._client!.on('connect', () => {
        console.log(`Connected NATS With: ${clientId}`)
      });
      this._client!.on('error', err => {
        reject(err)
      });
    })
  }

  publish(subject:string, data:any){
    return new Promise((resolve, reject) => {
      this._client!.publish(subject, JSON.stringify(data), (err) => {
        if (err) {
          reject(err)
        } else {
          console.log('Event Published for subject: ' + subject)
          resolve({})
        }
      })
    })
  }

}

 const nat = new Nats();
 export { nat }