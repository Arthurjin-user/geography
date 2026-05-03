const GeoApp = {
  echartsTheme: {
    color: ['#00d4ff', '#4a90e2', '#9b59b6', '#e67e22', '#27ae60', '#e74c3c', '#f1c40f', '#e91e63'],
    backgroundColor: 'transparent',
    textStyle: { color: '#ffffff' },
    title: { textStyle: { color: '#ffffff' } },
    legend: { textStyle: { color: '#b0b0d0' } },
    tooltip: {
      backgroundColor: 'rgba(20, 20, 60, 0.95)',
      borderColor: '#00d4ff',
      textStyle: { color: '#ffffff' }
    }
  },

  facts: [
    "地球是太阳系中唯一一颗表面被液态水覆盖的行星，覆盖率约71%。",
    "珠穆朗玛峰每年以约4毫米的速度上升。",
    "海洋最深处的马里亚纳海沟深度约为11034米。",
    "地球的磁场正在以每世纪5%的速度减弱。",
    "大气中氧气含量约21%，但在不同地区会有变化。",
    "撒哈拉沙漠是世界上最大的沙漠，面积约920万平方公里。",
    "亚马逊雨林产生地球约20%的氧气。",
    "地球核心温度高达6000摄氏度，堪比太阳表面。",
    "巴哈马群岛有100000多个岛屿，是岛屿最多的国家之一。",
    "澳大利亚是唯一独占一块大陆的国家。",
    "贝加尔湖储存着地球约20%的淡水资源。",
    "死海是地球陆地最低点，海拔-430米。",
    "日本每年发生约1500次地震。",
    "火星奥林匹斯山是太阳系最高的山，高度约22000米。",
    "地球自转速度正在缓慢减少，每100年一天增加约1.7毫秒。",
    "热带雨林只占地球表面的7%，却养育着50%以上的物种。",
    "珊瑚礁是海洋中生物多样性最高的生态系统。",
    "北极星目前距离地球约430光年。",
    "月球正以每年约3.8厘米的速度远离地球。",
    "地球的轨道速度约为每秒30公里。"
  ],

  init() {
    this.loadProgress();
    this.applyDayNightMode();
    this.setupStarField();
    this.showRandomFact();
    this.applyTheme();
  },

  loadProgress() {
    const saved = localStorage.getItem('geoLearningProgress');
    return saved ? JSON.parse(saved) : {};
  },

  saveProgress(sheetId, data) {
    const progress = this.loadProgress();
    progress[sheetId] = { ...progress[sheetId], ...data, timestamp: Date.now() };
    localStorage.setItem('geoLearningProgress', JSON.stringify(progress));
  },

  getProgress(sheetId) {
    return this.loadProgress()[sheetId] || {};
  },

  applyDayNightMode() {
    const hour = new Date().getHours();
    const theme = (hour >= 6 && hour < 18) ? 'day' : 'universe';
    document.documentElement.setAttribute('data-theme', theme);
  },

  setupStarField() {
    if (document.querySelector('.star-field')) return;
    const starField = document.createElement('div');
    starField.className = 'star-field';
    document.body.appendChild(starField);

    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        animation-delay: ${Math.random() * 2}s;
      `;
      starField.appendChild(star);
    }
  },

  showRandomFact() {
    const factEl = document.querySelector('[data-fact-display]');
    if (factEl) {
      factEl.textContent = this.facts[Math.floor(Math.random() * this.facts.length)];
    }
  },

  applyTheme() {
    const theme = localStorage.getItem('geoTheme') || 'universe';
    document.documentElement.setAttribute('data-theme', theme);
  },

  setTheme(theme) {
    localStorage.setItem('geoTheme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  },

  createChart(container, option) {
    const chart = echarts.init(container, null, { renderer: 'canvas' });
    chart.setOption({ ...this.echartsTheme, ...option });
    return chart;
  },

  planetData: {
    sun: { name: '太阳', mass: '1.989×10³⁰ kg', radius: '696,340 km', temp: '5,500°C (表面)', desc: '太阳系中心天体' },
    mercury: { name: '水星', mass: '3.285×10²³ kg', radius: '2,439 km', orbit: '88天', temp: '-180°C to 430°C', desc: '离太阳最近的行星' },
    venus: { name: '金星', mass: '4.867×10²⁴ kg', radius: '6,052 km', orbit: '225天', temp: '465°C', desc: '最热的行星' },
    earth: { name: '地球', mass: '5.972×10²⁴ kg', radius: '6,371 km', orbit: '365.25天', temp: '15°C (平均)', desc: '我们共同的家园' },
    mars: { name: '火星', mass: '6.39×10²³ kg', radius: '3,390 km', orbit: '687天', temp: '-65°C (平均)', desc: '红色星球' },
    jupiter: { name: '木星', mass: '1.898×10²⁷ kg', radius: '69,911 km', orbit: '11.86年', temp: '-110°C', desc: '最大的行星' },
    saturn: { name: '土星', mass: '5.683×10²⁶ kg', radius: '58,232 km', orbit: '29.46年', temp: '-140°C', desc: '拥有壮观的环系统' },
    uranus: { name: '天王星', mass: '8.681×10²⁵ kg', radius: '25,362 km', orbit: '84年', temp: '-195°C', desc: '躺着旋转的行星' },
    neptune: { name: '海王星', mass: '1.024×10²⁶ kg', radius: '24,622 km', orbit: '165年', temp: '-200°C', desc: '最远的巨行星' }
  },

  gravityFactors: {
    sun: 27.9, mercury: 0.38, venus: 0.91, earth: 1.0, mars: 0.38,
    jupiter: 2.53, saturn: 1.07, uranus: 0.89, neptune: 1.14, moon: 0.16
  },

  calculateWeight(earthWeight, planet) {
    const factor = this.gravityFactors[planet] || 1;
    return (earthWeight * factor).toFixed(2);
  },

  atmosphericLayers: [
    { name: '对流层', height: '0-12 km', temp: '随高度降低', features: '天气现象、风、雨雪' },
    { name: '平流层', height: '12-50 km', temp: '随高度升高', features: '臭氧层、飞机航行' },
    { name: '中间层', height: '50-80 km', temp: '随高度降低', features: '流星燃烧' },
    { name: '热层', height: '80-500 km', temp: '随高度升高', features: '极光、卫星轨道' },
    { name: '散逸层', height: '500+ km', temp: '随高度升高', features: '气体逐渐逸散到太空' }
  ],

  geologicalTime: [
    { era: '冥古宙', time: '46-40亿年前', events: ['地球形成', '原始海洋出现', '最早大气形成'], life: '无生命' },
    { era: '太古宙', time: '40-25亿年前', events: ['地壳形成', '最早生命出现', '蓝藻开始光合作用'], life: '原核生物' },
    { era: '元古宙', time: '25-5.4亿年前', events: ['大气氧气增加', '多细胞生物出现', '埃迪卡拉生物群'], life: '真核生物' },
    { era: '显古宙', time: '5.4亿年前-现在', events: ['寒武纪生命大爆发', '生物登上陆地', '恐龙时代', '人类出现'], life: '复杂生物' }
  ],

  disasters: [
    { name: '地震', icon: '📊', description: '地壳快速释放能量造成的震动', safety: ['躲在坚固家具下', '远离窗户', '有序疏散'] },
    { name: '台风', icon: '🌀', description: '热带气旋形成的强烈风暴', safety: ['加固房屋', '储备物资', '及时撤离'] },
    { name: '洪水', icon: '🌊', description: '河流水位超过安全水位的现象', safety: ['往高处转移', '避免涉水', '关注预警'] },
    { name: '滑坡', icon: '⛰️', description: '斜坡上的岩土体沿一定界面滑落', safety: ['远离陡坡', '迅速转移', '防止二次滑坡'] }
  ],

  rsExamples: [
    { location: '亚马逊雨林', change: '30年间失去9%的森林覆盖', source: 'NASA Landsat' },
    { location: '青海湖', change: '水域面积近20年增长约100km²', source: '中国资源卫星' },
    { location: '上海浦东', change: '1987-2020城市扩张约3倍', source: 'Sentinel-2' }
  ],

  gisAnalysisTypes: ['土地利用', '人口分布', '交通网络', '环境监测', '灾害评估', '商业选址'],

  formatNumber(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
  }
};

document.addEventListener('DOMContentLoaded', () => GeoApp.init());
