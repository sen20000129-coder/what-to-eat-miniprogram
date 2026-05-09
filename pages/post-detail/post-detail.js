const app = getApp();
const communityData = require('../../utils/communityData.js');

Page({
  data: {
    post: null,
    commentContent: '',
    isLoading: true,
    userInfo: null
  },

  onLoad(options) {
    const postId = parseInt(options.id);
    const userInfo = app.globalData.userInfo;
    this.setData({ userInfo });
    
    if (postId) {
      this.loadPostDetail(postId);
    } else {
      wx.showToast({
        title: '帖子不存在',
        icon: 'none',
        success: () => {
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      });
    }
  },

  onShow() {
    if (this.data.post) {
      this.refreshPost();
    }
  },

  refreshPost() {
    const postId = this.data.post.id;
    const post = communityData.getPostById(postId);
    if (post) {
      this.setData({ post });
    }
  },

  // 加载帖子详情
  loadPostDetail(postId) {
    this.setData({ isLoading: true });
    
    const post = communityData.getPostById(postId);
    
    if (post) {
      this.setData({
        post,
        isLoading: false
      });
    } else {
      wx.showToast({
        title: '帖子不存在',
        icon: 'none',
        success: () => {
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        }
      });
    }
  },

  // 点赞
  onLike() {
    if (!this.data.post) return;
    
    const postId = this.data.post.id;
    const isLiked = communityData.toggleLike(postId);
    
    if (isLiked !== null) {
      this.setData({
        'post.isLiked': isLiked,
        'post.likes': this.data.post.likes + (isLiked ? 1 : -1)
      });
      
      if (isLiked) {
        const post = this.data.post;
        const existingIndex = app.globalData.myLikes.findIndex(p => p.id === postId);
        if (existingIndex === -1) {
          app.globalData.myLikes.unshift(post);
          app.globalData.userInfo.likeCount++;
        }
      } else {
        app.globalData.myLikes = app.globalData.myLikes.filter(p => p.id !== postId);
        app.globalData.userInfo.likeCount = Math.max(0, app.globalData.userInfo.likeCount - 1);
      }
      app.saveUserData();
    }
  },

  onFavorite() {
    if (!this.data.post) return;
    
    const postId = this.data.post.id;
    const isFavorited = communityData.toggleFavorite(postId);
    
    if (isFavorited !== null) {
      this.setData({
        'post.isFavorited': isFavorited,
        'post.favorites': this.data.post.favorites + (isFavorited ? 1 : -1)
      });
      
      if (isFavorited) {
        const post = this.data.post;
        const existingIndex = app.globalData.myFavorites.findIndex(p => p.id === postId);
        if (existingIndex === -1) {
          app.globalData.myFavorites.unshift(post);
          app.globalData.userInfo.favoriteCount++;
        }
      } else {
        app.globalData.myFavorites = app.globalData.myFavorites.filter(p => p.id !== postId);
        app.globalData.userInfo.favoriteCount = Math.max(0, app.globalData.userInfo.favoriteCount - 1);
      }
      app.saveUserData();
    }
  },

  // 评论输入
  onCommentInput(e) {
    this.setData({ commentContent: e.detail.value });
  },

  // 提交评论
  onSubmitComment() {
    const content = this.data.commentContent.trim();
    
    if (!content) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      });
      return;
    }

    if (content.length < 2) {
      wx.showToast({
        title: '评论至少2个字',
        icon: 'none'
      });
      return;
    }

    const userInfo = app.globalData.userInfo;
    const commentData = {
      author: userInfo.nickname || '我',
      authorAvatar: userInfo.avatarUrl || '',
      content: content
    };

    const newComment = communityData.addComment(this.data.post.id, commentData);
    
    if (newComment) {
      app.globalData.myComments.unshift({
        ...newComment,
        postId: this.data.post.id,
        postTitle: this.data.post.title
      });
      app.saveUserData();
      
      this.setData({
        'post.comments': [...this.data.post.comments, newComment],
        commentContent: ''
      });
      
      wx.showToast({
        title: '评论成功',
        icon: 'success'
      });
    }
  },

  onDeleteComment(e) {
    const commentId = e.currentTarget.dataset.id;
    const postId = this.data.post.id;
    
    wx.showModal({
      title: '删除评论',
      content: '确定要删除这条评论吗？',
      success: (res) => {
        if (res.confirm) {
          const result = communityData.deleteComment(postId, commentId);
          if (result) {
            this.setData({
              'post.comments': this.data.post.comments.filter(c => c.id !== commentId)
            });
            
            app.globalData.myComments = app.globalData.myComments.filter(
              c => !(c.postId === postId && c.id === commentId)
            );
            app.saveUserData();
            
            wx.showToast({
              title: '已删除',
              icon: 'success'
            });
          }
        }
      }
    });
  },

  // 预览图片
  onPreviewImage(e) {
    const { url, urls } = e.currentTarget.dataset;
    wx.previewImage({
      current: url,
      urls: urls
    });
  },

  // 返回
  onBack() {
    wx.navigateBack();
  },

  // 分享
  onShareAppMessage() {
    if (this.data.post) {
      return {
        title: this.data.post.title,
        path: `/pages/post-detail/post-detail?id=${this.data.post.id}`,
        imageUrl: this.data.post.images[0] || ''
      };
    }
    return {
      title: '美食社区',
      path: '/pages/community/community'
    };
  },

  // 复制位置信息
  onCopyLocation() {
    if (this.data.post && this.data.post.location) {
      const location = this.data.post.location;
      const text = `${location.city}${location.district || ''}${location.address || ''}`;
      
      wx.setClipboardData({
        data: text,
        success: () => {
          wx.showToast({
            title: '位置已复制',
            icon: 'success'
          });
        }
      });
    }
  }
});
