const app = getApp();
const communityData = require('../../utils/communityData.js');

Page({
  data: {
    title: '',
    content: '',
    images: [],
    city: '',
    district: '',
    address: '',
    tags: [],
    tagInput: '',
    maxImages: 9,
    maxTitleLength: 50,
    maxContentLength: 500,
    isSubmitting: false
  },

  onLoad() {
    // 页面加载时检查是否有定位信息
    this.checkLocation();
  },

  // 检查定位信息
  checkLocation() {
    const app = getApp();
    if (app.globalData && app.globalData.userLocation) {
      const location = app.globalData.userLocation;
      this.setData({
        city: location.city || '',
        district: location.district || '',
        address: location.address || ''
      });
    }
  },

  // 标题输入
  onTitleInput(e) {
    const value = e.detail.value;
    if (value.length <= this.data.maxTitleLength) {
      this.setData({ title: value });
    }
  },

  // 内容输入
  onContentInput(e) {
    const value = e.detail.value;
    if (value.length <= this.data.maxContentLength) {
      this.setData({ content: value });
    }
  },

  // 城市输入
  onCityInput(e) {
    this.setData({ city: e.detail.value });
  },

  // 地区输入
  onDistrictInput(e) {
    this.setData({ district: e.detail.value });
  },

  // 详细地址输入
  onAddressInput(e) {
    this.setData({ address: e.detail.value });
  },

  // 标签输入
  onTagInput(e) {
    this.setData({ tagInput: e.detail.value });
  },

  // 添加标签
  onAddTag() {
    const tag = this.data.tagInput.trim();
    if (!tag) return;
    
    if (this.data.tags.length >= 5) {
      wx.showToast({
        title: '最多添加5个标签',
        icon: 'none'
      });
      return;
    }

    if (this.data.tags.includes(tag)) {
      wx.showToast({
        title: '标签已存在',
        icon: 'none'
      });
      return;
    }

    this.setData({
      tags: [...this.data.tags, tag],
      tagInput: ''
    });
  },

  // 删除标签
  onRemoveTag(e) {
    const index = e.currentTarget.dataset.index;
    const tags = this.data.tags.filter((_, i) => i !== index);
    this.setData({ tags });
  },

  // 选择图片
  onChooseImage() {
    const remainingCount = this.data.maxImages - this.data.images.length;
    if (remainingCount <= 0) {
      wx.showToast({
        title: `最多上传${this.data.maxImages}张图片`,
        icon: 'none'
      });
      return;
    }

    wx.chooseImage({
      count: remainingCount,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 这里使用临时文件路径，实际项目中应该上传到服务器
        const newImages = res.tempFilePaths;
        this.setData({
          images: [...this.data.images, ...newImages]
        });
      }
    });
  },

  // 预览图片
  onPreviewImage(e) {
    const index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.images[index],
      urls: this.data.images
    });
  },

  // 删除图片
  onRemoveImage(e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.images.filter((_, i) => i !== index);
    this.setData({ images });
  },

  // 获取定位
  onGetLocation() {
    wx.showLoading({ title: '定位中...' });
    
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        wx.hideLoading();
        
        const latitude = res.latitude;
        const longitude = res.longitude;
        
        this.reverseGeocode(latitude, longitude);
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showModal({
          title: '定位失败',
          content: '无法获取当前位置，是否手动输入位置信息？',
          confirmText: '手动输入',
          cancelText: '取消',
          success: (modalRes) => {
            if (modalRes.confirm) {
              this.setData({ 
                city: '',
                district: '',
                address: ''
              });
              wx.showToast({
                title: '请在下方手动输入位置',
                icon: 'none',
                duration: 2000
              });
            }
          }
        });
      }
    });
  },

  reverseGeocode(latitude, longitude) {
    wx.showLoading({ title: '解析位置...' });
    
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/',
      data: {
        location: `${latitude},${longitude}`,
        key: 'YOUR_KEY'
      },
      success: (res) => {
        wx.hideLoading();
        if (res.data && res.data.status === 0) {
          const result = res.data.result;
          this.setData({
            city: result.ad_info.city || '',
            district: result.ad_info.district || '',
            address: result.address_reference.landmark_l2.title || ''
          });
          wx.showToast({
            title: '定位成功',
            icon: 'success',
            duration: 1500
          });
        } else {
          this.useDefaultLocation();
        }
      },
      fail: () => {
        wx.hideLoading();
        this.useDefaultLocation();
      }
    });
  },

  useDefaultLocation() {
    wx.showModal({
      title: '位置信息',
      content: '请手动输入您的位置信息',
      confirmText: '手动输入',
      cancelText: '稍后',
      success: (res) => {
        if (res.confirm) {
          this.setData({ 
            city: '',
            district: '',
            address: ''
          });
        }
      }
    });
  },

  // 表单验证
  validateForm() {
    if (!this.data.title.trim()) {
      wx.showToast({
        title: '请输入标题',
        icon: 'none'
      });
      return false;
    }

    if (!this.data.content.trim()) {
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      });
      return false;
    }

    if (this.data.title.trim().length < 2) {
      wx.showToast({
        title: '标题至少2个字',
        icon: 'none'
      });
      return false;
    }

    if (this.data.content.trim().length < 10) {
      wx.showToast({
        title: '内容至少10个字',
        icon: 'none'
      });
      return false;
    }

    return true;
  },

  // 提交表单
  onSubmit() {
    if (this.data.isSubmitting) return;
    
    if (!this.validateForm()) return;

    this.setData({ isSubmitting: true });

    const userInfo = app.globalData.userInfo;
    const author = {
      nickname: userInfo.nickname || '我',
      avatar: userInfo.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=me'
    };

    const postData = {
      title: this.data.title.trim(),
      content: this.data.content.trim(),
      images: this.data.images,
      author: author,
      location: null,
      tags: this.data.tags
    };

    if (this.data.city.trim()) {
      postData.location = {
        city: this.data.city.trim(),
        district: this.data.district.trim() || undefined,
        address: this.data.address.trim() || undefined
      };
    }

    const newPost = communityData.createPost(postData);

    app.globalData.myPosts.unshift(newPost);
    app.globalData.userInfo.postCount++;
    app.saveUserData();

    wx.showToast({
      title: '发布成功！',
      icon: 'success',
      duration: 1500,
      success: () => {
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    });

    this.setData({ isSubmitting: false });
  },

  // 取消发布
  onCancel() {
    if (this.data.title || this.data.content || this.data.images.length > 0) {
      wx.showModal({
        title: '确认放弃',
        content: '确定要放弃编辑的内容吗？',
        success: (res) => {
          if (res.confirm) {
            wx.navigateBack();
          }
        }
      });
    } else {
      wx.navigateBack();
    }
  }
});
