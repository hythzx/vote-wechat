// pages/vote/vote.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    vote: {},
    id: null,
    voted: true
  },

  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);
    for (var i = 0; i < this.data.vote.voteItemList.length; i++) {
      let voteItem = this.data.vote.voteItemList[i];
      if (e.detail.value == voteItem.id) {
        voteItem.checked = true;
      } else {
        voteItem.checked = false;
      }
    }
    this.setData({
      vote: this.data.vote
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    this.loadVote();
  },

  submitVote: function () {
    const me = this;
    let id = null;
    for (var i = 0; i < this.data.vote.voteItemList.length; i++) {
      let voteItem = this.data.vote.voteItemList[i];
      if (voteItem.checked) {
        id = voteItem.id;
      }
    }
    if (id == null) {
      wx.showToast({

      });
      console.log('没有选择任何值');
    } else {
      wx.showLoading({
        title: '数据提交中..'
      });
      wx.request({
        url: app.globalData.requestUrl + 'votes?login=' + app.globalData.userInfo.nickName + '&voteItemId=' + id,
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          wx.hideLoading();
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          });
          me.loadVote();
        }
      })
    }
  },

  loadVote: function () {
    const me = this;
    wx.request({
      url: app.globalData.requestUrl + 'votes/' + me.data.id + '?login=' + app.globalData.userInfo.nickName,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
       
        if (res.data.votedItemId) {
          for (var i = 0; i < res.data.voteItemList.length; i++) {
            let voteItem = res.data.voteItemList[i];
            if (res.data.votedItemId == voteItem.id) {
              voteItem.checked = true;
            }
          }
        }
        me.setData({
          vote: res.data,
          voted: res.data.voted
        });
      }
    })
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