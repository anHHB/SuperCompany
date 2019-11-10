
//index.js
//获取应用实例
const app = getApp()

Page({
  markers: [{
    iconPath: "/resources/others.png",
    id: 0,
    latitude: 118.84,
    longitude: 31.954520,
    width: 50,
    height: 50
  }],
  
  /**
   * 查询 marker 信息
   */
  queryMarkerInfo: function () {
    var that = this;
    consoleUtil.log('查询当前坐标 marker 点信息')
    //调用请求 marker 点的接口就好了
  },

  /**
   * 创建marker
   */
  createMarker: function (dataList) {
    var that = this;
    var currentMarker = [];
    var markerList = dataList.data;
    for (var key in markerList) {
      var marker = markerList[key];
      marker.id = marker.info_id;
      marker.latitude = marker.lat;
      marker.longitude = marker.lng;
      marker.width = 40;
      marker.height = 40;
      if (marker.image) {
        marker.iconPath = 'https://pic3.zhimg.com/80/v2-ccfdc90c69dce8e0227960b45aa53c02_hd.jpg';
      } else {
        marker.iconPath = 'https://pic3.zhimg.com/80/v2-ccfdc90c69dce8e0227960b45aa53c02_hd.jpg';
      }
    }
    currentMarker = currentMarker.concat(markerList);
    consoleUtil.log('-----------------------');
    consoleUtil.log(currentMarker);
    that.setData({
      markers: currentMarker
    })
  },

  data: {
    longitude: 116.4965075,
    latitude: 40.006103,
    speed: 0,
    accuracy: 0
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {
    var that = this
    wx.showLoading({
      title: "定位中",
      mask: true
    })
    wx.getLocation({
      type: 'gcj02',
      altitude: true,//高精度定位
      //定位成功，更新定位结果
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy

        that.setData({
          longitude: longitude,
          latitude: latitude,
          speed: speed,
          accuracy: accuracy
        })
      },
      //定位失败回调
      fail: function () {
        wx.showToast({
          title: "定位失败",
          icon: "none"
        })
      },

      complete: function () {
        //隐藏定位中信息进度
        wx.hideLoading()
      }

    })
  },
})