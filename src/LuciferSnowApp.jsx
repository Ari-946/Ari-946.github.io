import { createPortal } from 'react-dom'
import { lazy, Suspense, useEffect, useState } from 'react'
import LuciferLayoutApp from './LuciferLayoutApp.jsx'
import './snow-background.css'

const PixelSnow = lazy(() => import('./PixelSnow.jsx'))

export default function LuciferSnowApp() {
  const [site, setSite] = useState(null)
  const [useWebGL, setUseWebGL] = useState(false)

  useEffect(() => {
    setSite(document.querySelector('.fan-site'))
    const snowQuery = window.matchMedia('(pointer: fine) and (min-width: 761px)')
    const updateSnow = () => setUseWebGL(snowQuery.matches)
    updateSnow()
    snowQuery.addEventListener?.('change', updateSnow)
    return () => snowQuery.removeEventListener?.('change', updateSnow)
  }, [])

  return <>
    <LuciferLayoutApp />
    {site && createPortal(
      <div className={'fan-pixel-snow' + (useWebGL ? '' : ' fan-pixel-snow--light')} aria-hidden="true">
        {useWebGL && <Suspense fallback={null}><PixelSnow
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
        /></Suspense>}
      </div>,
      site,
    )}
  </>
}
