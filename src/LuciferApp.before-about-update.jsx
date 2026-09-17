import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import StreamerApp from './StreamerApp.jsx'
import { siteContent } from './siteContent.js'
import './lucifer.css'

export default function LuciferApp() {
  const [hero, setHero] = useState(null)

  useEffect(() => {
    setHero(document.querySelector('.fan-hero'))
    document.querySelector('.fan-brand')?.setAttribute('aria-label', '路西法粉丝站 · 返回首页')
  }, [])

  return <>
    <StreamerApp />
    {hero && createPortal(
      <video
        className="fan-hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={siteContent.creator.heroImage}
        aria-hidden="true"
      >
        <source src={siteContent.creator.heroVideo} type="video/mp4" />
      </video>,
      hero,
    )}
  </>
}
