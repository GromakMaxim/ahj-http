const DbHandler = require('./DbHandler');
const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
//const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const db = new DbHandler;

router.get('/', async (ctx, next) => {
    const query = ctx.request.query;
    switch (query.method) {
        case 'allTickets':
            await db.getAllTickets()
                .then(
                    result => ctx.response.body = result,
                );
            return;

        case 'ticketById':
            ctx.response.body = await db.getTaskById(query.id);
            return;

        default:
            ctx.response.status = 404;
            return;
    }
});

router.post('/', koaBody({multipart: true}),
    async (ctx, next) => {
        console.log(ctx.request.querystring);
        console.log(ctx.request.body);
        switch ('123') {
            case 'createTicket':

                return;
            case 'deleteTicket':
                return;
        }
    });

app
    .use(router.routes())
    .use(router.allowedMethods());

http.createServer(app.callback()).listen(8888);
