// 网站的文字、图片与卡片内容集中在这里，后续可自行替换。
// 本地素材放进 public/images/ 或 public/videos/，引用时从 /images/ 或 /videos/ 开始。
export const siteContent = {
  creator: {
    name: '元帅路西法',
    chineseName: '路西法',
    handle: '@LUCIFER_LIVE',
    role: '游戏主播',
    slogan: '地表最强红狼，\n航天中的堕天使',
    description: '这里是为路西法建立的非官方应援小站。收录直播中的高能瞬间、可爱表情和限定收藏卡，也保存我们一起度过的快乐时光。',
    roomId: '888 107 26',
    followers: '128W',
    liveDays: '1,426',
    clips: '376',
    email: 'hello@lumifan.club',
    liveUrl: '#',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=90',
    heroImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=2200&q=90',
    heroVideo: '/videos/hero.mp4',
  },
  // 16:10 横图
  moments: [
    { number: '01', tag: 'GAME / HIGHLIGHT', title: '凌晨三点的\n神级翻盘', note: '“不到最后一秒，谁都不能说结束。”', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1600&q=90' },
    { number: '02', tag: 'DAILY / MOMENT', title: '第一次户外直播\n去看海', note: '风很大，但那天的歌特别好听。', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=90' },
    { number: '03', tag: 'SPECIAL / LIVE', title: '百万粉丝纪念夜', note: '不是终点，是下一个故事的开始。', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=90' },
  ],
  gallery: [
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=90',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=1000&q=90',
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1000&q=90',
    'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=1000&q=90',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=90',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=90',
  ],
  // image 留空时显示 emoji；推荐正方形透明 PNG。
  memes: [
    { title: '今天不播', caption: '（但偷偷上线）', emoji: '😴', image: '' },
    { title: '赢麻了', caption: '这把全是操作', emoji: '😎', image: '' },
    { title: '我没破防', caption: '真的，一点都没有', emoji: '🙂', image: '' },
    { title: '老板大气', caption: '感谢投喂！', emoji: '🫡', image: '' },
    { title: '让我康康', caption: '又有什么好东西', emoji: '👀', image: '' },
    { title: '晚安家人们', caption: '明天一定早播', emoji: '🌙', image: '' },
    { title: '尊嘟假嘟', caption: '不信，除非再说一次', emoji: '🤨', image: '' },
    { title: '开摆！', caption: '休息也是一种努力', emoji: '🫠', image: '' },
  ],
  // 3:4 竖图
  cards: [
    { id: 'NO. 001', rarity: 'SSR', title: '红色警报', subtitle: '限定直播纪念卡', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=90' },
    { id: 'NO. 017', rarity: 'SR', title: '蓝色时刻', subtitle: '夏日特别企划', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=90' },
    { id: 'NO. 026', rarity: 'UR', title: '星光舞台', subtitle: '百万纪念限定卡', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=90' },
    { id: 'NO. 052', rarity: 'R', title: '下播之后', subtitle: '日常写真收藏卡', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=900&q=90' },
  ],
}
