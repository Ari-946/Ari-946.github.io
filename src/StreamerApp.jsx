import { useEffect, useState } from 'react'
import { siteContent } from './siteContent.js'
import './streamer.css'

const Arrow = ({ size = 18 }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.5" /></svg>
const SmartImage = ({ src, alt }) => <img src={src} alt={alt} loading="lazy" onError={(e) => { e.currentTarget.style.opacity = '0'; e.currentTarget.parentElement?.classList.add('image-missing') }} />

export default function StreamerApp() {
  const { creator, moments, gallery, memes, cards } = siteContent
  const [selectedImage, setSelectedImage] = useState(null)
  const [copied, setCopied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: .1 })
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedImage])

  const copyRoom = async () => {
    try { await navigator.clipboard.writeText(creator.roomId.replaceAll(' ', '')); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { setCopied(false) }
  }

  return <main className="fan-site">
    <header className="fan-topbar">
      <a className="fan-brand" href="#home">LUMI<span>FAN</span></a>
      <button className="fan-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '关闭' : '菜单'}</button>
      <nav className={menuOpen ? 'fan-nav open' : 'fan-nav'}>
        <a href="#about" onClick={() => setMenuOpen(false)}>关于她</a><a href="#moments" onClick={() => setMenuOpen(false)}>高能瞬间</a><a href="#memes" onClick={() => setMenuOpen(false)}>表情包</a><a href="#cards" onClick={() => setMenuOpen(false)}>收藏卡</a>
      </nav>
      <a className="fan-live-link" href={creator.liveUrl}><i /> 进入直播间 <Arrow /></a>
    </header>

    <section className="fan-hero" id="home">
      <div className="fan-hero-photo"><SmartImage src={creator.heroImage} alt={`${creator.chineseName}首页照片`} /></div><div className="fan-hero-shade" /><div className="fan-hero-grid" />
      <div className="fan-hero-content fan-width"><div className="fan-live-badge"><i /> LIVE CREATOR / FAN SITE</div><h1>{creator.name}</h1><p className="fan-hero-role">{creator.role}</p><div className="fan-hero-bottom"><p>{creator.slogan.split('\n').map(line => <span key={line}>{line}</span>)}</p><a href="#moments">开始浏览 <span>↓</span></a></div></div>
      <div className="fan-hero-side">UNOFFICIAL FAN ARCHIVE · 2026</div>
    </section>

    <section className="fan-about fan-section fan-width" id="about">
      <SectionLabel number="01" text="ABOUT / CREATOR" />
      <div className="fan-about-layout"><div className="fan-profile-photo" data-reveal><SmartImage src={creator.avatar} alt={`${creator.chineseName}头像`} /><span>PROFILE PHOTO</span></div><div className="fan-about-copy" data-reveal><p className="fan-red-caption">HEY, THIS IS {creator.handle}</p><h2>欢迎来到<br /><em>{creator.chineseName}</em>的宇宙。</h2><p className="fan-description">{creator.description}</p><div className="fan-room-line"><span>直播间号码</span><strong>{creator.roomId}</strong><button onClick={copyRoom}>{copied ? '已复制 ✓' : '复制号码'}</button></div></div></div>
      <div className="fan-stats" data-reveal><Stat value={creator.followers} label="FOLLOWERS / 关注者" /><Stat value={creator.liveDays} label="LIVE DAYS / 直播日" /><Stat value={creator.clips} label="MOMENTS / 名场面" /><Stat value="∞" label="LOVE / 喜欢" /></div>
    </section>

    <section className="fan-moments fan-section" id="moments"><div className="fan-width">
      <SectionLabel number="02" text="ICONIC / MOMENTS" /><Heading title="高能" outline="瞬间" text="这里适合放直播截图、切片封面或活动照片。横版构图会有最好的展示效果。" />
      <div className="fan-moment-list">{moments.map(moment => <article className="fan-moment-card" key={moment.number} data-reveal><div className="fan-moment-image"><SmartImage src={moment.image} alt={moment.title.replace('\n','')} /><span className="fan-slot-label">IMAGE SLOT {moment.number}</span><span className="fan-moment-number">{moment.number}</span></div><div className="fan-moment-info"><p>{moment.tag}</p><h3>{moment.title.split('\n').map(line => <span key={line}>{line}</span>)}</h3><blockquote>{moment.note}</blockquote></div></article>)}</div>
    </div></section>

    <section className="fan-gallery fan-section"><div className="fan-width"><SectionLabel number="03" text="PHOTO / WALL" /><div className="fan-gallery-title" data-reveal><h2>PHOTO DUMP</h2><p>点击任意图片可以放大查看</p></div><div className="fan-photo-grid">{gallery.map((image,index) => <button className="fan-photo-cell" key={`${image}-${index}`} onClick={() => setSelectedImage(image)} data-reveal><SmartImage src={image} alt={`主播照片 ${index + 1}`} /><span>0{index + 1}</span><i><Arrow size={24}/></i></button>)}</div></div></section>

    <section className="fan-memes fan-section" id="memes"><div className="fan-width"><SectionLabel number="04" text="MEME / PACK" /><Heading title="表情包" outline="补给站" text="每格都预留了正方形图片位。未填写图片时显示 Emoji，替换为透明 PNG 效果最佳。" /><div className="fan-meme-grid">{memes.map((meme,index) => <article className="fan-meme-card" key={meme.title} data-reveal><div className="fan-meme-image">{meme.image ? <SmartImage src={meme.image} alt={meme.title}/> : <span>{meme.emoji}</span>}<small>MEME SLOT 0{index+1}</small></div><div className="fan-meme-copy"><strong>{meme.title}</strong><p>{meme.caption}</p></div></article>)}</div></div></section>

    <section className="fan-cards fan-section" id="cards"><div className="fan-width"><SectionLabel number="05" text="FAN / COLLECTION" /><Heading title="限定" outline="收藏卡" text="为不同活动、造型或直播节点制作专属卡片。悬停卡面可以看到镭射光效果。" /><div className="fan-card-grid">{cards.map(card => <article className="fan-collect-card" key={card.id} data-reveal><div className="fan-card-inner"><div className="fan-card-photo"><SmartImage src={card.image} alt={card.title}/><div className="fan-holo"/></div><div className="fan-card-meta"><span>{card.id}</span><b>{card.rarity}</b></div><h3>{card.title}</h3><p>{card.subtitle}</p></div></article>)}</div></div></section>

    <footer className="fan-footer"><div className="fan-width fan-footer-inner" data-reveal><p>THANKS FOR WATCHING · 谢谢你的每一次出现</p><h2>下次直播<br/><span>不见不散。</span></h2><a className="fan-footer-button" href={creator.liveUrl}>去直播间等她 <Arrow size={28}/></a><div className="fan-footer-bottom"><span>UNOFFICIAL FAN SITE / MADE WITH LOVE</span><a href={`mailto:${creator.email}`}>{creator.email}</a><a href="#home">BACK TO TOP ↑</a></div></div></footer>

    {selectedImage && <div className="fan-lightbox" onClick={() => setSelectedImage(null)} role="dialog" aria-modal="true"><button onClick={() => setSelectedImage(null)}>关闭 ×</button><img src={selectedImage} alt="放大预览"/></div>}
  </main>
}

function SectionLabel({ number, text }) { return <div className="fan-section-label" data-reveal><span>{number}</span><p>{text}</p><i /></div> }
function Stat({ value, label }) { return <div><strong>{value}</strong><span>{label}</span></div> }
function Heading({ title, outline, text }) { return <div className="fan-section-heading" data-reveal><h2>{title}<br/><span>{outline}</span></h2><p>{text}</p></div> }
