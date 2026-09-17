import { useEffect } from 'react'
import LuciferMotionFixApp from './LuciferMotionFixApp.jsx'
import { siteContent } from './siteContent.js'

const liveUrl = 'https://www.douyin.com/user/MS4wLjABAAAAKkA8wJr3vRuWjrfu3hYBv9btAcxIBmikHr2xDXsECDmeukNDBRfNT2StQ0CtPBh1?from_tab_name=main'
siteContent.creator.liveUrl = liveUrl

export default function LuciferLinksApp() {
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const browseLink = document.querySelector('.fan-hero-bottom a')
      if (browseLink) browseLink.setAttribute('href', '#about')

      document.querySelectorAll('.fan-live-link, .fan-footer-button').forEach(link => {
        link.setAttribute('href', liveUrl)
        link.setAttribute('target', '_blank')
        link.setAttribute('rel', 'noopener noreferrer')
      })
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  return <LuciferMotionFixApp />
}
