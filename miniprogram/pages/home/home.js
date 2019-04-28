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
    purchasetype: 1,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})