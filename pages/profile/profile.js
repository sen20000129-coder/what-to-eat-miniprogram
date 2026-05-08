const app = getApp();

Page({
  data: {
    nickname: '美食爱好者',
    avatarUrl: '',
    postCount: 0,
    favoriteCount: 0,
    likeCount: 0
  },

  onShow() {
    this.loadUserStats();
  },

  loadUserStats() {
    const userInfo = app.globalData.userInfo;
    const myPosts = app.globalData.myPosts;
    const myFavorites = app.globalData.myFavorites;
    const myLikes = app.globalData.myLikes;

    this.setData({
      nickname: userInfo.nickname,
      avatarUrl: userInfo.avatarUrl || '',
      postCount: myPosts.length,
      favoriteCount: myFavorites.length,
      likeCount: myLikes.length
    });
  },

  onChooseAvatar(e) {
    const avatarUrl = e.detail.avatarUrl;
    app.globalData.userInfo.avatarUrl = avatarUrl;
    app.saveUserData();
    this.setData({ avatarUrl });
  },

  onMyPosts() {
    const myPosts = app.globalData.myPosts;
    if (myPosts.length === 0) {
      wx.showToast({
        title: '您还没有发布过内容',
        icon: 'none'
      });
      return;
    }
    
    this.setData({
      activeTab: 'posts',
      showContentList: true,
      contentList: myPosts
    });
  },

  onMyFavorites() {
    const myFavorites = app.globalData.myFavorites;
    if (myFavorites.length === 0) {
      wx.showToast({
        title: '您还没有收藏内容',
        icon: 'none'
      });
      return;
    }
    
    this.setData({
      activeTab: 'favorites',
      showContentList: true,
      contentList: myFavorites
    });
  },

  onMyLikes() {
    const myLikes = app.globalData.myLikes;
    if (myLikes.length === 0) {
      wx.showToast({
        title: '您还没有点赞内容',
        icon: 'none'
      });
      return;
    }
    
    this.setData({
      activeTab: 'likes',
      showContentList: true,
      contentList: myLikes
    });
  },

  onBackToList() {
    this.setData({
      showContentList: false,
      contentList: []
    });
  },

  onContentTap(e) {
    const postId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/post-detail/post-detail?id=${postId}`
    });
  },

  onRemoveFavorite(e) {
    const postId = e.currentTarget.dataset.id;
    const myFavorites = app.globalData.myFavorites;
    const newFavorites = myFavorites.filter(p => p.id !== postId);
    app.globalData.myFavorites = newFavorites;
    app.globalData.userInfo.favoriteCount = Math.max(0, app.globalData.userInfo.favoriteCount - 1);
    app.saveUserData();
    
    this.setData({
      contentList: newFavorites,
      favoriteCount: app.globalData.userInfo.favoriteCount
    });
    
    if (newFavorites.length === 0) {
      wx.showToast({
        title: '收藏已清空',
        icon: 'none',
        success: () => {
          setTimeout(() => {
            this.setData({ showContentList: false });
          }, 1000);
        }
      });
    }
  },

  onEditNickname() {
    wx.showModal({
      title: '修改昵称',
      editable: true,
      placeholderText: '请输入新昵称',
      success: (res) => {
        if (res.confirm && res.content.trim()) {
          const newNickname = res.content.trim();
          if (newNickname.length < 2 || newNickname.length > 20) {
            wx.showToast({
              title: '昵称长度应为2-20字',
              icon: 'none'
            });
            return;
          }
          
          app.globalData.userInfo.nickname = newNickname;
          app.saveUserData();
          
          this.setData({ nickname: newNickname });
          
          wx.showToast({
            title: '修改成功',
            icon: 'success'
          });
        }
      }
    });
  },

  onSettings() {
    wx.showActionSheet({
      itemList: ['消息通知', '隐私设置', '清除缓存'],
      success: (res) => {
        switch(res.tapIndex) {
          case 0:
            wx.showModal({
              title: '消息通知',
              content: '消息通知功能开发中',
              showCancel: false
            });
            break;
          case 1:
            wx.showModal({
              title: '隐私设置',
              content: '隐私设置功能开发中',
              showCancel: false
            });
            break;
          case 2:
            wx.showModal({
              title: '清除缓存',
              content: '确定要清除所有缓存数据吗？',
              success: (res) => {
                if (res.confirm) {
                  wx.clearStorageSync();
                  app.globalData.userInfo = {
                    nickname: '美食爱好者',
                    postCount: 0,
                    favoriteCount: 0,
                    likeCount: 0
                  };
                  app.globalData.myPosts = [];
                  app.globalData.myFavorites = [];
                  app.globalData.myLikes = [];
                  
                  this.setData({
                    nickname: '美食爱好者',
                    postCount: 0,
                    favoriteCount: 0,
                    likeCount: 0
                  });
                  
                  wx.showToast({
                    title: '清除成功',
                    icon: 'success'
                  });
                }
              }
            });
            break;
        }
      }
    });
  },

  onAbout() {
    wx.showModal({
      title: '关于我们',
      content: '今天吃什么 v1.0.0\n\n帮助您解决"今天吃什么"的难题\n\n随机抽取美食，告别选择困难症！',
      showCancel: false
    });
  }
});