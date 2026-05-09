// 美食社区数据管理

// 模拟帖子数据
let communityPosts = wx.getStorageSync('communityPosts') || [
  {
    id: 1,
    title: "发现一家超棒的火锅店！",
    content: "这家重庆火锅真的太正宗了，毛肚七上八下刚刚好，辣得过瘾！环境也不错，适合朋友聚餐。",
    images: ["https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400"],
    author: {
      nickname: "吃货小王",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1"
    },
    location: {
      city: "北京",
      district: "朝阳区",
      address: "三里屯太古里"
    },
    tags: ["火锅", "聚餐", "重口味"],
    likes: 128,
    favorites: 45,
    comments: [
      {
        id: 1,
        author: "美食达人",
        content: "看起来好诱人！",
        createTime: "2024-01-15 14:30"
      }
    ],
    createTime: "2024-01-15 12:00",
    isLiked: false,
    isFavorited: false
  },
  {
    id: 2,
    title: "下午茶时间到~",
    content: "这家甜品店的芝士蛋糕绝了，入口即化，配上一杯拿铁，完美的下午时光。",
    images: ["https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400"],
    author: {
      nickname: "甜甜圈",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2"
    },
    location: {
      city: "上海",
      district: "静安区"
    },
    tags: ["甜品", "下午茶", "治愈系"],
    likes: 89,
    favorites: 32,
    comments: [],
    createTime: "2024-01-14 16:20",
    isLiked: false,
    isFavorited: false
  },
  {
    id: 3,
    title: "路边摊也有大美味",
    content: "公司楼下新开的煎饼果子摊，老板手艺很好，加肠加蛋才8块钱，管饱！",
    images: [],
    author: {
      nickname: "打工人",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3"
    },
    location: null,
    tags: ["早点", "实惠", "小吃"],
    likes: 56,
    favorites: 18,
    comments: [],
    createTime: "2024-01-14 08:30",
    isLiked: false,
    isFavorited: false
  }
];

// 保存帖子到本地存储
const savePosts = () => {
  wx.setStorageSync('communityPosts', communityPosts);
};

// 获取所有帖子
const getAllPosts = () => {
  return communityPosts.sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
};

// 根据城市筛选帖子
const getPostsByCity = (city) => {
  if (!city) return getAllPosts();
  return communityPosts
    .filter(post => post.location && post.location.city === city)
    .sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
};

// 根据标签筛选帖子
const getPostsByTag = (tag) => {
  if (!tag) return getAllPosts();
  return communityPosts
    .filter(post => post.tags.includes(tag))
    .sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
};

// 获取帖子详情
const getPostById = (id) => {
  return communityPosts.find(post => post.id === id);
};

// 发布新帖子
const createPost = (postData) => {
  const newPost = {
    id: Date.now(),
    ...postData,
    likes: 0,
    favorites: 0,
    comments: [],
    createTime: formatDate(new Date()),
    isLiked: false,
    isFavorited: false
  };
  communityPosts.unshift(newPost);
  savePosts();
  return newPost;
};

// 点赞/取消点赞
const toggleLike = (postId) => {
  const post = communityPosts.find(p => p.id === postId);
  if (post) {
    post.isLiked = !post.isLiked;
    post.likes += post.isLiked ? 1 : -1;
    savePosts();
    return post.isLiked;
  }
  return null;
};

// 添加评论
const addComment = (postId, commentData) => {
  const post = communityPosts.find(p => p.id === postId);
  if (post) {
    const newComment = {
      id: Date.now(),
      ...commentData,
      createTime: formatDate(new Date())
    };
    post.comments.push(newComment);
    savePosts();
    return newComment;
  }
  return null;
};

// 收藏/取消收藏
const toggleFavorite = (postId) => {
  const post = communityPosts.find(p => p.id === postId);
  if (post) {
    post.isFavorited = !post.isFavorited;
    post.favorites += post.isFavorited ? 1 : -1;
    savePosts();
    return post.isFavorited;
  }
  return null;
};

// 删除评论
const deleteComment = (postId, commentId) => {
  const post = communityPosts.find(p => p.id === postId);
  if (post) {
    const index = post.comments.findIndex(c => c.id === commentId);
    if (index > -1) {
      post.comments.splice(index, 1);
      savePosts();
      return true;
    }
  }
  return false;
};

// 获取热门标签
const getHotTags = () => {
  const tagCount = {};
  communityPosts.forEach(post => {
    post.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  return Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag);
};

// 获取所有城市列表
const getAllCities = () => {
  const cities = new Set();
  communityPosts.forEach(post => {
    if (post.location && post.location.city) {
      cities.add(post.location.city);
    }
  });
  return Array.from(cities);
};

// 格式化日期
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}`;
};

// 获取当前用户信息（模拟）
const getCurrentUser = () => {
  return {
    nickname: "我",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=me"
  };
};

module.exports = {
  getAllPosts,
  getPostsByCity,
  getPostsByTag,
  getPostById,
  createPost,
  toggleLike,
  toggleFavorite,
  deleteComment,
  addComment,
  getHotTags,
  getAllCities,
  getCurrentUser,
  formatDate
};
