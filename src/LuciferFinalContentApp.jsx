import { useEffect } from 'react'
import LuciferStarBorderApp from './LuciferStarBorderApp.jsx'
import { siteContent } from './siteContent.js'
import './final-content.css'

siteContent.moments = [
  {
    number: '01',
    tag: 'GAME / HIGHLIGHT',
    title: '刘回杯清图丨\n遗憾出局',
    note: '“小角色也能站上大舞台”',
    image: '/images/optimized/moments/01-liuhui-cup.webp',
  },
  {
    number: '02',
    tag: 'GAME / TOURNAMENT',
    title: '陈泽杯复活赛杀出重围丨\n剑折总决赛',
    note: '“四门该出一个天才了”',
    image: '/images/optimized/moments/02-chenze-cup.webp',
  },
  {
    number: '03',
    tag: 'GAME / TOURNAMENT',
    title: '白泽杯第一个天才少年丨\n憾负抢位赛',
    note: '“如果天赋不够，那就反复”',
    image: '/images/optimized/moments/03-baize-cup.webp',
  },
]

export default function LuciferFinalContentApp() {
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const footer = document.querySelector('.fan-footer-inner')
      const eyebrow = footer?.querySelector(':scope > p')
      const title = footer?.querySelector(':scope > h2')
      if (eyebrow) eyebrow.innerHTML = '我是元帅路西法<br><span>总有一天我会拿到冠军</span>'
      if (title) title.innerHTML = '我们下次直播<br><span>不见不散</span>'
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  return <LuciferStarBorderApp />
}
