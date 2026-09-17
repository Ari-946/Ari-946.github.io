import { useEffect } from 'react'
import LuciferCardsApp from './LuciferCardsApp.jsx'
import './navigation-effects.css'

export default function LuciferLayoutApp() {
  useEffect(() => {
    const nav = document.querySelector('.fan-topbar')
    const hero = document.querySelector('.fan-hero')
    const moments = document.querySelector('#moments')
    const cards = document.querySelector('#cards')
    const footer = document.querySelector('.fan-footer')

    // 将高能瞬间移动到收藏卡之后、页尾之前。
    if (moments && cards && footer && moments.previousElementSibling !== cards) {
      footer.parentNode.insertBefore(moments, footer)
    }

    const updateNavigation = () => {
      const trigger = Math.max(120, (hero?.offsetHeight || window.innerHeight) - 96)
      nav?.classList.toggle('is-floating', window.scrollY >= trigger)
    }

    updateNavigation()
    window.addEventListener('scroll', updateNavigation, { passive: true })
    window.addEventListener('resize', updateNavigation)
    return () => {
      window.removeEventListener('scroll', updateNavigation)
      window.removeEventListener('resize', updateNavigation)
    }
  }, [])

  return <LuciferCardsApp />
}
