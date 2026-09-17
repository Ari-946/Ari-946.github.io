import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LuciferGalleryApp from './LuciferGalleryApp.jsx'
import './agency-motion.css'

gsap.registerPlugin(ScrollTrigger)

const modules = [
  {
    section: '.fan-about',
    cards: '.fan-profile-photo, .fan-about-copy, .fan-stats > div',
    images: '.fan-profile-photo img',
  },
  {
    section: '.fan-gallery',
    cards: '.fan-photo-cell',
    images: '.fan-photo-cell img',
  },
  {
    section: '.fan-memes',
    cards: '.fan-meme-card',
    images: '.fan-meme-image img',
  },
  {
    section: '.fan-cards',
    cards: '.fan-collect-card',
    images: '.fan-card-photo img',
  },
  {
    section: '.fan-moments',
    cards: '.fan-moment-card',
    images: '.fan-moment-image img',
  },
]

export default function LuciferMotionApp() {
  useLayoutEffect(() => {
    const root = document.documentElement
    const body = document.body
    root.classList.add('agency-motion-enabled')

    const motion = gsap.matchMedia()

    motion.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.agency-opening', { display: 'none' })
      gsap.set('[data-reveal], .fan-section-heading h2, .fan-section-heading > p', { clearProps: 'all' })
    })

    motion.add('(prefers-reduced-motion: no-preference)', () => {
      body.classList.add('opening-active')

      const opening = gsap.timeline({
        defaults: { ease: 'power4.inOut' },
        onComplete: () => {
          body.classList.remove('opening-active')
          gsap.set('.agency-opening', { display: 'none' })
          ScrollTrigger.refresh()
        },
      })

      gsap.set('.fan-topbar', { autoAlpha: 0, y: -32 })
      gsap.set('.fan-hero-video', { scale: 1.16, filter: 'saturate(.45) brightness(.36)' })
      gsap.set('.fan-hero h1', {
        yPercent: 90,
        scaleX: .72,
        clipPath: 'inset(0 100% 0 0)',
        transformOrigin: 'left center',
      })
      gsap.set('.fan-live-badge, .fan-hero-role, .fan-hero-bottom', { autoAlpha: 0, y: 38 })
      gsap.set('.agency-opening__eyebrow', { autoAlpha: 0, y: 16 })
      gsap.set('.agency-opening__line', { scaleX: 0, transformOrigin: 'left center' })
      gsap.set('.agency-opening__index', { autoAlpha: 0 })

      opening
        .to('.agency-opening__eyebrow', { autoAlpha: 1, y: 0, duration: .7, ease: 'power3.out' })
        .to('.agency-opening__line', { scaleX: 1, duration: 1.1 }, '-=.35')
        .to('.agency-opening__index', { autoAlpha: 1, duration: .45 }, '-=.55')
        .to('.agency-opening__panel--top', { yPercent: -102, duration: 1.35 }, 'reveal')
        .to('.agency-opening__panel--bottom', { yPercent: 102, duration: 1.35 }, 'reveal')
        .to('.agency-opening__center', { autoAlpha: 0, scale: .92, duration: .55, ease: 'power2.in' }, 'reveal')
        .to('.fan-hero-video', { scale: 1, filter: 'saturate(.82) brightness(.78)', duration: 2.1 }, 'reveal-=.15')
        .to('.fan-topbar', { autoAlpha: 1, y: 0, duration: 1 }, 'reveal+=.35')
        .to('.fan-hero h1', {
          yPercent: 0,
          scaleX: 1,
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.65,
          ease: 'expo.out',
        }, 'reveal+=.22')
        .to('.fan-live-badge', { autoAlpha: 1, y: 0, duration: .85, ease: 'power3.out' }, 'reveal+=.48')
        .to('.fan-hero-role', { autoAlpha: 1, y: 0, duration: .95, ease: 'power3.out' }, 'reveal+=.68')
        .to('.fan-hero-bottom', { autoAlpha: 1, y: 0, duration: 1.05, ease: 'power3.out' }, 'reveal+=.82')

      modules.forEach(({ section, cards, images }, moduleIndex) => {
        const sectionNode = document.querySelector(section)
        if (!sectionNode) return

        const label = sectionNode.querySelector('.fan-section-label')
        const heading = sectionNode.querySelector('.fan-section-heading h2, .fan-gallery-title h2, .fan-about-copy h2')
        const description = sectionNode.querySelector('.fan-section-heading > p, .fan-gallery-title > p, .fan-description')
        const cardNodes = sectionNode.querySelectorAll(cards)
        const imageNodes = sectionNode.querySelectorAll(images)

        gsap.set(label, { autoAlpha: 0, x: -70 })
        gsap.set(heading, {
          autoAlpha: 0,
          yPercent: 115,
          scaleX: .76,
          clipPath: 'inset(0 0 100% 0)',
          transformOrigin: 'left bottom',
        })
        gsap.set(description, { autoAlpha: 0, x: 65 })
        gsap.set(cardNodes, {
          autoAlpha: 0,
          y: 110,
          rotateX: 7,
          transformOrigin: 'center bottom',
        })
        gsap.set(imageNodes, { clipPath: 'inset(0 0 100% 0)' })

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionNode,
            start: 'top 76%',
            once: true,
          },
          defaults: { ease: 'power4.out' },
        })

        timeline
          .to(label, { autoAlpha: 1, x: 0, duration: .9 })
          .to(heading, {
            autoAlpha: 1,
            yPercent: 0,
            scaleX: 1,
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.45,
            ease: 'expo.out',
          }, '-=.58')
          .to(description, { autoAlpha: 1, x: 0, duration: 1.05 }, '-=.92')
          .to(cardNodes, {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 1.15,
            stagger: moduleIndex === 4 ? .2 : .11,
          }, '-=.52')
          .to(imageNodes, {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.3,
            stagger: .09,
            ease: 'power3.inOut',
          }, '-=1.18')

        imageNodes.forEach((image, index) => {
          gsap.fromTo(image,
            { yPercent: -5, scale: 1.1 },
            {
              yPercent: 5,
              scale: 1.1,
              ease: 'none',
              scrollTrigger: {
                trigger: image.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.35 + (index % 3) * .15,
              },
            },
          )
        })
      })

      const footer = document.querySelector('.fan-footer')
      if (footer) {
        const footerLead = footer.querySelector('.fan-footer-inner > p')
        const footerTitle = footer.querySelector('h2')
        const footerButton = footer.querySelector('.fan-footer-button')
        const footerBottom = footer.querySelector('.fan-footer-bottom')
        gsap.set(footerLead, { autoAlpha: 0, x: -70 })
        gsap.set(footerTitle, { autoAlpha: 0, yPercent: 85, scaleX: .78, clipPath: 'inset(0 0 100% 0)', transformOrigin: 'left bottom' })
        gsap.set(footerButton, { autoAlpha: 0, scale: .55, rotate: -28 })
        gsap.set(footerBottom, { autoAlpha: 0, y: 35 })
        gsap.timeline({ scrollTrigger: { trigger: footer, start: 'top 68%', once: true } })
          .to(footerLead, { autoAlpha: 1, x: 0, duration: 1, ease: 'power4.out' })
          .to(footerTitle, { autoAlpha: 1, yPercent: 0, scaleX: 1, clipPath: 'inset(0 0 0% 0)', duration: 1.55, ease: 'expo.out' }, '-=.55')
          .to(footerButton, { autoAlpha: 1, scale: 1, rotate: -8, duration: 1.1, ease: 'power4.out' }, '-=.9')
          .to(footerBottom, { autoAlpha: 1, y: 0, duration: .9, ease: 'power3.out' }, '-=.55')
      }

      requestAnimationFrame(() => ScrollTrigger.refresh())
    })

    return () => {
      motion.revert()
      root.classList.remove('agency-motion-enabled')
      body.classList.remove('opening-active')
      body.style.removeProperty('overflow')
    }
  }, [])

  return <>
    <LuciferGalleryApp />
    <div className="agency-opening" aria-hidden="true">
      <div className="agency-opening__panel agency-opening__panel--top" />
      <div className="agency-opening__panel agency-opening__panel--bottom" />
      <div className="agency-opening__center">
        <p className="agency-opening__eyebrow">LUCIFER / DIGITAL ARCHIVE</p>
        <span className="agency-opening__line" />
        <span className="agency-opening__index">EST. 2026 — 01</span>
      </div>
    </div>
  </>
}
