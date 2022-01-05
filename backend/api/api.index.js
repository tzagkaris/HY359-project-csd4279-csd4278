/**
 * Combines all the routers into one and returns it
 */
 

const apiRouter = require('express').Router(); 

const rt = [
    require('./open/open.router').routerBundle, // open routes -- no authentication required
]

rt.forEach(r => {
    apiRouter.use(r.prefix, r.router);
})


module.exports = { apiRouter }