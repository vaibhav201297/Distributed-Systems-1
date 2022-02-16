const config={
    production :{
        SECRET: process.env.SECRET,
        APP: {
            HOST: process.env.APP_HOST,
            PORT: process.env.APP_PORT
        },
        ROUTE_URLS: {
            authService: process.env.AUTH_SERV_URL,
            profileService: process.env.PROFILE_SERV_URL,
            radarService: process.env.RADAR_SERV_URL,
            userHistoryService: process.env.SESSION_SERV_URL
        },
        UI_URL: process.env.UI_URL,
    },
    default : {
        SECRET: 'mysecretkey',
        APP: {
            HOST: "127.0.0.1",
            PORT: 7777
        },
        ROUTE_URLS: {
            authService: "http://localhost:5000",
            profileService: "http://localhost:4000",
            radarService: "http://localhost:8000",
            userHistoryService: "http://localhost:10000"
        },
        UI_URL: "http://localhost:4200/",
    }
}


exports.get = function get(env){
    return config[env] || config.default
}