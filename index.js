const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');
const faker = require('faker');
const genID = require('./genID');

const app = new Koa();

app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type'],
  })
);
app.use(koaBody({ urlencoded: true, multipart: true }));

const notes = [
  {
    content: faker.lorem.sentence(),
    timestamp: Date.now(),
    id: genID(),
  },
  {
    content: faker.lorem.sentence(),
    timestamp: Date.now(),
    id: genID(),
  },
];

const router = new Router();

router.get('/notes', async (ctx, next) => {
  ctx.response.body = notes;
});

router.post('/notes', async (ctx, next) => {
  notes.push({
    ...ctx.request.body,
    timestamp: Date.now(),
    id: genID(),
  });
  ctx.response.status = 204;
});

router.delete('/notes/:id', async (ctx, next) => {
  const noteId = ctx.params.id;
  const index = notes.findIndex((o) => o.id === noteId);
  if (index !== -1) {
    notes.splice(index, 1);
  }
  ctx.response.status = 204;
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7777;
const server = http.createServer(app.callback());
server.listen(port, () => console.log(`server started on port ${port}`));
