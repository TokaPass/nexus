import { type Context, Hono, type Next } from 'hono';
import { cors } from 'hono/cors';
import AuthRoute from './src/controllers/auth.controller';
import UsersRoute from './src/controllers/user.controller';
import LoginsRoute from './src/controllers/logins.controller';
import PreferencesRoute from './src/controllers/preferences.controller';

const app = new Hono();

app.use('*', async (ctx: Context, next: Next): Promise<void | Response> => {
    return await cors({
        origin: 'http://localhost:3000',
        credentials: true
    })(ctx, next);
});

app.onError((err, ctx: Context) => {
    ctx.status(500);

    return ctx.json({
        success: false,
        message: err.message,
        data: null,
    });
});

app.route('/auth', AuthRoute);
app.route('/users', UsersRoute);
app.route('/logins', LoginsRoute);
app.route('/preferences', PreferencesRoute);

console.log("Server is up and running!")

export default {
    port: 3169,
    fetch: app.fetch
};