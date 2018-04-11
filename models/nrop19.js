
const http = require('../utils/http')
const base = require('../utils/base')
const cache = require('../utils/cache')
const config = require('../config')
const data = {
  async list(page , cate){
    let host = config.host('nrop19')
    let resp = await http.get(host+'v.php?page='+page+'&category='+cate)
    let data = []
    resp.replace(/viewkey=([0-9a-z]+)[^<]+?\s*<img\s+src="([^"]+?)"[\w\W]+?title="([^"]+?)"/g , ($0 , $1, $2, $3)=>{
      data.push({
        viewkey : $1 , 
        thumb : $2.replace(/http:/,'https:') ,
        img : $2.replace(/http:/,'https:').replace(/\d+_/,''),
        title : $3
      })
      return ''
    })
    return data
  },

  async detail(viewkey){
    if(cache[viewkey]){
      return cache[viewkey]
    }

    let host = config.host('nrop19')

    let resp = await http.get(host+'view_video.php?viewkey='+viewkey , {fake:true})

    let url = (resp.match(/source\s*src\s*=\s*"([^"]+)/) || ['',''])[1]

    let img = (resp.match(/poster\s*=\s*"([^"]+)/) || ['',''])[1]

    let title =(resp.match(/viewvideo-title">([^<]+)/) || ['',''])[1].replace(/[\r\n\s]/g,'')  

    cache.set(viewkey , { title , url, img})

    return { title , url, img}
  },


}

module.exports = data