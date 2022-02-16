const config={
    production :{
        SECRET: process.env.SECRET,
        SESSION_SECRET: process.env.SESSION_SECRET,
        APP: {
            HOST: process.env.APP_HOST,
            PORT: process.env.APP_PORT
        },
        ROUTE_URLS: {
            profileService: process.env.PROFILE_SERV_URL,
        },
        GOOGLE_AUTH: {
            CLIENT_ID: process.env.CLIENT_ID,
            CLIENT_SECRET: process.env.CLIENT_SECRET,
            CALLBACK_URL: process.env.CALLBACK_URL
        },
        UI_URL: process.env.UI_URL,
    },
    default : {
        SECRET: 'mysecretkey',
        SESSION_SECRET: "mysessionsecretkey",
        APP: {
            HOST: "127.0.0.1",
            PORT: 5000
        },
        ROUTE_URLS: {
            profileService: "http://localhost:4000",
        },
        GOOGLE_AUTH: {
            CLIENT_ID: '48103289009-oknu38aj35ncq20joqkvv3mbcfrgkk3n.apps.googleusercontent.com',
            CLIENT_SECRET: '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',
            CALLBACK_URL: 'http://localhost:5000/auth/google/callback'
        },
        UI_URL: "http://localhost:4200/",
    }
}


exports.get = function get(env){
    return config[env] || config.default
}