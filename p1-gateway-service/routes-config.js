require('dotenv').config();
const path = require('path')
var config = require(path.join(__dirname,'./config.js')).get(process.env.NODE_ENV);
const authService = config.ROUTE_URLS.authService;

const ROUTES = [
    {
        url: '/auth/google',
        auth: false,
        proxy: {
            target: authService,
            changeOrigin: true,
            pathRewrite: {
                [`^/auth/google`]: '/auth/google',
            },
        }
    },
    {
        url: '/login',
        auth: false,
        proxy: {
            target: authService,
            changeOrigin: true,
            pathRewrite: {
                [`^/login`]: '/login',
            },
        }
    },
    {
        url: '/logout',
        auth: false,
        proxy: {
            target: authService,
            changeOrigin: true,
            pathRewrite: {
                [`^/logout`]: '/logout',
            },
        }
    },
    {
        url: '/register',
        auth: false,
        proxy: {
            target: authService,
            changeOrigin: true,
            pathRewrite: {
                [`^/register`]: '/register',
            },
        }
    },
    {
        url: '/verifyToken',
        auth: false,
        proxy: {
            target: authService,
            changeOrigin: true,
            pathRewrite: {
                [`^/verifyToken`]: '/verifyToken',
            },
        }
    },
]

exports.ROUTES = ROUTES;