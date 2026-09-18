import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import StreamerApp from './StreamerApp.jsx'
import { siteContent } from './siteContent.js'
import './lucifer.css'

export default function LuciferApp() {
  const [hero, setHero] = useState(null)
  const [videoReady, setVideoReady] = useState(false)
  const [videoEnabled, setVideoEnabled] = useState(() => (
    typeof window === 'undefined' || !window.matchMedia('(max-width: 760px)').matches
  ))

  useEffect(() => {
    setHero(document.querySelector('.fan-hero'))
    const aboutTitle = document.querySelector('.fan-about-copy h2')
    if (aboutTitle) aboutTitle.innerHTML = '欢迎来到<br><em>路西法的小宇宙</em>'
    const statLabels = document.querySelectorAll('.fan-stats > div > span')
    if (statLabels[1]) statLabels[1].textContent = 'LIVE TIME / 直播时间'

    if (!videoEnabled) {
      const enableVideo = () => window.setTimeout(() => setVideoEnabled(true), 450)
      if (document.readyState === 'complete') enableVideo()
      else window.addEventListener('load', enableVideo, { once: true })
      return () => window.removeEventListener('load', enableVideo)
    }
  }, [])

  return <>
    <StreamerApp />
    <style>{`.fan-site .fan-profile-photo img{object-position:center top;filter:saturate(.96) contrast(1.03) brightness(.97)}`}</style>
    {hero && videoEnabled && createPortal(
      <video
        className={'fan-hero-video' + (videoReady ? ' is-ready' : '')}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={siteContent.creator.heroImage}
        onCanPlay={() => setVideoReady(true)}
        aria-hidden="true"
      >
        <source src={siteContent.creator.heroVideo} type="video/mp4" />
      </video>,
      hero,
    )}
  </>
}
