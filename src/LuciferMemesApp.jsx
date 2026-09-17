import LuciferApp from './LuciferApp.jsx'
import { siteContent } from './siteContent.js'
import './meme-overrides.css'

// 01—08 严格对应用户提供的 GIF 顺序。
siteContent.memes = [
  { title: '欢迎~欢迎~', caption: '', emoji: '', image: '/images/memes/01-welcome.gif' },
  { title: '洗澡澡~', caption: '', emoji: '', image: '/images/memes/02-bath.gif' },
  { title: '键盘和鼠标', caption: '', emoji: '', image: '/images/memes/03-keyboard.gif' },
  { title: '合体！', caption: '', emoji: '', image: '/images/memes/04-unite.gif' },
  { title: '666', caption: '', emoji: '', image: '/images/memes/05-666.gif' },
  { title: '开始耍帅~', caption: '', emoji: '', image: '/images/memes/06-cool.gif' },
  { title: '喊麦~', caption: '', emoji: '', image: '/images/memes/07-sing.gif' },
  { title: '林中鸟？', caption: '', emoji: '', image: '/images/memes/08-bird.gif' },
]

export default function LuciferMemesApp() {
  return <LuciferApp />
}
