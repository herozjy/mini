//index.js

Page({
  data: {
    testImage_API_C: "",
    testImage_API_B: "",
    testImage_API_A: ""
  },
  onLoad: function () {
    var that = this;
    //在详请中勾选  不检验合法的域名、web-view、HTTPS证书
    var secret = "你的secret";
    var appid = "你的appid"
    //小程序的appid 和 密钥
    var url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
    // 1、第一步获取access_token
    wx.request({
      url: url,
      success(res) {
        var access_token = res.data.access_token;
        // 2、获取小程序分享页面的二维码 
        var url_C = `https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=${access_token}`;
        var url_B = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${access_token}`;
        var url_A = `https://api.weixin.qq.com/wxa/getwxacode?access_token=${access_token}`;
        // 调用接口C
        wx.request({

          url: url_C,
          success(res) {
            console.log(res)
            //2.1 把buffer的数据转换成base64
            let base64 = wx.arrayBufferToBase64(res.data);
            that.setData({
              testImage_API_C: 'data:image/jpg;base64,' + base64
            })
          },
          method: "POST",
          data: {
            "path": "pages/index/index?abcd=12345", //扫描进入的页面及传参
            "access_token": access_token
          },
          responseType: 'arraybuffer', //重点 返回类型为二进制组数
          headers: {
            'Content-Type': 'application/json'
          },
        })
        // 调用接口B
        wx.request({
          url: url_B,
          success(res) {
            console.log(res)
            //2.1 把buffer的数据转换成base64
            let base64 = wx.arrayBufferToBase64(res.data);
            that.setData({
              testImage_API_B: 'data:image/jpg;base64,' + base64
            })
          },
          method: "POST",
          data: {
            "scene": 'a=1',
            // "access_token": access_token
          },
          responseType: 'arraybuffer', //重点 返回类型为二进制组数
          headers: {
            'Content-Type': 'application/json'
          },
        })
        //调用接口A
        wx.request({
          url: url_A,
          success(res) {
            console.log(res)
            //2.1 把buffer的数据转换成base64
            let base64 = wx.arrayBufferToBase64(res.data);
            that.setData({
              testImage_API_A: 'data:image/jpg;base64,' + base64
            })
          },
          method: "POST",
          data: {
            "path": 'pages/index/index',

            // "access_token": access_token    //传入该参数会有问题
          },
          responseType: 'arraybuffer', //重点 返回类型为二进制组数
          headers: {
            'Content-Type': 'application/json'
          },
        })
      },
      fail() {}
    })

  }
})