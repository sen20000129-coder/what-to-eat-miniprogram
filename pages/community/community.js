const app = getApp();
const communityData = require('../../utils/communityData.js');

Page({
  data: {
    posts: [],
    filteredPosts: [],
    cities: [],
    hotTags: [],
    selectedCity: null,
    selectedTag: null,
    searchKeyword: '',
    isLoading: false,
    hasMore: true,
    pageSize: 10,
    currentPage: 1
  },

  onLoad() {
    this.loadPosts();
    this.loadCities();
    this.loadHotTags();
  },

  onShow() {
    // 刷新帖子列表
    this.loadPosts();
  },

  // 加载帖子列表
  loadPosts() {
    this.setData({ isLoading: true });
    
    let posts = communityData.getAllPosts();
    
    const myPosts = app.globalData.myPosts || [];
    if (myPosts.length > 0) {
      posts = [...myPosts, ...posts];
    }

    if (this.data.selectedCity) {
      posts = posts.filter(post => 
        post.location && post.location.city === this.data.selectedCity
      );
    } else if (this.data.selectedTag) {
      posts = posts.filter(post => 
        post.tags && post.tags.includes(this.data.selectedTag)
      );
    }

    if (this.data.searchKeyword) {
      const keyword = this.data.searchKeyword.toLowerCase();
      posts = posts.filter(post => 
        (post.title && post.title.toLowerCase().includes(keyword)) ||
        (post.content && post.content.toLowerCase().includes(keyword)) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(keyword)))
      );
    }

    this.setData({
      posts: posts,
      filteredPosts: posts.slice(0, this.data.pageSize),
      isLoading: false,
      hasMore: posts.length > this.data.pageSize
    });
  },

  // 加载城市列表
  loadCities() {
    const cities = communityData.getAllCities();
    this.setData({ cities });
  },

  // 加载热门标签
  loadHotTags() {
    const hotTags = communityData.getHotTags();
    this.setData({ hotTags });
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({
      searchKeyword: e.detail.value,
      selectedCity: null,
      selectedTag: null,
      currentPage: 1
    });
    this.loadPosts();
  },

  // 清除搜索
  onClearSearch() {
    this.setData({
      searchKeyword: '',
      currentPage: 1
    });
    this.loadPosts();
  },

  // 选择城市
  onSelectCity(e) {
    const city = e.currentTarget.dataset.city;
    this.setData({
      selectedCity: this.data.selectedCity === city ? null : city,
      selectedTag: null,
      currentPage: 1
    });
    this.loadPosts();
  },

  // 选择标签
  onSelectTag(e) {
    const tag = e.currentTarget.dataset.tag;
    this.setData({
      selectedTag: this.data.selectedTag === tag ? null : tag,
      selectedCity: null,
      currentPage: 1
    });
    this.loadPosts();
  },

  // 点赞
  onLike(e) {
    const postId = e.currentTarget.dataset.id;
    const isLiked = communityData.toggleLike(postId);
    
    if (isLiked !== null) {
      const posts = this.data.posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked,
            likes: post.likes + (isLiked ? 1 : -1)
          };
        }
        return post;
      });
      
      this.setData({ posts });
      
      const filteredPosts = this.data.filteredPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked,
            likes: post.likes + (isLiked ? 1 : -1)
          };
        }
        return post;
      });
      
      this.setData({ filteredPosts });
      
      if (isLiked) {
        const post = posts.find(p => p.id === postId);
        if (post) {
          const existingIndex = app.globalData.myLikes.findIndex(p => p.id === postId);
          if (existingIndex === -1) {
            app.globalData.myLikes.unshift(post);
            app.globalData.userInfo.likeCount++;
            app.saveUserData();
          }
        }
      } else {
        app.globalData.myLikes = app.globalData.myLikes.filter(p => p.id !== postId);
        app.globalData.userInfo.likeCount = Math.max(0, app.globalData.userInfo.likeCount - 1);
        app.saveUserData();
      }
    }
  },

  // 收藏
  onFavorite(e) {
    const postId = e.currentTarget.dataset.id;
    const isFavorited = communityData.toggleFavorite(postId);
    
    if (isFavorited !== null) {
      const posts = this.data.posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isFavorited,
            favorites: post.favorites + (isFavorited ? 1 : -1)
          };
        }
        return post;
      });
      
      this.setData({ posts });
      
      const filteredPosts = this.data.filteredPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            isFavorited,
            favorites: post.favorites + (isFavorited ? 1 : -1)
          };
        }
        return post;
      });
      
      this.setData({ filteredPosts });
      
      const currentPost = posts.find(p => p.id === postId);
      if (currentPost.isFavorited) {
        const existingIndex = app.globalData.myFavorites.findIndex(p => p.id === postId);
        if (existingIndex === -1) {
          app.globalData.myFavorites.unshift(currentPost);
          app.globalData.userInfo.favoriteCount++;
          app.saveUserData();
        }
      } else {
        app.globalData.myFavorites = app.globalData.myFavorites.filter(p => p.id !== postId);
        app.globalData.userInfo.favoriteCount = Math.max(0, app.globalData.userInfo.favoriteCount - 1);
        app.saveUserData();
      }
    }
  },

  // 评论
  onComment(e) {
    const postId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/post-detail/post-detail?id=${postId}`
    });
  },

  // 分享
  onShare(e) {
    const postId = e.currentTarget.dataset.id;
    const post = this.data.posts.find(p => p.id === postId);
    if (!post) return;
    
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    
    wx.showToast({
      title: '请点击右上角分享',
      icon: 'none'
    });
  },

  // 进入帖子详情
  onPostTap(e) {
    const postId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/post-detail/post-detail?id=${postId}`
    });
  },

  // 发布帖子
  onCreatePost() {
    wx.navigateTo({
      url: '/pages/post-create/post-create'
    });
  },

  // 返回首页
  onBackToHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadPosts();
    this.loadCities();
    this.loadHotTags();
    wx.stopPullDownRefresh();
  },

  // 加载更多
  onLoadMore() {
    if (!this.data.hasMore || this.data.isLoading) return;
    
    const nextPage = this.data.currentPage + 1;
    const start = (nextPage - 1) * this.data.pageSize;
    const end = start + this.data.pageSize;
    const morePosts = this.data.posts.slice(start, end);
    
    if (morePosts.length > 0) {
      this.setData({
        filteredPosts: [...this.data.filteredPosts, ...morePosts],
        currentPage: nextPage,
        hasMore: end < this.data.posts.length
      });
    } else {
      this.setData({ hasMore: false });
    }
  },

  // 预览图片
  onPreviewImage(e) {
    const { url, urls } = e.currentTarget.dataset;
    wx.previewImage({
      current: url,
      urls: urls
    });
  }
});
