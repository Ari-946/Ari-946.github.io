import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import LuciferLayoutApp from './LuciferLayoutApp.jsx'
import PixelSnow from './PixelSnow.jsx'
import './snow-background.css'

export default function LuciferSnowApp() {
  const [site, setSite] = useState(null)

  useEffect(() => {
    setSite(document.querySelector('.fan-site'))
  }, [])

  return <>
    <LuciferLayoutApp />
    {site && createPortal(
      <div className="fan-pixel-snow" aria-hidden="true">
        <PixelSnow
          color="#ffffff"
          flakeSize={0.026}
          minFlakeSize={1.25}
          pixelResolution={250}
          speed={1.25}
          density={0.4}
          direction={125}
          brightness={1}
          depthFade={5}
          farPlane={16}
          variant="snowflake"
        />
      </div>,
      site,
    )}
  </>
}
