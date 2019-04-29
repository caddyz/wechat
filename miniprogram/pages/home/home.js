// pages/home/home.js
var constant = require("../../util/constant.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    indicatorActiveColor: "#fff",
    discoverList: [],
    list: [],
    //是否有数据
    is_empty: false,
    //当前页面
    currentPage: 1,
    //总页数
    page_total: 0,
    //是否显示 底部loading
    showLoading: true,
    //防止重复加载
    preventRepeatReuqest: false,
    //广告列表
    adList: [],
    tps: 0,
    is_show_alert: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.adListOnQuery();
    this.discoverListOnQuery();
    this.listOnQuery(0);
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.currentPage += 1
    this.listOnQuery((this.data.currentPage-1)*10);
    console.log("num的值：" + this.data.currentPage)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 查询数据
   */
  adListOnQuery: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('carousel').get().then(res => {
      this.setData({
        adList: res.data
      })
    }).catch(err => {
      wx.showToast({
        icon: 'none',
        title: '查询记录失败'
      })
    })
  },
  discoverListOnQuery: function () {
    const db = wx.cloud.database()
    db.collection('discover').get().then(res => {
      this.setData({
        discoverList: res.data
      })
    }).catch(err => {
      wx.showToast({
        icon: 'none',
        title: '查询记录失败'
      })
    })
  },
  listOnQuery: function (num) {
    let that = this   
    const db = wx.cloud.database()
    db.collection('goods').skip(num).limit(10).get().then(res => {
      let arrList = []
      if(res.data.length > 0){
        arrList = that.data.list.concat(res.data)
        this.setData({
          list: arrList
        })
      }else{
        arrList = that.data.list.concat(res.data)
        this.setData({
          list: arrList,
          showLoading: false
        })
      }
      console.log('[数据库] [查询记录] 成功: ', res)
    }).catch(err => {
      wx.showToast({
        icon: 'none',
        title: '查询记录失败'
      })
      console.log('[数据库] [查询记录] 成功: ', err)
    })
  },
  goGoodsAll: function (e) {
    console.log("id:"+e.currentTarget.dataset.sku);
    wx.setStorageSync("kind", e.currentTarget.dataset.sku)
    wx.switchTab({
      url: '/pages/classify/classify',
    })
  }
  // onAdd: function () {
      // db.collection('discover').where({
    //   // _openid: getApp().globalData.openid
    // }).get({
    //   success: res => {
    //     console.log(res.data)
    //     this.setData({
    //       adList: res.data
    //     })
    //     console.log('[数据库] [查询记录] 成功: ', res)
    //   },
    //   fail: err => {
    //     wx.showToast({
    //       icon: 'none',
    //       title: '查询记录失败'
    //     })
    //     console.error('[数据库] [查询记录] 失败：', err)
    //   }
    // })
  //   const db = wx.cloud.database()
  //   db.collection('discover').add({
  //     data: {
  //       count: 1
  //     },
  //     success: res => {
  //       // 在返回结果中会包含新创建的记录的 _id
  //       this.setData({
  //         counterId: res._id,
  //         count: 1
  //       })
  //       wx.showToast({
  //         title: '新增记录成功',
  //       })
  //       console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
  //     },
  //     fail: err => {
  //       wx.showToast({
  //         icon: 'none',
  //         title: '新增记录失败'
  //       })
  //       console.error('[数据库] [新增记录] 失败：', err)
  //     }
  //   })
  // },
})