const foodData = require('../../utils/foodData.js');

Page({
  data: {
    foodTypes: [],
    selectedTypes: [],
    currentFood: null,
    isRolling: false,
    isPaused: false,
    showResult: false,
    retryCount: 0,
    maxRetries: 3,
    showFinalModal: false,
    timePeriod: 'all',
    timePeriodName: '全天',
    timePeriods: [
      { value: 'all', name: '全部', icon: '📅' },
      { value: 'morning', name: '早餐', icon: '🌅' },
      { value: 'lunch', name: '午餐', icon: '☀️' },
      { value: 'dinner', name: '晚餐', icon: '🌙' }
    ],
    scrollFoods: [],
    animationData: {},
    canShare: false,
    scrollLeft: 0,
    isScrollEnd: false,
    scrollStep: 200,
    availableFoods: []
  },

  onLoad() {
    const timePeriod = foodData.getTimePeriod();
    const timePeriodName = foodData.getTimePeriodName(timePeriod);
    
    const filteredTypes = foodData.getTypesForPeriod(timePeriod);
    const availableFoods = foodData.filterFoodsByTypesAndTime([], timePeriod);
    
    this.setData({
      timePeriod,
      timePeriodName,
      foodTypes: filteredTypes,
      availableFoods: availableFoods.slice(0, 5)
    });
    
    this.initRollerTrack();
  },

  initRollerTrack() {
    const { availableFoods } = this.data;
    let scrollFoods = [];
    
    if (availableFoods.length === 0) {
      scrollFoods = [{ id: 0, emoji: '🍽️', name: '开始探索', calories: '' }];
    } else {
      for (let i = 0; i < 5; i++) {
        const food = availableFoods[Math.floor(Math.random() * availableFoods.length)];
        scrollFoods.push(food);
      }
    }
    
    this.setData({ scrollFoods });
  },

  onTypeTap(e) {
    if (this.data.isRolling) return;

    const typeName = e.currentTarget.dataset.type;
    const selectedTypes = this.data.selectedTypes;

    const index = selectedTypes.indexOf(typeName);
    if (index > -1) {
      selectedTypes.splice(index, 1);
    } else {
      selectedTypes.push(typeName);
    }

    const availableFoods = foodData.filterFoodsByTypesAndTime(selectedTypes, this.data.timePeriod);
    
    let scrollFoods = [];
    for (let i = 0; i < 5; i++) {
      const food = availableFoods[Math.floor(Math.random() * availableFoods.length)];
      scrollFoods.push(food);
    }

    this.setData({ 
      selectedTypes,
      availableFoods: availableFoods,
      scrollFoods: scrollFoods
    });
  },

  onTimePeriodTap(e) {
    if (this.data.isRolling) return;

    const period = e.currentTarget.dataset.period;
    const timePeriodName = foodData.getTimePeriodName(period);
    
    const filteredTypes = foodData.getTypesForPeriod(period);
    const availableFoods = foodData.filterFoodsByTypesAndTime([], period);
    
    let scrollFoods = [];
    for (let i = 0; i < 5; i++) {
      const food = availableFoods[Math.floor(Math.random() * availableFoods.length)];
      scrollFoods.push(food);
    }
    
    this.setData({
      timePeriod: period,
      timePeriodName,
      selectedTypes: [],
      foodTypes: filteredTypes,
      availableFoods: availableFoods,
      scrollFoods: scrollFoods
    });
  },

  onScrollLeft() {
    if (this.data.scrollLeft <= 0) return;
    const newScrollLeft = Math.max(0, this.data.scrollLeft - this.data.scrollStep);
    this.setData({ 
      scrollLeft: newScrollLeft,
      isScrollEnd: false
    });
  },

  onScrollRight() {
    if (this.data.isScrollEnd) return;
    const newScrollLeft = this.data.scrollLeft + this.data.scrollStep;
    this.setData({ scrollLeft: newScrollLeft });
  },

  onTypeScroll(e) {
    const scrollLeft = e.detail.scrollLeft;
    const scrollWidth = e.detail.scrollWidth;
    const clientWidth = e.detail.clientWidth;
    const isScrollEnd = scrollLeft + clientWidth >= scrollWidth - 10;
    
    this.setData({
      scrollLeft: scrollLeft,
      isScrollEnd: isScrollEnd
    });
  },

  onStartRoll() {
    if (this.data.isRolling) return;

    const availableFoods = foodData.filterFoodsByTypesAndTime(
      this.data.selectedTypes,
      this.data.timePeriod
    );

    if (availableFoods.length === 0) {
      wx.showToast({
        title: '没有找到合适的美食',
        icon: 'none'
      });
      return;
    }

    let scrollFoods = [];
    for (let i = 0; i < 20; i++) {
      scrollFoods.push(availableFoods[Math.floor(Math.random() * availableFoods.length)]);
    }

    this.setData({
      isRolling: true,
      isPaused: false,
      showResult: false,
      scrollFoods,
      currentFood: null,
      availableFoods: availableFoods
    });

    this.startRollAnimation();
  },

  startRollAnimation() {
    const availableFoods = foodData.filterFoodsByTypesAndTime(
      this.data.selectedTypes,
      this.data.timePeriod
    );

    let currentIndex = 0;
    const totalFoods = availableFoods.length;
    const animationDuration = 100;
    
    const maxDuration = 3 * 60 * 1000;
    const startTime = Date.now();

    this.rollTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      
      if (currentIndex >= 15 && currentIndex % 3 === 0) {
        const slowDown = Math.floor((currentIndex - 15) / 5) * 50;
        clearInterval(this.rollTimer);
        setTimeout(() => {
          this.showFinalResult(availableFoods);
        }, slowDown);
        return;
      }
      
      if (elapsed >= maxDuration) {
        clearInterval(this.rollTimer);
        this.showFinalResult(availableFoods);
        return;
      }

      const randomFood = availableFoods[Math.floor(Math.random() * totalFoods)];
      const scrollFoods = [...this.data.scrollFoods];
      scrollFoods.shift();
      scrollFoods.push(randomFood);

      this.setData({ scrollFoods });
      currentIndex++;
    }, animationDuration);
  },
  
  showFinalResult(availableFoods) {
    const finalFood = availableFoods[Math.floor(Math.random() * availableFoods.length)];
    this.setData({
      currentFood: finalFood,
      isRolling: false,
      isPaused: true,
      showResult: true
    });
  },

  onPause() {
    if (!this.data.isRolling) return;
    clearInterval(this.rollTimer);
    
    const availableFoods = foodData.filterFoodsByTypesAndTime(
      this.data.selectedTypes,
      this.data.timePeriod
    );
    const finalFood = availableFoods[Math.floor(Math.random() * availableFoods.length)];
    
    this.setData({
      currentFood: finalFood,
      isRolling: false,
      isPaused: true,
      showResult: true
    });
  },

  onConfirm() {
    this.setData({ showResult: false, isPaused: false });
    wx.showToast({
      title: '恭喜获得美食！',
      icon: 'success',
      duration: 1500,
      success: () => {
        setTimeout(() => {
          this.onShare();
        }, 1500);
      }
    });
  },

  onRetry() {
    const newRetryCount = this.data.retryCount + 1;
    
    if (newRetryCount >= this.data.maxRetries) {
      this.setData({ 
        showFinalModal: true,
        retryCount: newRetryCount
      });
      return;
    }
    
    this.setData({ retryCount: newRetryCount });
    this.onStartRoll();
  },

  onCloseFinalModal() {
    this.setData({ showFinalModal: false });
  },

  onShare() {
    const food = this.data.currentFood;
    if (!food) return;

    const shareText = foodData.getShareText(food);
    
    wx.showActionSheet({
      itemList: ['生成分享图片', '分享给朋友', '分享到朋友圈'],
      success: (res) => {
        switch(res.tapIndex) {
          case 0:
            this.generateShareCard(food, shareText);
            break;
          case 1:
            wx.showShareMenu({
              withShareTicket: true,
              menus: ['shareAppMessage']
            });
            wx.showToast({
              title: '请点击右上角分享',
              icon: 'none'
            });
            break;
          case 2:
            wx.showShareMenu({
              withShareTicket: true,
              menus: ['shareTimeline']
            });
            wx.showToast({
              title: '请点击右上角分享',
              icon: 'none'
            });
            break;
        }
      }
    });
  },

  generateShareCard(food, shareText) {
    wx.showLoading({ title: '正在生成图片...' });
    
    const ctx = wx.createCanvasContext('shareCanvas');

    ctx.setFillStyle('#FFF8E7');
    ctx.fillRect(0, 0, 300, 400);

    ctx.setFillStyle('#FFD700');
    ctx.fillRect(10, 10, 280, 380);
    ctx.setFillStyle('#FFF8E7');
    ctx.fillRect(15, 15, 270, 370);

    ctx.setFontSize(24);
    ctx.setFillStyle('#333');
    ctx.setTextAlign('center');
    ctx.fillText('今天吃什么', 150, 60);

    ctx.setFontSize(80);
    ctx.fillText(food.emoji, 150, 160);

    ctx.setFontSize(22);
    ctx.setFillStyle('#FF6B6B');
    ctx.fillText(food.name, 150, 210);

    ctx.setFontSize(14);
    ctx.setFillStyle('#666');
    ctx.fillText(food.calories, 150, 240);

    ctx.setFontSize(12);
    ctx.setFillStyle('#999');
    ctx.fillText(shareText, 150, 300);

    ctx.setFillStyle('#FFE4B5');
    ctx.fillRect(50, 330, 200, 40);
    ctx.setFontSize(14);
    ctx.setFillStyle('#FF6B6B');
    ctx.fillText('今天吃什么', 150, 356);

    ctx.draw(false, () => {
      wx.canvasToTempFilePath({
        canvasId: 'shareCanvas',
        success: (res) => {
          wx.hideLoading();
          wx.previewImage({
            urls: [res.tempFilePath],
            success: () => {
              wx.showToast({
                title: '长按图片保存',
                icon: 'none',
                duration: 2000
              });
            }
          });
        },
        fail: (err) => {
          wx.hideLoading();
          wx.showToast({
            title: '生成失败',
            icon: 'none'
          });
          console.error('生成分享图片失败:', err);
        }
      });
    });
  },

  onReset() {
    this.setData({
      currentFood: null,
      isRolling: false,
      isPaused: false,
      showResult: false,
      retryCount: 0,
      showFinalModal: false,
      scrollFoods: []
    });
  },

  // 跳转到社区页面
  onGoToCommunity() {
    wx.switchTab({
      url: '/pages/community/community'
    });
  }
});
