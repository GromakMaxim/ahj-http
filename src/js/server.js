const DbHandler = require('./TicketManager');
const http = require('http');
const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const db = new DbHandler;

router.get('/', async (ctx, next) => {
    const query = ctx.request.query;
    console.log(query)
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

        const query = ctx.request.query;
        const body = ctx.request.body;
        console.log(query)
        console.log(body)
        switch (query.method) {
            case 'createTicket':
                if (body.shortDescription !== null && body.shortDescription !== undefined &&
                    body.description !== null && body.description !== undefined &&
                    body.creationDate !== null && body.creationDate !== undefined &&
                    body.status !== null && body.status !== undefined
                ) {
                    const saved = await db.createTask(body);
                }
                return;
            case 'deleteTicket':
                const deleted = await db.deleteTask(body);
                return;
        }
    });


app
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

const port = process.env.PORT || 8888;
const server = http.createServer(app.callback()).listen(port)
