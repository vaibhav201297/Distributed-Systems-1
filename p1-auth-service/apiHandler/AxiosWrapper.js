const axios = require('axios');

module.exports = (baseURL) => {
  return axios.create({
    baseURL: baseURL,
  });
}

// const axios = require('axios');

// class AxiosWrapper {

//     // =======================================================
//     /* Parameters - 
//     1. URL */

//     constructor(baseURL) {
//         this.instance = axios.create({
//             baseURL: baseURL
//         });
//     }

//     // =======================================================
//     /* Parameters - 
//     1. url - GET API URL

//     @returns Promise
//     */
//     async get(url) {
//         try {
//             let response = await this.instance.get(url)
//             let responseBody = response.data

//             return responseBody
//         }
//         catch(response) {
//             // BASIC ERROR HANDLING
//             response = response.response
//             if (response.status != 200) {
//                 switch (response.status) {
//                     case 401:
//                         throw { "status": response.status, "statusText": `${response.statusText} : Couldn't authenticate you`}
//                     case 404:
//                         throw { "status": response.status, "statusText": `${response.statusText} : Ticket not found`}
//                     case 400:
//                         throw { "status": response.status, "statusText": `${response.statusText} : Invalid Ticket Id`}
//                     default:
//                         throw { "status": 500, "statusText": `${response.statusText}`}
//                 }
//             }
//         }
//     }

//     // =======================================================
//     /* Parameters - 
//     1. url - POST API URL
//     2. body - POST REQUEST BODY

//     @returns Promise
//     */
//     async post(url,body) {
//         try {
//             let response = await this.instance.post(url,body)
//             let responseBody = response.data

//             return responseBody
//         }
//         catch(response) {
//             // BASIC ERROR HANDLING
//             response = response.response
//             if (response.status != 200) {
//                 switch (response.status) {
//                     case 401:
//                         throw { "status": response.status, "statusText": `${response.statusText} : Couldn't authenticate you`}
//                     case 404:
//                         throw { "status": response.status, "statusText": `${response.statusText} : Ticket not found`}
//                     case 400:
//                         throw { "status": response.status, "statusText": `${response.statusText} : Invalid Ticket Id`}
//                     default:
//                         throw { "status": 500, "statusText": `${response.statusText}`}
//                 }
//             }
//         }
//     }
    
//     // =======================================================
// }

// module.exports = AxiosWrapper