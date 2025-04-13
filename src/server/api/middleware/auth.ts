import {createMiddleware} from 'hono/factory'
import {auth} from '@/auth'

export const authMiddleware=createMiddleware(async(c,next)=>{
  const session=await auth.api.getSession({headers:c.req.raw.headers})

  if(!session) return c.json({message:'Unauthorized'},401)

  c.set('sesion',session)

  await next()
})

export const adminMiddleware=createMiddleware(async(c,next)=>{
  const session=await auth.api.getSession({headers:c.req.raw.headers})

  if(!session || session.user.role!=='admin') return c.json({message:'Unauthorized'},401)

  c.set('sesion',session)

  await next()
})
