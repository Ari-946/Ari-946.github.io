import { useEffect } from 'react'
import LuciferFinalContentApp from './LuciferFinalContentApp.jsx'
import { siteContent } from './siteContent.js'

siteContent.gallery = [
  '/images/optimized/gallery/01-car.webp',
  '/images/optimized/gallery/02-rose.webp',
  '/images/optimized/gallery/03-sword.webp',
  '/images/optimized/gallery/04-sunglasses.webp',
  '/images/optimized/gallery/05-rain.webp',
  '/images/optimized/gallery/06-cyber.webp',
]

export default function LuciferGalleryApp() {
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const description = document.querySelector('#moments .fan-section-heading > p')
      if (description) {
        description.textContent = '从初出茅庐，到四门第一剑，路西法总能给粉丝留下精彩回忆'
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  return <LuciferFinalContentApp />
}
