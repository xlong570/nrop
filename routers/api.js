/*
 * api 路由
 */
const router = require('koa-router')()

const nrop19 = require('../controllers/nrop19')
const y66t = require('../controllers/y66t')

const routers = router//.prefix('/api')
    // .post('/signin', user.signin)
    // .post('/signup', user.signup)

    .get('/nrop19/list' , nrop19.list)
    .get('/nrop19/:id' , nrop19.detail)
    .get('/nrop19/play/:id' , nrop19.play)

    .get('/y66t/list' , y66t.list)
    .get('/y66t/:id' , y66t.detail)
    .get('/y66t/play/:id' , y66t.play)
    
module.exports = routers
