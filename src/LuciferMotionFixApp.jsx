import { useEffect, useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LuciferMotionApp from './LuciferMotionApp.jsx'
import './motion-fixes.css'

gsap.registerPlugin(ScrollTrigger)

export default function LuciferMotionFixApp() {
  useLayoutEffect(() => {
    const timer = window.setTimeout(() => {
      const imageSelector = [
        '.fan-photo-cell img',
        '.fan-meme-image img',
        '.fan-card-photo img',
        '.fan-moment-image img',
        '.fan-profile-photo img',
      ].join(',')
      const images = new Set(document.querySelectorAll(imageSelector))

      // 只移除旧版图片放大视差，不影响遮罩揭开和模块进场时间线。
      ScrollTrigger.getAll().forEach(trigger => {
        const targets = trigger.animation?.targets?.() || []
        if (trigger.vars.scrub && targets.some(target => images.has(target))) {
          trigger.animation?.kill()
          trigger.kill()
        }
      })

      gsap.set([...images], { yPercent: 0, scale: 1 })
      ScrollTrigger.refresh()
    }, 60)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    // 从锚点或页面中段刷新时，当前视口内容不能停留在初始隐藏状态。
    const revealVisibleContent = () => {
      document.querySelectorAll('.fan-section-label, .fan-section-heading h2, .fan-section-heading > p, .fan-gallery-title h2, .fan-gallery-title > p, .fan-about-copy h2, .fan-description').forEach(element => {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          gsap.set(element, { autoAlpha: 1 })
        }
      })
    }
    const timer = window.setTimeout(revealVisibleContent, 120)
    return () => window.clearTimeout(timer)
  }, [])

  return <LuciferMotionApp />
}
