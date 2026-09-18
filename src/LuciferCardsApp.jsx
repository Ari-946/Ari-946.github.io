import { useEffect } from 'react'
import LuciferMemesApp from './LuciferMemesApp.jsx'
import { siteContent } from './siteContent.js'

// 只替换收藏卡图片与文字，原有卡片结构和镭射效果保持不变。
siteContent.cards = [
  { id: 'NO. 001', rarity: 'SSR', title: '四门第一剑', subtitle: '', image: '/images/optimized/cards/01-first-sword.webp' },
  { id: 'NO. 017', rarity: 'SR', title: '红头发小哥哥', subtitle: '', image: '/images/optimized/cards/02-red-hair.webp' },
  { id: 'NO. 026', rarity: 'UR', title: '舞学奇才', subtitle: '', image: '/images/optimized/cards/03-dance-genius.webp' },
  { id: 'NO. 052', rarity: 'R', title: '路观限定', subtitle: '', image: '/images/optimized/cards/04-limited.webp' },
]

export default function LuciferCardsApp() {
  useEffect(() => {
    const description = document.querySelector('#cards .fan-section-heading > p')
    if (description) {
      description.textContent = '纪念法子特殊时刻制作的专属卡片，悬停卡片可以看到镭射光效果'
    }
  }, [])

  return <LuciferMemesApp />
}
