import { auth } from '@/auth'
import {Hono} from 'hono'

const app=new Hono().basePath('/api')

app.on(['GET','POST'],'/api/auth/*',(c)=>{
  return auth.handler(c.req.raw)
})

export {app}
