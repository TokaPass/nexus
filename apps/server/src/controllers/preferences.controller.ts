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

app.get("/get", async (ctx: Context): Promise<Response> => {
    const token = getCookie(ctx, "token")
    if (token) {
        const { id } = await verify(token, `${process.env.JWT_SECRET}`);
        const settings = await prisma.user.findUniqueOrThrow({ where: { id: `${id}` }, select: { settings: true } });
        return ctx.json({ data: settings });
    }

    return ctx.json({ data: "asd" })
})

app.post("/set", async (ctx: Context): Promise<Response> => {
    const token = getCookie(ctx, "token")
    if (token) {
        const { id } = await verify(token, `${process.env.JWT_SECRET}`);
        const { settings } = await ctx.req.json();
        await prisma.user.update({ where: { id: `${id}` }, data: { settings: { update: settings } } });
        return ctx.json({ data: "success" });
    }

    return ctx.json({ data: "asd" })
})

export default app;