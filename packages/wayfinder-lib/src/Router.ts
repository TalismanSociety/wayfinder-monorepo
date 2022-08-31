import { query, QueryParams } from 'wayfinder-datasource'

class Router{  

  fetchChannels(params: QueryParams){
    const channels = query(params)
   
    return channels
  }
}

const router = new Router()


export default router