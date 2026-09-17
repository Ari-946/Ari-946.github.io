import { useEffect } from 'react'
import LuciferSnowApp from './LuciferSnowApp.jsx'
import GlowCursor from './GlowCursor.jsx'

const sections = [
  { selector: '#about', number: '01', label: 'ABOUT / CREATOR' },
  { selector: '.fan-gallery', number: '02', label: 'PHOTO / WALL' },
  { selector: '#memes', number: '03', label: 'MEME / PACK' },
  { selector: '#cards', number: '04', label: 'FAN / COLLECTION' },
  { selector: '#moments', number: '05', label: 'ICONIC / MOMENTS' },
]

export default function LuciferCursorApp() {
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const gallery = document.querySelector('.fan-gallery')
      if (gallery) gallery.id = 'gallery'

      sections.forEach(({ selector, number, label }) => {
        const section = document.querySelector(selector)
        const numberNode = section?.querySelector('.fan-section-label > span')
        const labelNode = section?.querySelector('.fan-section-label > p')
        if (numberNode) numberNode.textContent = number
        if (labelNode) labelNode.textContent = label
      })

      const memeDescription = document.querySelector('#memes .fan-section-heading > p')
      if (memeDescription) memeDescription.textContent = '多种路西法的Q萌形象~'

      const nav = document.querySelector('.fan-nav')
      if (nav) {
        const links = Object.fromEntries([...nav.querySelectorAll('a')].map(link => [link.getAttribute('href'), link]))
        if (!links['#gallery']) {
          const galleryLink = document.createElement('a')
          galleryLink.href = '#gallery'
          galleryLink.textContent = '照片墙'
          links['#gallery'] = galleryLink
        }
        const order = [
          ['#about', '关于她'],
          ['#gallery', '照片墙'],
          ['#memes', '表情包'],
          ['#cards', '收藏卡'],
          ['#moments', '高能瞬间'],
        ]
        order.forEach(([href, text]) => {
          const link = links[href]
          if (!link) return
          link.textContent = text
          nav.appendChild(link)
        })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  return <>
    <LuciferSnowApp />
    <GlowCursor
      color="#ff304a"
      secondaryColor="#67e8f9"
      trailLength={30}
      trailWidth={8}
      trailTaper={0.8}
      followSpeed={0.16}
      glowIntensity={1.9}
      glowSpread={1.2}
      hotspot={0.65}
      brightness={1.25}
      opacity={1}
      pulseSpeed={1.1}
      noiseStrength={0.035}
      idleTimeout={700}
      fadeDuration={900}
    />
  </>
}
