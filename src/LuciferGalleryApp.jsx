import { useEffect } from 'react'
import LuciferFinalContentApp from './LuciferFinalContentApp.jsx'
import { siteContent } from './siteContent.js'

siteContent.gallery = [
  '/images/gallery/01-car.png',
  '/images/gallery/02-rose.png',
  '/images/gallery/03-sword.png',
  '/images/gallery/04-sunglasses.png',
  '/images/gallery/05-rain.png',
  '/images/gallery/06-cyber.png',
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
