App({
  globalData: {
    userLocation: null,
    selectedFoodTypes: [],
    userInfo: {
      nickname: '美食爱好者',
      postCount: 0,
      favoriteCount: 0,
      likeCount: 0
    },
    myPosts: [],
    myFavorites: [],
    myLikes: [],
    myComments: []
  },

  onLaunch() {
    this.getUserLocation();
    this.loadUserData();
  },

  getUserLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.globalData.userLocation = {
          latitude: res.latitude,
          longitude: res.longitude
        };
      },
      fail: () => {
        console.log('获取位置失败');
      }
    });
  },

  loadUserData() {
    const storedData = wx.getStorageSync('userData');
    if (storedData) {
      this.globalData.userInfo = storedData.userInfo || this.globalData.userInfo;
      this.globalData.myPosts = storedData.myPosts || [];
      this.globalData.myFavorites = storedData.myFavorites || [];
      this.globalData.myLikes = storedData.myLikes || [];
      this.globalData.myComments = storedData.myComments || [];
    }
  },

  saveUserData() {
    wx.setStorageSync('userData', {
      userInfo: this.globalData.userInfo,
      myPosts: this.globalData.myPosts,
      myFavorites: this.globalData.myFavorites,
      myLikes: this.globalData.myLikes,
      myComments: this.globalData.myComments
    });
  }
});
