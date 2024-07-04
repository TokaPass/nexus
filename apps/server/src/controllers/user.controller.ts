import { type Context, Hono, type Next } from 'hono';
import { jwt } from 'hono/jwt';
import { verify } from 'hono/utils/jwt/jwt';
import prisma from "../lib/prisma"
import { type TBindings } from '../types/index';
import { getCookie } from 'hono/cookie';

const app = new Hono<{ Bindings: TBindings }>();

app.use('*', async (ctx: Context, next: Next): Promise<void | Response> => {
    return (
        await jwt({
            cookie: 'token',
            secret: `${process.env.JWT_SECRET}`,
        })
    )(ctx, next);
});

/** GET /users/:id */
app.get('/find/:id', async (ctx: Context): Promise<Response> => {
    const id = ctx.req.param('id');
    const user = await prisma.user.findFirstOrThrow({ where: { id }, select: { id: true, username: true } });

    return ctx.json({ data: user });
});

app.get("/me", async (ctx: Context): Promise<Response> => {
    const token = getCookie(ctx, "token")
    if (token) {
        const { id } = await verify(token, `${process.env.JWT_SECRET}`);
        const user = await prisma.user.findUniqueOrThrow({ where: { id: `${id}` }, select: { id: true, username: true } });
        return ctx.json({ data: user });
    }

    return ctx.json({ data: "asd" })
})

export default app;