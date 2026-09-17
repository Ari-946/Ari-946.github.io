import { useEffect, useRef } from 'react'
import { Mesh, Program, Renderer, Triangle } from 'ogl'
import './GlowCursor.css'

const MAX_POINTS = 64
const vertex = `attribute vec2 position;attribute vec2 uv;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,0.,1.);}`
const fragment = `
precision highp float;
#define MAX_POINTS 64
uniform vec2 uResolution;uniform vec2 uPoints[MAX_POINTS];uniform float uPointCount;
uniform vec3 uColor;uniform vec3 uSecondaryColor;uniform float uTrailWidth;uniform float uTaper;
uniform float uGlowIntensity;uniform float uGlowSpread;uniform float uHotspot;uniform float uBrightness;
uniform float uOpacity;uniform float uPulseSpeed;uniform float uNoiseStrength;uniform float uTime;uniform float uFade;
varying vec2 vUv;
float sRGB(float x){if(x<=.00031308)return 12.92*x;return 1.055*pow(x,1./2.4)-.055;}
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float grain(vec2 p,float t){float f=t*18.,i=mod(floor(f),256.),n=mod(i+1.,256.),b=fract(f);b=b*b*(3.-2.*b);return mix(hash(floor(p)+vec2(i*17.,i*31.)),hash(floor(p)+vec2(n*17.,n*31.)),b)*2.-1.;}
void main(){
 vec2 pixel=vUv*uResolution;float den=max(uPointCount-1.,1.),strongest=0.,coreMax=0.,weight=0.;vec3 sum=vec3(0.);
 for(int i=0;i<MAX_POINTS-1;i++){
  float idx=float(i),active=1.-step(uPointCount-1.,idx);vec2 a=uPoints[i],b=uPoints[i+1],to=pixel-a,seg=b-a;
  float along=clamp(dot(to,seg)/max(dot(seg,seg),.0001),0.,1.),progress=clamp((idx+along)/den,0.,1.);
  float life=pow(max(1.-progress,0.),mix(.55,1.25,uTaper));float width=uTrailWidth*mix(1.,.25,pow(progress,mix(.55,1.6,uTaper)));
  float d=length(to-seg*along),fall=max(width*(.8+uGlowSpread*1.4),.5),beam=min(1.,fall*fall/(d*d+fall*fall));
  float core=exp(-pow(d/max(width,.5),2.)*2.5),pulse=1.+sin(uTime*uPulseSpeed*3.-progress*11.)*.16*min(abs(uPulseSpeed),1.);
  float intensity=(core+beam*uGlowIntensity*.55)*life*pulse*active;vec3 c=mix(uColor,uSecondaryColor,progress);
  strongest=max(strongest,intensity);coreMax=max(coreMax,core*life*active);sum+=c*intensity;weight+=intensity;
 }
 float alpha=clamp(strongest*uOpacity*uFade,0.,1.);if(alpha<.0005)discard;
 vec3 color=sum/max(weight,.0001);color=mix(color,vec3(1.),smoothstep(.25,.95,coreMax)*uHotspot);
 float lum=sRGB(clamp(strongest*uBrightness,0.,1.));lum*=1.+grain(pixel,uTime)*(1.-exp(-uNoiseStrength*2.2))*.4;
 gl_FragColor=vec4(color*lum,alpha);
}`

const rgb = hex => {
  let v=hex.replace('#','');if(v.length===3)v=v.split('').map(x=>x+x).join('')
  const n=parseInt(v,16);return [((n>>16)&255)/255,((n>>8)&255)/255,(n&255)/255]
}
const clamp=(v,min,max)=>Math.min(Math.max(v,min),max)

export default function GlowCursor({color='#ff304a',secondaryColor='#67e8f9',trailLength=30,trailWidth=8,trailTaper=.8,followSpeed=.16,glowIntensity=1.9,glowSpread=1.2,hotspot=.65,brightness=1.25,opacity=1,pulseSpeed=1.1,noiseStrength=.035,idleTimeout=700,fadeDuration=900}){
 const canvasRef=useRef(null)
 useEffect(()=>{
  const canvas=canvasRef.current;if(!canvas)return
  const renderer=new Renderer({canvas,alpha:true,dpr:Math.min(devicePixelRatio||1,1.5)}),gl=renderer.gl;gl.clearColor(0,0,0,0)
  const data=Array(MAX_POINTS*2).fill(0),points=Array.from({length:MAX_POINTS},()=>({x:0,y:0})),target={x:0,y:0},head={x:0,y:0}
  const program=new Program(gl,{vertex,fragment,uniforms:{uResolution:{value:[1,1]},uPoints:{value:data},uPointCount:{value:trailLength},uColor:{value:rgb(color)},uSecondaryColor:{value:rgb(secondaryColor)},uTrailWidth:{value:trailWidth},uTaper:{value:trailTaper},uGlowIntensity:{value:glowIntensity},uGlowSpread:{value:glowSpread},uHotspot:{value:hotspot},uBrightness:{value:brightness},uOpacity:{value:opacity},uPulseSpeed:{value:pulseSpeed},uNoiseStrength:{value:noiseStrength},uTime:{value:0},uFade:{value:0}},transparent:true,depthTest:false,depthWrite:false})
  const mesh=new Mesh(gl,{geometry:new Triangle(gl),program});let initialized=false,inside=false,fade=0,lastInput=performance.now(),lastFrame=lastInput,raf=0,destroyed=false
  const resize=()=>{renderer.setSize(innerWidth,innerHeight);program.uniforms.uResolution.value=[innerWidth,innerHeight]}
  const move=e=>{const x=clamp(e.clientX,0,innerWidth),y=clamp(innerHeight-e.clientY,0,innerHeight);if(!initialized){target.x=head.x=x;target.y=head.y=y;points.forEach(p=>{p.x=x;p.y=y});initialized=true;fade=1}target.x=x;target.y=y;inside=true;lastInput=performance.now()}
  const leave=()=>{inside=false;lastInput=performance.now()}
  const render=now=>{if(destroyed)return;const delta=Math.min((now-lastFrame)/16.667,3);lastFrame=now
   if(initialized){const he=1-Math.pow(1-clamp(followSpeed,.01,.99),delta),ce=1-Math.pow(1-clamp(.28+followSpeed*.35,.08,.92),delta);head.x+=(target.x-head.x)*he;head.y+=(target.y-head.y)*he;points[0].x=head.x;points[0].y=head.y;for(let i=1;i<MAX_POINTS;i++){points[i].x+=(points[i-1].x-points[i].x)*ce;points[i].y+=(points[i-1].y-points[i].y)*ce}for(let i=0;i<MAX_POINTS;i++){data[i*2]=points[i].x;data[i*2+1]=points[i].y}}
   const shouldFade=!inside||now-lastInput>idleTimeout,targetFade=initialized&&!shouldFade?1:0;fade+=(targetFade-fade)*Math.min(1,(16.667*delta/Math.max(fadeDuration,16))*7);program.uniforms.uTime.value=now*.001;program.uniforms.uFade.value=fade;renderer.render({scene:mesh});raf=requestAnimationFrame(render)}
  resize();addEventListener('resize',resize);addEventListener('pointermove',move);document.documentElement.addEventListener('pointerleave',leave);raf=requestAnimationFrame(render)
  return()=>{destroyed=true;cancelAnimationFrame(raf);removeEventListener('resize',resize);removeEventListener('pointermove',move);document.documentElement.removeEventListener('pointerleave',leave)}
 },[color,secondaryColor,trailLength,trailWidth,trailTaper,followSpeed,glowIntensity,glowSpread,hotspot,brightness,opacity,pulseSpeed,noiseStrength,idleTimeout,fadeDuration])
 return <canvas ref={canvasRef} className="global-glow-cursor" aria-hidden="true"/>
}
