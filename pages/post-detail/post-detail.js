const communityData = require('../../utils/communityData.js');

Page({
  data: {
    post: null,
    commentContent: '',
    isLoading: true
  },

  onLoad(options) {
    const postId = parseInt(options.id);
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

    const commentData = {
      author: '我',
      content: content
    };

    const newComment = communityData.addComment(this.data.post.id, commentData);
    
    if (newComment) {
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
