// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    showLoading: true,
    currentPage: 1,
    kind: "0",
    show:false
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
    let k = wx.getStorageSync("kind");
    if (k !== "") {
      this.data.kind = k + "";
      this.data.list = [];
      this.data.currentPage = 1
      console.log("kind的值：" + this.data.kind);
      wx.removeStorageSync("kind"); 
    }
    // this.data.kind = "0";
    this.data.list = [];
    this.data.currentPage = 1
    this.listOnQuery(this.data.kind, 0);
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
    this.listOnQuery(this.data.kind,(this.data.currentPage - 1) * 10);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  /**
   * 通过判断来拉取数据
   */
  listOnQuery: function (kind,num) {
    const db = wx.cloud.database()
    if(kind === "0"){
      db.collection('goods').skip(num).limit(10).get().then(res => {
        let arrList = []
        if (res.data.length > 0) {
          arrList = this.data.list.concat(res.data)
          this.setData({
            list: arrList
          })
        } else {
          arrList = this.data.list.concat(res.data)
          this.setData({
            list: arrList,
            showLoading: false
          })
        }
      }).catch(err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      })
    }else{
      db.collection('goods').where({
        sku: parseInt(kind)
      }).skip(num).limit(10).get().then(res => {
        let arrList = []
        if (res.data.length > 0) {
          arrList = this.data.list.concat(res.data)
          this.setData({
            list: arrList
          })
        } else {
          arrList = this.data.list.concat(res.data)
          this.setData({
            list: arrList,
            showLoading: false
          })
        }
      }).catch(err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.log("失败原因：", err)
      })
    } 
  },
  /**
   * 根据种类查询数据
   */
  onQueryByKind: function (kind){
    let that = this
    this.setData({
      kind:kind,
      list:[],
      currentPage:1
    })
    const db = wx.cloud.database()
    db.collection('goods').where({
      sku: kind
    }).limit(10).get().then(res => {
      let arrList = []
      if (res.data.length > 0) {
        arrList = that.data.list.concat(res.data)
        this.setData({
          list: arrList
        })
      } else {
        arrList = that.data.list.concat(res.data)
        this.setData({
          list: arrList,
          showLoading: false
        })
      }
    }).catch(err => {
      wx.showToast({
        icon: 'none',
        title: '查询记录失败'
      })
    })
  },

  filterSearch: function () {
    this.setData({
      show: !this.data.show
    })
  },
  close: function(){
    this.setData({
      show: false
    })
  },
  selSKU: function(e){
    let sku = e.currentTarget.dataset.sku;
    switch (sku) {
      case "0":
        this.setData({
          list: [],
          kind: "0",
          currentPage: 1
        })
        this.onShow();
        break;
      case "1":
        this.onQueryByKind(1);
        break;
      case "2":
        this.onQueryByKind(2);
        break;
      case "3":
        this.onQueryByKind(3);
        break;
      case "4":
        this.onQueryByKind(4);
        break;
    }
    this.filterSearch();
  },
})