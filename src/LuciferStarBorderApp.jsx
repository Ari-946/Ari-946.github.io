import { useEffect } from 'react'
import LuciferCursorApp from './LuciferCursorApp.jsx'
import './star-image-border.css'

const imageSelectors = [
  '.fan-profile-photo',
  '.fan-photo-cell',
  '.fan-meme-image',
  '.fan-card-photo',
  '.fan-moment-image',
]

export default function LuciferStarBorderApp() {
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      document.querySelectorAll(imageSelectors.join(',')).forEach((container, index) => {
        container.classList.add('star-image-border')
        container.style.setProperty('--star-delay', `${-(index % 8) * 0.42}s`)
        if (!container.querySelector(':scope > .star-border-top')) {
          const top = document.createElement('span')
          const bottom = document.createElement('span')
          top.className = 'star-border-beam star-border-top'
          bottom.className = 'star-border-beam star-border-bottom'
          top.setAttribute('aria-hidden', 'true')
          bottom.setAttribute('aria-hidden', 'true')
          container.append(top, bottom)
        }
      })

      // 移除片尾邮箱，仅保留应援站说明与返回顶部。
      document.querySelector('.fan-footer-bottom a[href^="mailto:"]')?.remove()
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  return <LuciferCursorApp />
}
