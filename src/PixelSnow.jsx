import { useCallback, useEffect, useMemo, useRef } from 'react'
import { Color, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial, Vector2, Vector3, WebGLRenderer } from 'three'
import './PixelSnow.css'

const vertexShader = `void main(){gl_Position=vec4(position,1.0);}`

const fragmentShader = `
precision mediump float;
uniform float uTime; uniform vec2 uResolution; uniform float uFlakeSize;
uniform float uMinFlakeSize; uniform float uPixelResolution; uniform float uSpeed;
uniform float uDepthFade; uniform float uFarPlane; uniform vec3 uColor;
uniform float uBrightness; uniform float uGamma; uniform float uDensity;
uniform float uVariant; uniform float uDirection;
#define PI_OVER_6 0.5235988
#define PI_OVER_3 1.0471976
#define M1 1597334677U
#define M2 3812015801U
#define M3 3299493293U
#define F0 2.3283064e-10
#define hash(n) (n*(n^(n>>15)))
#define coord3(p) (uvec3(p).x*M1^uvec3(p).y*M2^uvec3(p).z*M3)
const vec3 camK=vec3(.57735027); const vec3 camI=vec3(.70710678,0.,-.70710678);
const vec3 camJ=vec3(-.40824829,.81649658,-.40824829); const vec2 b1d=vec2(.574,.819);
vec3 hash3(uint n){uvec3 h=hash(n)*uvec3(1U,511U,262143U);return vec3(h)*F0;}
float snowflakeDist(vec2 p){
  float r=length(p),a=atan(p.y,p.x);a=abs(mod(a+PI_OVER_6,PI_OVER_3)-PI_OVER_6);
  vec2 q=r*vec2(cos(a),sin(a)); float dm=max(abs(q.y),max(-q.x,q.x-1.));
  float t1=clamp(dot(q-vec2(.4,0.),b1d),0.,.4); float d1=length(q-vec2(.4,0.)-t1*b1d);
  float t2=clamp(dot(q-vec2(.7,0.),b1d),0.,.25); float d2=length(q-vec2(.7,0.)-t2*b1d);
  return min(dm,min(d1,d2))*10.;
}
void main(){
  float ips=1./uPixelResolution,ps=max(1.,floor(.5+uResolution.x*ips)),ip=1./ps;
  vec2 fc=floor(gl_FragCoord.xy*ip),res=uResolution*ip; float irx=1./res.x;
  vec3 ray=normalize(vec3((fc-res*.5)*irx,1.)); ray=ray.x*camI+ray.y*camJ+ray.z*camK;
  float ts=uTime*uSpeed; float wx=cos(uDirection)*.4,wy=sin(uDirection)*.4;
  vec3 cp=(wx*camI+wy*camJ+.1*camK)*ts,pos=cp;
  vec3 ar=max(abs(ray),vec3(.001)),strides=1./ar,rs=step(ray,vec3(0.)),phase=fract(pos)*strides;
  phase=mix(strides-phase,phase,rs); float rdk=1./dot(ray,camK),idf=1./uDepthFade,hir=.5*irx;
  vec3 ta=ts*.1*vec3(7.,8.,5.); float t=0.;
  for(int i=0;i<128;i++){
    if(t>=uFarPlane)break; vec3 fp=floor(pos); uint cc=coord3(fp); float ch=hash3(cc).x;
    if(ch<uDensity){
      vec3 h=hash3(cc),f=.5-.5*cos(4.*sin(fp.yzx*.073)+4.*sin(fp.zxy*.27)+2.*h+ta); f=f*.8+.1+fp;
      float ti=dot(f-pos,camK)*rdk;
      if(ti>0.){
        vec3 tp=pos+ray*ti-f; float tx=dot(tp,camI),ty=dot(tp,camJ); vec2 uv=abs(vec2(tx,ty));
        float dep=dot(f-cp,camK),fs=max(uFlakeSize,uMinFlakeSize*dep*hir),dist;
        if(uVariant<.5)dist=max(uv.x,uv.y);else if(uVariant<1.5)dist=length(uv);else dist=snowflakeDist(vec2(tx,ty)/fs)*fs;
        if(dist<fs){float fr=uFlakeSize/fs;float ins=exp2(-(t+ti)*idf)*min(1.,fr*fr)*uBrightness;gl_FragColor=vec4(uColor*pow(vec3(ins),vec3(uGamma)),1.);return;}
      }
    }
    float ns=min(min(phase.x,phase.y),phase.z);vec3 sel=step(phase,vec3(ns));phase=phase-ns+strides*sel;t+=ns;pos=mix(pos+ray*ns,floor(pos+ray*ns+.5),sel);
  }
  gl_FragColor=vec4(0.);
}`

export default function PixelSnow({ color='#fff', flakeSize=.01, minFlakeSize=1.25, pixelResolution=200, speed=1.25, depthFade=8, farPlane=20, brightness=1, gamma=.4545, density=.3, variant='square', direction=125, className='', style={} }) {
  const containerRef=useRef(null), animationRef=useRef(0), visibleRef=useRef(true)
  const rendererRef=useRef(null), materialRef=useRef(null), resizeRef=useRef(null)
  const variantValue=useMemo(()=>variant==='round'?1:variant==='snowflake'?2:0,[variant])
  const colorVector=useMemo(()=>{const c=new Color(color);return new Vector3(c.r,c.g,c.b)},[color])
  const resize=useCallback(()=>{clearTimeout(resizeRef.current);resizeRef.current=setTimeout(()=>{const c=containerRef.current,r=rendererRef.current,m=materialRef.current;if(!c||!r||!m)return;const w=c.offsetWidth,h=c.offsetHeight;r.setSize(w,h);m.uniforms.uResolution.value.set(w,h)},100)},[])

  useEffect(()=>{const c=containerRef.current;if(!c)return;const o=new IntersectionObserver(([e])=>{visibleRef.current=e.isIntersecting});o.observe(c);return()=>o.disconnect()},[])
  useEffect(()=>{
    const c=containerRef.current;if(!c)return
    const scene=new Scene(),camera=new OrthographicCamera(-1,1,1,-1,0,1)
    const renderer=new WebGLRenderer({antialias:false,alpha:true,premultipliedAlpha:false,powerPreference:'high-performance',stencil:false,depth:false})
    renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(c.offsetWidth,c.offsetHeight);renderer.setClearColor(0x000000,0);c.appendChild(renderer.domElement);rendererRef.current=renderer
    const material=new ShaderMaterial({vertexShader,fragmentShader,uniforms:{uTime:{value:0},uResolution:{value:new Vector2(c.offsetWidth,c.offsetHeight)},uFlakeSize:{value:flakeSize},uMinFlakeSize:{value:minFlakeSize},uPixelResolution:{value:pixelResolution},uSpeed:{value:speed},uDepthFade:{value:depthFade},uFarPlane:{value:farPlane},uColor:{value:colorVector.clone()},uBrightness:{value:brightness},uGamma:{value:gamma},uDensity:{value:density},uVariant:{value:variantValue},uDirection:{value:direction*Math.PI/180}},transparent:true})
    materialRef.current=material;const geometry=new PlaneGeometry(2,2);scene.add(new Mesh(geometry,material));addEventListener('resize',resize)
    const start=performance.now();const animate=()=>{animationRef.current=requestAnimationFrame(animate);if(visibleRef.current){material.uniforms.uTime.value=(performance.now()-start)*.001;renderer.render(scene,camera)}};animate()
    return()=>{cancelAnimationFrame(animationRef.current);removeEventListener('resize',resize);clearTimeout(resizeRef.current);if(c.contains(renderer.domElement))c.removeChild(renderer.domElement);renderer.dispose();renderer.forceContextLoss();geometry.dispose();material.dispose();rendererRef.current=null;materialRef.current=null}
  },[resize])
  useEffect(()=>{const m=materialRef.current;if(!m)return;Object.assign(m.uniforms.uFlakeSize,{value:flakeSize});m.uniforms.uMinFlakeSize.value=minFlakeSize;m.uniforms.uPixelResolution.value=pixelResolution;m.uniforms.uSpeed.value=speed;m.uniforms.uDepthFade.value=depthFade;m.uniforms.uFarPlane.value=farPlane;m.uniforms.uBrightness.value=brightness;m.uniforms.uGamma.value=gamma;m.uniforms.uDensity.value=density;m.uniforms.uVariant.value=variantValue;m.uniforms.uDirection.value=direction*Math.PI/180;m.uniforms.uColor.value.copy(colorVector)},[flakeSize,minFlakeSize,pixelResolution,speed,depthFade,farPlane,brightness,gamma,density,variantValue,direction,colorVector])
  return <div ref={containerRef} className={`pixel-snow-container ${className}`} style={style}/>
}
