const service = require('./../models/y66t')
const base = require('../utils/base')
const request = require('request')
const channals = require('../channals')
const cats = [
  
]

const channal = 'y66t'

module.exports = {

  async list(ctx) {
    let result = {
      status: 0,
      data: null,
    }

    let { page = 1 , cat = ''} = ctx.query


    if (page < 1) page = 1

    let data = await service.list(page , cat)

    result.data = data

    result.count = data.length

    ctx.body = result

  },

  async listPage(ctx){
    let { page = 1 , cat = ''} = ctx.query


    if (page < 1) page = 1

    let data = await service.list(page , cat)

    await ctx.render('index',{
      data , page:parseInt(page) , cat , cats , channal , channals
    })
  },

  async detail(ctx){
    let result = {
      status: 0,
      data: null,
    }
    let {id} = ctx.params
    let data = await service.detail(id)
    result.data = data
    ctx.body = result

  },

  async detailPage(ctx){
    let {id} = ctx.params
    let proxy = ctx.query.p
    let data = await service.detail(id)

    if(proxy) data.url = '/api/nrop19/play/' + base.base64_encode(data.url)
    await ctx.render('detail',{
      data
    })

  },

  async play(ctx){
    let url = base.base64_decode(ctx.params.id)
    ctx.body = ctx.req.pipe(request(url))

  }
}