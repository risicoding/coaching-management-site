import { honoError } from '@/lib/hono-error';
import { paymentQueries } from '@/server/db/queries/payments';
import { paymentInsertSchema } from '@/server/db/schemas';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', async (c) => {
  try {
    const res = await paymentQueries.getAll();
    return c.json(res);
  } catch (err) {
    console.error(err);
    return honoError('INTERNAL_SERVER_ERROR',c,err)
  }
});

app.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const res = await paymentQueries.getById(id);

    if (!res ) {
      return honoError('NOT_FOUND',c)
    }

    return c.json(res);
  } catch (err) {
    console.error(err);
    return honoError('INTERNAL_SERVER_ERROR',c,err)
  }
});

app.post('/', zValidator('json', paymentInsertSchema), async (c) => {
  try {
    const data = c.req.valid('json');
    const res = await paymentQueries.create(data);
    return c.json(res);
  } catch (err) {
    console.error(err);
    return honoError('INTERNAL_SERVER_ERROR',c,err)
  }
});

app.get('/subject/:subjectId', async (c) => {
  try {
    const subjectId = c.req.param('subjectId');
    const res = await paymentQueries.getBySubjectId(subjectId);

    if (!res || res.length === 0) {
  
      return honoError('NOT_FOUND',c)
    }

    return c.json(res);
  } catch (err) {
    return honoError('INTERNAL_SERVER_ERROR',c,err)
  }
});

app.get('/user/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const res = await paymentQueries.getByUserId(userId);

    if (!res || res.length === 0) {
      return honoError('NOT_FOUND',c)
    }

    return c.json(res);
  } catch (err) {
    return honoError('INTERNAL_SERVER_ERROR',c,err)
  }
});

app.get('/user/:userId/subject/:subjectId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const subjectId = c.req.param('subjectId');
    const res = await paymentQueries.getByUserAndSubjectId(userId, subjectId);

    if (!res || res.length === 0) {
      return honoError('NOT_FOUND',c)
    }

    return c.json(res);
  } catch (err) {
    return honoError('INTERNAL_SERVER_ERROR',c,err)
  }
});

app.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const res = await paymentQueries.deleteById(id);

    if (!res || res.length === 0) {
      return honoError('NOT_FOUND',c)
    }

    return c.json(res[0]);
  } catch (err) {
    return honoError('INTERNAL_SERVER_ERROR',c,err)
  }
});

export { app as paymentsRouter };

