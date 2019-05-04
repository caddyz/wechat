// pages/skip/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    list: [],
    showLoading: true,
    input_value: '',
    is_empty: true,
    keywordhisList: [],
    currentPage: 1,
    showHis: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onQueryHistory()
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
    this.data.currentPage += 1
    this.listOnQuery((this.data.currentPage - 1) * 10);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goBack: function () {
    wx.navigateBack({
      delta: 1
    })
  },
  searchInput: function (e) {
    this.setData({
      input_value: e.detail.value
    })
  },
  delText: function(){
    this.setData({
      input_value: ""
    })
  },
  search: function(){
    this.onDimQuery(0)
  },
  onDimQuery: function(num){
    const db = wx.cloud.database()
    db.collection('goods').where({
      name: db.RegExp({
        regexp: '.*'+this.data.input_value,
        options: 'i', 
      })
    }).skip(num).limit(10).get().then(res => {
      let arrList = []
      if (res.data.length > 0) {
        arrList = this.data.list.concat(res.data)
        this.setData({
          is_empty: true,
          list: arrList
        })
      } else {
        arrList = this.data.list
        this.setData({
          list: arrList,
          showLoading: false
        })
      }
      if(num === 0){
        if(!(this.data.list.length > 0)){
          this.setData({
            is_empty: false,
          })
        }
      }
      this.onAddHistory()
    }).catch(err => {
      wx.showToast({
        icon: 'none',
        title: '查询记录失败'
      })
    })
  },
  onAddHistory: function(){
    const db = wx.cloud.database()
    db.collection('history').add({
      data: {
        searchRecord: this.data.input_value
      }
    }).then(res => {
      console.log("成功添加搜索记录")
    })
  },
  onQueryHistory: function(){
    const db = wx.cloud.database()
    db.collection('history').where({
      _openid: getApp().globalData.openid
    }).get().then(res => {
      this.setData({
        keywordhisList: res.data
      })
    }).catch(err => {
      wx.showToast({
        icon: 'none',
        title: '获取历史记录失败',
      })
    })
  },
  clearHis: function(){
    wx.cloud.callFunction({
      name: 'hisRemove',
      data: {
        openid: getApp().globalData.openid
      }
    }).then(res => {
      console.log("删除成功")
      this.setData({
        keywordhisList: []
      })
    }).catch(err => {
      wx.showToast({
        icon: 'none',
        title: '清除历史记录失败',
      })
    })
  },
  selHisKeyWord: function(e) {
    console.log(e.currentTarget.dataset.id)
    this.setData({
      input_value: e.currentTarget.dataset.id
    })
  }
})