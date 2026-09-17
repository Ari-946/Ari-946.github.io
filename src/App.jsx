import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    id: '01',
    title: 'SYNTHETIC\nMEMORY',
    type: 'AI ART DIRECTION',
    year: '2026',
    image:
      'https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&w=1800&q=90',
  },
  {
    id: '02',
    title: 'NEON\nSPECIES',
    type: 'KEY VISUAL / CAMPAIGN',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1800&q=90',
  },
  {
    id: '03',
    title: 'AFTER\nHUMAN',
    type: 'EDITORIAL DESIGN',
    year: '2025',
    image:
      'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=1800&q=90',
  },
  {
    id: '04',
    title: 'RED\nOBJECTS',
    type: '3D / VISUAL SYSTEM',
    year: '2024',
    image:
      'https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=1800&q=90',
  },
]

const capabilities = [
  {
    number: '01',
    title: '视觉叙事',
    en: 'VISUAL NARRATIVE',
    text: '把抽象概念转化为有记忆点的视觉语言，让每一张画面都服务于品牌故事。',
  },
  {
    number: '02',
    title: '艺术指导',
    en: 'ART DIRECTION',
    text: '从核心概念、情绪版到最终成片，建立统一、准确且可持续的视觉方向。',
  },
  {
    number: '03',
    title: 'AI 创意',
    en: 'GENERATIVE DESIGN',
    text: '将生成式工具融入专业设计流程，拓宽视觉边界，同时保留审美判断与控制。',
  },
  {
    number: '04',
    title: '落地执行',
    en: 'CRAFT & DELIVERY',
    text: '兼顾大胆创意与真实商业场景，交付可以直接进入传播渠道的高完成度作品。',
  },
]

const ArrowUpRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cursor, setCursor] = useState({ x: -100, y: -100 })
  const cursorRef = useRef(null)

  useEffect(() => {
    const move = (event) => setCursor({ x: event.clientX, y: event.clientY })
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.12 },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <main>
      <div
        ref={cursorRef}
        className="cursor-glow"
        style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
      />

      <section className="hero" id="home">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=2200&q=90"
        >
          <source
            src="https://videos.pexels.com/video-files/3141208/3141208-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-filter" />

        <header className="nav shell">
          <a className="brand" href="#home" aria-label="返回首页">
            RL<span>®</span>
          </a>
          <button
            className="menu-toggle"
            aria-label="切换导航"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
          <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
            <a href="#about" onClick={closeMenu}>关于</a>
            <a href="#projects" onClick={closeMenu}>作品</a>
            <a href="#capabilities" onClick={closeMenu}>能力</a>
          </nav>
          <a className="nav-contact" href="#contact">
            联系合作 <ArrowUpRight />
          </a>
        </header>

        <div className="hero-content shell">
          <div className="hero-kicker">
            <span>INDEPENDENT VISUAL DESIGNER</span>
            <span>SHANGHAI · CHINA</span>
          </div>
          <h1>
            <span>CREATE</span>
            <span className="outline">THE UNSEEN</span>
          </h1>
          <div className="hero-bottom">
            <div className="scroll-label">
              <span className="scroll-line" />
              SCROLL TO EXPLORE
            </div>
            <p>
              用视觉构建未被看见的世界。<br />
              聚焦品牌、数字艺术与生成式创意。
            </p>
          </div>
        </div>
        <div className="hero-index">©26 / PORTFOLIO</div>
      </section>

      <section className="about section shell" id="about">
        <div className="section-tag" data-reveal>
          <span>01</span>
          <span>ABOUT / PROFILE</span>
        </div>
        <div className="about-grid">
          <div className="portrait-wrap" data-reveal>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=90"
              alt="视觉设计师肖像"
            />
            <div className="portrait-mark">VISUAL / 01</div>
          </div>

          <div className="about-copy" data-reveal>
            <p className="eyebrow">HELLO, I'M A VISUAL DESIGNER</p>
            <h2>
              我相信好的视觉，<br />
              应该先让人<span>停下来</span>。
            </h2>
            <div className="bio-columns">
              <p>
                我是一名专注于品牌视觉、数字艺术与 AI 创意的独立设计师。擅长用克制的构图、鲜明的情绪和实验性的技术，为品牌创造独特的视觉身份。
              </p>
              <p>
                从一张主视觉到一套完整的视觉系统，我在策略与直觉之间寻找平衡，让创意既有锋芒，也能真正落地。
              </p>
            </div>
            <div className="profile-links">
              <a href="mailto:hello@redline.design">HELLO@REDLINE.DESIGN <ArrowUpRight /></a>
              <a href="#contact">SHANGHAI / AVAILABLE WORLDWIDE</a>
            </div>
          </div>
        </div>

        <div className="stats" data-reveal>
          <div><strong>08</strong><span>YEARS EXPERIENCE<br />设计经验</span></div>
          <div><strong>72+</strong><span>PROJECTS DONE<br />完成项目</span></div>
          <div><strong>19</strong><span>GLOBAL CLIENTS<br />合作品牌</span></div>
          <div><strong>11</strong><span>DESIGN AWARDS<br />设计奖项</span></div>
        </div>
      </section>

      <section className="projects section" id="projects">
        <div className="shell">
          <div className="section-tag" data-reveal>
            <span>02</span>
            <span>SELECTED / WORKS</span>
          </div>
          <div className="projects-heading" data-reveal>
            <h2>SELECTED<br /><span>PROJECTS</span></h2>
            <p>一组关于品牌、影像与<br />数字世界的视觉实验。</p>
          </div>
        </div>

        <div className="project-list shell">
          {projects.map((project) => (
            <article className="project-card" key={project.id} data-reveal>
              <div className="project-image">
                <img src={project.image} alt={project.title.replace('\n', ' ')} />
                <div className="project-overlay" />
                <div className="project-title">
                  <span>{project.id}</span>
                  <h3>{project.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h3>
                </div>
                <div className="project-open"><ArrowUpRight size={28} /></div>
              </div>
              <div className="project-meta">
                <span>{project.type}</span>
                <span>{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="capabilities section shell" id="capabilities">
        <div className="section-tag" data-reveal>
          <span>03</span>
          <span>WHAT / I DO</span>
        </div>
        <div className="capabilities-intro" data-reveal>
          <h2>IDEAS WITH<br /><span>AN EDGE.</span></h2>
          <p>不止于“好看”。我关心每一个视觉决定背后的意图、情绪与传播价值。</p>
        </div>
        <div className="capability-grid">
          {capabilities.map((item) => (
            <article className="capability-card" key={item.number} data-reveal>
              <div className="capability-top">
                <span>{item.number}</span>
                <span className="cap-cross">+</span>
              </div>
              <div>
                <p>{item.en}</p>
                <h3>{item.title}</h3>
                <div className="card-line" />
                <p className="capability-text">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="contact" id="contact">
        <div className="contact-noise" />
        <div className="contact-inner shell" data-reveal>
          <div className="section-tag contact-tag">
            <span>04</span>
            <span>LET'S / CONNECT</span>
          </div>
          <div className="contact-main">
            <p>HAVE A PROJECT IN MIND?</p>
            <h2>LET'S MAKE<br /><span>IT REAL.</span></h2>
            <a className="contact-button" href="mailto:hello@redline.design">
              <span>开始一个项目</span>
              <ArrowUpRight size={30} />
            </a>
          </div>
          <div className="contact-footer">
            <div>
              <p>CONTACT</p>
              <a href="mailto:hello@redline.design">HELLO@REDLINE.DESIGN</a>
            </div>
            <div>
              <p>SOCIAL</p>
              <a href="#home">BEHANCE</a>
              <a href="#home">INSTAGRAM</a>
              <a href="#home">XIAOHONGSHU</a>
            </div>
            <div className="back-top">
              <a href="#home">BACK TO TOP ↑</a>
              <span>© 2026 REDLINE STUDIO</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App
