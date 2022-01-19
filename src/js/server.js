const DbHandler = require('./TicketManager');
const SimpleFileWriter = require('./SimpleFileWriter');

const http = require('http');
const Koa = require('koa');
const cors = require('@koa/cors');
const koaBody = require('koa-body');
const Router = require('koa-router');


const app = new Koa();
const router = new Router();
const writer = new SimpleFileWriter();

const db = new DbHandler;

router.get('/', async (ctx, next) => {
    const query = ctx.request.query;
    console.log(query)
    switch (query.method) {
        case 'allTickets':
            let content = await db.getTaskList();
            ctx.response.body = content;
            ctx.response.status = 200;
            return;

        case 'ticketById':
            ctx.response.body = await db.getTaskById(query.id);
            return;

        default:
            ctx.response.status = 404;
            return;
    }
});

let contentToSave = null;

router.post('/', koaBody({multipart: true}),

    async (ctx, next) => {

        const query = ctx.request.query;
        const body = ctx.request.body;
        console.log(query)
        switch (query.method) {
            case 'createTicket':
                let content = await db.createTask(body);
                ctx.response.body = content;
                ctx.response.status = 200;
                await writer.write(JSON.stringify(content));
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
