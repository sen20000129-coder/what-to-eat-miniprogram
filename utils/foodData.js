const foods = [
  {
    id: 1,
    name: "珍珠奶茶",
    type: "奶茶",
    emoji: "🧋",
    description: "香浓丝滑的奶茶配上Q弹珍珠，甜蜜暴击！",
    comment: "今日份快乐已到账~",
    calories: "约350大卡/杯",
    tags: ["下午茶", "续命水"],
    timePeriod: ["morning", "lunch", "dinner"]
  },
  {
    id: 2,
    name: "芝士蛋糕",
    type: "甜品",
    emoji: "🍰",
    description: "绵密细腻的奶酪香气，入口即化的幸福感",
    comment: "甜甜的，心情美美哒~",
    calories: "约300大卡/块",
    tags: ["下午茶", "治愈系"],
    timePeriod: ["morning", "lunch"]
  },
  {
    id: 3,
    name: "宫保鸡丁",
    type: "川菜",
    emoji: "🍗",
    description: "香辣开胃的花生鸡丁，下饭神器",
    comment: "干饭人的快乐源泉！",
    calories: "约450大卡/份",
    tags: ["下饭菜", "聚餐必备"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 4,
    name: "黄焖鸡米饭",
    type: "快餐",
    emoji: "🍚",
    description: "软糯鸡肉配香喷喷米饭，份量十足",
    comment: "吃饱不想家~",
    calories: "约600大卡/份",
    tags: ["管饱", "实惠"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 5,
    name: "红烧肉",
    type: "川菜",
    emoji: "🥓",
    description: "肥而不腻的经典美味，入口即化",
    comment: "今天的快乐源泉！",
    calories: "约500大卡/份",
    tags: ["下饭菜", "硬菜"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 6,
    name: "麻辣烫",
    type: "小吃",
    emoji: "🍲",
    description: "万物皆可烫的川味小吃，辣得过瘾",
    comment: "无辣不欢的快乐！",
    calories: "约400大卡/份",
    tags: ["重口味", "热闹"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 7,
    name: "小笼包",
    type: "包子",
    emoji: "🥟",
    description: "薄皮大馅汤汁多，一口一个满足",
    comment: "早餐的正确打开方式~",
    calories: "约200大卡/4个",
    tags: ["早点", "管饱"],
    timePeriod: ["morning"]
  },
  {
    id: 8,
    name: "煎饼果子",
    type: "煎饼",
    emoji: "🥞",
    description: "酥脆薄饼配鸡蛋香肠，街头美食扛把子",
    comment: "元气满满的一天~",
    calories: "约350大卡/份",
    tags: ["早点", "实惠"],
    timePeriod: ["morning"]
  },
  {
    id: 9,
    name: "关东煮",
    type: "小吃",
    emoji: "🍢",
    description: "热气腾腾的汤煮小吃，暖胃又暖心",
    comment: "冬日里的小确幸~",
    calories: "约250大卡/份",
    tags: ["清淡", "暖胃"],
    timePeriod: ["morning", "lunch", "dinner"]
  },
  {
    id: 10,
    name: "水果沙拉",
    type: "轻食",
    emoji: "🍇",
    description: "新鲜水果大集合，清爽无负担",
    comment: "健康又美味的轻体验~",
    calories: "约150大卡/份",
    tags: ["健康", "轻体"],
    timePeriod: ["morning", "lunch"]
  },
  {
    id: 11,
    name: "烤冷面",
    type: "小吃",
    emoji: "🍳",
    description: "铁板烤制的香软冷面，酱香四溢",
    comment: "夜宵摊的必点项！",
    calories: "约300大卡/份",
    tags: ["夜宵", "解馋"],
    timePeriod: ["dinner"]
  },
  {
    id: 12,
    name: "蛋炒饭",
    type: "快餐",
    emoji: "🍳",
    description: "金黄诱人的蛋香炒饭，粒粒分明",
    comment: "简单却经典的美味！",
    calories: "约450大卡/份",
    tags: ["管饱", "快手"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 13,
    name: "豆花",
    type: "甜品",
    emoji: "🫘",
    description: "细腻嫩滑的豆香甜品，甜度可选",
    comment: "温柔的一天从这碗开始~",
    calories: "约120大卡/碗",
    tags: ["清淡", "养生"],
    timePeriod: ["morning", "lunch"]
  },
  {
    id: 14,
    name: "烤鱼",
    type: "烧烤",
    emoji: "🐟",
    description: "外焦里嫩的香烤鱼类，配菜丰富",
    comment: "今晚吃鱼，明天有余~",
    calories: "约550大卡/份",
    tags: ["聚餐", "硬菜"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 15,
    name: "手抓饼",
    type: "煎饼",
    emoji: "🫓",
    description: "层层分明的酥脆饼皮，卷啥都香",
    comment: "早餐界的百搭之王！",
    calories: "约280大卡/份",
    tags: ["早点", "快手"],
    timePeriod: ["morning"]
  },
  {
    id: 16,
    name: "杨枝甘露",
    type: "奶茶",
    emoji: "🥭",
    description: "芒果西柚椰汁的完美组合，清甜解腻",
    comment: "甜品界的清流~",
    calories: "约280大卡/杯",
    tags: ["下午茶", "清爽"],
    timePeriod: ["lunch"]
  },
  {
    id: 17,
    name: "油条豆浆",
    type: "面点",
    emoji: "🥖",
    description: "酥脆油条配香浓豆浆，经典中式早餐",
    comment: "传统早餐的精髓~",
    calories: "约400大卡/份",
    tags: ["早点", "管饱"],
    timePeriod: ["morning"]
  },
  {
    id: 18,
    name: "重庆老火锅",
    type: "火锅",
    emoji: "🔥",
    description: "正宗重庆风味，热辣过瘾的牛油火锅",
    comment: "没有什么是一顿火锅解决不了的！",
    calories: "约800大卡/份",
    tags: ["聚餐", "热闹"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 19,
    name: "冰淇淋",
    type: "甜品",
    emoji: "🍦",
    description: "丝滑冰凉的甜蜜诱惑，夏日必备",
    comment: "冰冰凉，心飞扬~",
    calories: "约200大卡/球",
    tags: ["消暑", "治愈"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 20,
    name: "鲜肉包子",
    type: "包子",
    emoji: "🥮",
    description: "松软面皮包裹鲜香肉馅，早餐好选择",
    comment: "小巧玲珑，美味可口~",
    calories: "约150大卡/个",
    tags: ["早点", "方便"],
    timePeriod: ["morning"]
  },
  {
    id: 21,
    name: "麻辣香锅",
    type: "川菜",
    emoji: "🌶️",
    description: "香辣过瘾的炒制美食，食材丰富",
    comment: "香麻辣，三重暴击！",
    calories: "约500大卡/份",
    tags: ["下饭菜", "重口味"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 22,
    name: "三明治",
    type: "轻食",
    emoji: "🥪",
    description: "两片面包夹万物，营养均衡",
    comment: "简约不简单的美味~",
    calories: "约250大卡/份",
    tags: ["轻食", "方便"],
    timePeriod: ["morning", "lunch"]
  },
  {
    id: 23,
    name: "炭火烤串",
    type: "烧烤",
    emoji: "🍖",
    description: "滋滋冒油的炭火烤串，午餐工作餐首选",
    comment: "今晚撸串，不醉不归！",
    calories: "约450大卡/份",
    tags: ["夜宵", "聚餐"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 24,
    name: "皮蛋瘦肉粥",
    type: "面点",
    emoji: "🥣",
    description: "绵密温润的咸粥，养胃又暖心",
    comment: "清晨的温柔呵护~",
    calories: "约200大卡/碗",
    tags: ["清淡", "养生"],
    timePeriod: ["morning"]
  },
  {
    id: 25,
    name: "意式披萨",
    type: "快餐",
    emoji: "🍕",
    description: "芝士拉丝的意大利经典，馅料丰富",
    comment: "快乐多巴胺制造机！",
    calories: "约700大卡/份",
    tags: ["聚餐", "西式"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 26,
    name: "水果捞",
    type: "轻食",
    emoji: "🍓",
    description: "新鲜水果搭配酸奶，清爽解腻",
    comment: "清爽一夏的甜蜜~",
    calories: "约180大卡/份",
    tags: ["健康", "清爽"],
    timePeriod: ["lunch"]
  },
  {
    id: 27,
    name: "汉堡薯条",
    type: "快餐",
    emoji: "🍔",
    description: "经典美式快餐组合，快乐源泉",
    comment: "垃圾食品最快乐！",
    calories: "约650大卡/份",
    tags: ["快餐", "解压"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 28,
    name: "肉夹馍",
    type: "小吃",
    emoji: "🥙",
    description: "酥脆白吉馍夹卤香肉，香到迷糊",
    comment: "西北名吃的魅力！",
    calories: "约320大卡/个",
    tags: ["管饱", "实惠"],
    timePeriod: ["morning", "lunch"]
  },
  {
    id: 29,
    name: "螺蛳粉",
    type: "小吃",
    emoji: "🍜",
    description: "酸辣鲜香的广西特色，闻着臭吃着香",
    comment: "上头的味道，无法拒绝！",
    calories: "约400大卡/份",
    tags: ["重口味", "上头"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 30,
    name: "马卡龙",
    type: "甜品",
    emoji: "🧁",
    description: "精致法式小甜点，酥脆甜蜜",
    comment: "法式的浪漫与精致~",
    calories: "约100大卡/个",
    tags: ["精致", "下午茶"],
    timePeriod: ["lunch"]
  },
  {
    id: 31,
    name: "日式烤肉",
    type: "日料",
    emoji: "🥩",
    description: "精选和牛的日式烤肉，入口即化",
    comment: "日料的极致享受~",
    calories: "约600大卡/份",
    tags: ["聚餐", "精致"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 32,
    name: "三文鱼刺身",
    type: "日料",
    emoji: "🍣",
    description: "新鲜三文鱼切片，鲜美嫩滑",
    comment: "海洋的味道~",
    calories: "约280大卡/份",
    tags: ["轻食", "健康"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 33,
    name: "部队火锅",
    type: "韩料",
    emoji: "🍲",
    description: "韩式辣酱配丰富配菜的火锅",
    comment: "韩剧同款快乐~",
    calories: "约550大卡/份",
    tags: ["聚餐", "热闹"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 34,
    name: "石锅拌饭",
    type: "韩料",
    emoji: "🍚",
    description: "香喷喷的石锅饭配韩式辣酱",
    comment: "韩式经典~",
    calories: "约480大卡/份",
    tags: ["管饱", "实惠"],
    timePeriod: ["lunch"]
  },
  {
    id: 35,
    name: "酸菜鱼",
    type: "川菜",
    emoji: "🐟",
    description: "酸辣开胃的川味鱼类佳肴",
    comment: "酸酸辣辣就是爽~",
    calories: "约420大卡/份",
    tags: ["下饭菜", "开胃"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 36,
    name: "水煮牛肉",
    type: "川菜",
    emoji: "🥩",
    description: "麻辣鲜香的水煮牛肉片",
    comment: "无辣不欢~",
    calories: "约480大卡/份",
    tags: ["下饭菜", "重口味"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 37,
    name: "兰州拉面",
    type: "面点",
    emoji: "🍜",
    description: "手工拉制的劲道面条",
    comment: "一碗拉面走天下~",
    calories: "约450大卡/碗",
    tags: ["管饱", "实惠"],
    timePeriod: ["morning", "lunch"]
  },
  {
    id: 38,
    name: "重庆小面",
    type: "面点",
    emoji: "🌶️",
    description: "麻辣鲜香的重庆特色面食",
    comment: "山城味道~",
    calories: "约400大卡/碗",
    tags: ["重口味", "快手"],
    timePeriod: ["morning", "lunch"]
  },
  {
    id: 39,
    name: "炸鸡汉堡",
    type: "快餐",
    emoji: "🍗",
    description: "香脆炸鸡配汉堡面包",
    comment: "快餐也能很美味~",
    calories: "约550大卡/份",
    tags: ["快餐", "解压"],
    timePeriod: ["lunch", "dinner"]
  },
  {
    id: 40,
    name: "可乐鸡翅",
    type: "小吃",
    emoji: "🍗",
    description: "可乐焖煮的甜香鸡翅",
    comment: "甜甜咸咸就是我~",
    calories: "约180大卡/个",
    tags: ["下午茶", "解馋"],
    timePeriod: ["lunch", "dinner"]
  }
];

const foodTypes = [
  { name: "火锅", emoji: "🍲", color: "#FF6B6B", periods: ["lunch", "dinner"] },
  { name: "烧烤", emoji: "🍖", color: "#FF8C00", periods: ["lunch", "dinner"] },
  { name: "甜品", emoji: "🍰", color: "#FF69B4", periods: ["all"] },
  { name: "奶茶", emoji: "🧋", color: "#DEB887", periods: ["all"] },
  { name: "快餐", emoji: "🍔", color: "#FFA500", periods: ["all"] },
  { name: "日料", emoji: "🍣", color: "#FF6347", periods: ["lunch", "dinner"] },
  { name: "韩料", emoji: "🥘", color: "#228B22", periods: ["lunch", "dinner"] },
  { name: "川菜", emoji: "🌶️", color: "#DC143C", periods: ["lunch", "dinner"] },
  { name: "面点", emoji: "🍜", color: "#F4A460", periods: ["all"] },
  { name: "轻食", emoji: "🥗", color: "#90EE90", periods: ["all"] },
  { name: "咖啡", emoji: "☕", color: "#8B4513", periods: ["morning", "all"] },
  { name: "面包", emoji: "🥐", color: "#DAA520", periods: ["morning", "all"] },
  { name: "包子", emoji: "🥟", color: "#FFD700", periods: ["morning", "all"] },
  { name: "煎饼", emoji: "🌯", color: "#CD853F", periods: ["morning", "all"] },
  { name: "小吃", emoji: "🍢", color: "#FF4500", periods: ["all"] }
];

const getTimePeriod = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 10) return "morning";
  if (hour >= 10 && hour < 17) return "lunch";
  return "dinner";
};

const getTimePeriodName = (period) => {
  const names = {
    morning: "早餐",
    lunch: "午餐",
    dinner: "晚餐",
    all: "全天"
  };
  return names[period] || "美食";
};

const filterFoodsByTypesAndTime = (selectedTypes, timePeriod) => {
  let filtered = foods;

  if (timePeriod && timePeriod !== 'all') {
    filtered = filtered.filter(food =>
      food.timePeriod.includes(timePeriod)
    );
  }

  if (selectedTypes && selectedTypes.length > 0) {
    filtered = filtered.filter(food =>
      selectedTypes.includes(food.type)
    );
  }

  return filtered;
};

const getTypesForPeriod = (period) => {
  if (period === 'all') {
    return foodTypes;
  }
  return foodTypes.filter(type => 
    type.periods.includes(period) || type.periods.includes('all')
  );
};

const getRandomFood = (selectedTypes) => {
  const timePeriod = getTimePeriod();
  const availableFoods = filterFoodsByTypesAndTime(selectedTypes, timePeriod);
  const randomIndex = Math.floor(Math.random() * availableFoods.length);
  return availableFoods[randomIndex];
};

const getShareText = (food) => {
  const texts = [
    `今天的快乐源泉就是这碗${food.name}！`,
    `${food.emoji} ${food.name}，我宣布这是今日最佳！`,
    `吃货的日常：${food.name}安排上~ ${food.emoji}`,
    `今日份美食已到账：${food.name}！`,
    `${food.name}在手，天下我有！${food.emoji}`
  ];
  return texts[Math.floor(Math.random() * texts.length)];
};

module.exports = {
  foods,
  foodTypes,
  getTimePeriod,
  getTimePeriodName,
  getRandomFood,
  filterFoodsByTypesAndTime,
  getTypesForPeriod,
  getShareText
};
