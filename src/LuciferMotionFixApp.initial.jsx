import { useEffect } from 'react'
import LuciferMotionApp from './LuciferMotionApp.jsx'
import './motion-fixes.css'

export default function LuciferMotionFixApp() {
  useEffect(() => {
    // 如果用户从锚点或页面中段刷新，确保当前视口内的内容不会停留在初始隐藏状态。
    const revealVisibleContent = () => {
      document.querySelectorAll('.fan-section-label, .fan-section-heading h2, .fan-section-heading > p, .fan-gallery-title h2, .fan-gallery-title > p, .fan-about-copy h2, .fan-description').forEach(element => {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          element.style.opacity = '1'
          element.style.visibility = 'visible'
        }
      })
    }
    const timer = window.setTimeout(revealVisibleContent, 100)
    return () => window.clearTimeout(timer)
  }, [])

  return <LuciferMotionApp />
}
