const http = require('./utils/http')

class Lancher {
  constructor(){
    this.port = 3002
    this._host = {}
    this.init_nrop19()
  }

  async init_nrop19(){
    let body = await http.get('https://www.ebay.com/usr/91dizhi_1')

    let url = body.match(/[=]{6}([^=])+[=]{6}/)[0].match(/[\w]+\.[\w]+\.[\w]+/)[0]

    if( url.indexOf('http') == -1){
      url = 'http://' + url + '/'
    }

    let flag = true

    while(flag){
      let resp = await http.header(url,{followRedirect:false})
      if(!resp ) break;
      if( resp.headers ){
        if(resp.headers.location ){
          url = resp.headers.location
        }else{
          if( resp.body && resp.body.indexOf('<META HTTP-EQUIV=Refresh')>=0){
            url = resp.body.match(/http:\/\/[^'"]+/)[0]
          }else{
            flag = false
          }
        }
      }else{
        flag = false
      }

      console.log('Find Url : ' + url)

    }

    console.log('Hit Url : ' + url)

    if(!/\/$/.test(url)) url += '/'

    this._host.nrop19 = url

    // http.header('http://91dizhi.space/',{followRedirect:false}).then((resp)=>{
    //   this._host.nrop19 = resp.headers.location

    //   console.log('GET URL : '+this.host.nrop19)
    // })

    

  }

  host(p){
    return this._host[p]
  }  
}

module.exports = new Lancher()