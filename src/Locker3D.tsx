import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { Player } from './model';

type Props={players:Player[];club:string;color:string;onSelect:(id:string)=>void};
type Direction='forward'|'back'|'left'|'right'|'turnLeft'|'turnRight';

function labelTexture(title:string,subtitle:string){
 const canvas=document.createElement('canvas');canvas.width=512;canvas.height=144;
 const ctx=canvas.getContext('2d')!;ctx.fillStyle='#24251f';ctx.fillRect(0,0,512,144);
 ctx.fillStyle='#b89b59';ctx.fillRect(14,16,4,112);ctx.fillStyle='#e6dfcc';ctx.font='700 30px Arial';ctx.fillText(title.toUpperCase().slice(0,28),36,69);
 ctx.fillStyle='#aaad9e';ctx.font='20px Arial';ctx.fillText(subtitle.toUpperCase().slice(0,42),36,108);
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;return texture;
}
function jerseyTexture(player:Player,color:string){
 const canvas=document.createElement('canvas');canvas.width=512;canvas.height=640;
 const ctx=canvas.getContext('2d')!;
 const grad=ctx.createLinearGradient(0,0,512,0);grad.addColorStop(0,'#22272a');grad.addColorStop(.22,color);grad.addColorStop(.52,color);grad.addColorStop(.8,color);grad.addColorStop(1,'#22272a');
 ctx.fillStyle=grad;ctx.beginPath();ctx.moveTo(174,45);ctx.lineTo(220,25);ctx.quadraticCurveTo(256,43,292,25);ctx.lineTo(338,45);ctx.lineTo(455,130);ctx.lineTo(408,208);ctx.lineTo(357,178);ctx.lineTo(374,596);ctx.quadraticCurveTo(256,620,138,596);ctx.lineTo(155,178);ctx.lineTo(104,208);ctx.lineTo(57,130);ctx.closePath();ctx.fill();
 ctx.strokeStyle='#ffffff22';ctx.lineWidth=5;ctx.stroke();
 ctx.fillStyle='#ded7c7';ctx.beginPath();ctx.arc(256,50,34,0,Math.PI);ctx.lineWidth=11;ctx.strokeStyle='#e2ddcf';ctx.stroke();
 ctx.textAlign='center';ctx.fillStyle='#f1ebdc';ctx.font='700 35px Arial';ctx.fillText(player.name.split(' ').slice(-1)[0].toUpperCase().slice(0,14),256,155);
 ctx.fillStyle='#f5f0e4';ctx.font='700 190px Arial';ctx.fillText(String(player.number).padStart(2,'0'),256,493);
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=8;return texture;
}

export function Locker3D({players,club,color,onSelect}:Props){
 const host=useRef<HTMLDivElement>(null);const select=useRef(onSelect);select.current=onSelect;
 const[status,setStatus]=useState('Use W/A/S/D ou as setas para percorrer as cabines.');
 const[locked,setLocked]=useState(false);
 useEffect(()=>{
  const element=host.current;if(!element)return;
  const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75));renderer.setSize(element.clientWidth,element.clientHeight);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.02;element.appendChild(renderer.domElement);
  const scene=new THREE.Scene();scene.background=new THREE.Color('#171916');scene.fog=new THREE.FogExp2('#171916',.027);
  const camera=new THREE.PerspectiveCamera(66,element.clientWidth/element.clientHeight,.06,100);camera.position.set(0,1.57,1.5);
  const room=new THREE.Group();scene.add(room);
  scene.add(new THREE.HemisphereLight('#d4d0be','#27251f',1.0));
  const main=new THREE.DirectionalLight('#ffe9bd',2.0);main.position.set(-3,7,5);main.castShadow=true;main.shadow.mapSize.set(1024,1024);main.shadow.camera.left=-12;main.shadow.camera.right=12;main.shadow.camera.top=24;main.shadow.camera.bottom=-24;scene.add(main);
  const wood=new THREE.MeshStandardMaterial({color:'#30281d',roughness:.74});const floorMat=new THREE.MeshStandardMaterial({color:'#39372f',roughness:.83});const brass=new THREE.MeshStandardMaterial({color:'#a8894c',metalness:.68,roughness:.31});const benchMat=new THREE.MeshStandardMaterial({color:'#413126',roughness:.57});
  const floor=new THREE.Mesh(new THREE.BoxGeometry(6.4,.18,58),floorMat);floor.position.set(0,-.09,-26);floor.receiveShadow=true;room.add(floor);
  const ceiling=new THREE.Mesh(new THREE.BoxGeometry(6.4,.16,58),new THREE.MeshStandardMaterial({color:'#25251f',roughness:.86}));ceiling.position.set(0,3.55,-26);room.add(ceiling);
  for(const side of [-1,1]){
   const wall=new THREE.Mesh(new THREE.BoxGeometry(.17,3.55,58),wood);wall.position.set(side*3.05,1.77,-26);wall.receiveShadow=true;room.add(wall);
   for(let z=-54;z<3;z+=.48){const groove=new THREE.Mesh(new THREE.BoxGeometry(.035,3.35,.025),new THREE.MeshStandardMaterial({color:'#4a4030',roughness:.85}));groove.position.set(side*2.955,1.78,z);room.add(groove);}
   const bench=new THREE.Mesh(new THREE.BoxGeometry(.54,.12,56),benchMat);bench.position.set(side*2.62,.48,-26);bench.castShadow=true;bench.receiveShadow=true;room.add(bench);
   const benchLegGeo=new THREE.BoxGeometry(.055,.45,.07);for(let z=-53;z<3;z+=3){const leg=new THREE.Mesh(benchLegGeo,brass);leg.position.set(side*2.62,.23,z);room.add(leg);}
  }
  for(let z=1;z>-56;z-=4){const bar=new THREE.Mesh(new THREE.BoxGeometry(5.7,.055,.055),brass);bar.position.set(0,3.22,z);room.add(bar);const light=new THREE.PointLight('#ffe2ae',12,6,1.75);light.position.set(0,3.04,z-.25);room.add(light);const diffuser=new THREE.Mesh(new THREE.BoxGeometry(1.7,.045,.18),new THREE.MeshStandardMaterial({color:'#d9ccb0',emissive:'#e1ca98',emissiveIntensity:.6}));diffuser.position.set(0,3.17,z-.25);room.add(diffuser);}
  const pickTargets:THREE.Object3D[]=[];const playerObject=new Map<THREE.Object3D,string>();const hangingKits:{group:THREE.Group;velocity:number}[]=[];
  const models=players.slice(0,36);
  models.forEach((p,i)=>{
   const side=i%2===0?-1:1;const row=Math.floor(i/2);const z=-2-row*4.6;const x=side*2.43;
   const cabin=new THREE.Group();cabin.position.set(x,0,z);cabin.rotation.y=side===-1?Math.PI/2:-Math.PI/2;room.add(cabin);
   const frameMat=brass;const postGeo=new THREE.BoxGeometry(.045,2.66,.045);
   for(const px of [-.66,.66]){const post=new THREE.Mesh(postGeo,frameMat);post.position.set(px,1.55,0);cabin.add(post);}
   const topBar=new THREE.Mesh(new THREE.BoxGeometry(1.38,.055,.055),frameMat);topBar.position.set(0,2.84,0);cabin.add(topBar);
   const back=new THREE.Mesh(new THREE.BoxGeometry(1.28,2.12,.075),new THREE.MeshStandardMaterial({color:'#28241c',roughness:.85}));back.position.set(0,1.48,-.08);back.receiveShadow=true;cabin.add(back);
   const hook=new THREE.Mesh(new THREE.TorusGeometry(.105,.018,6,16,Math.PI*1.6),brass);hook.position.set(0,2.73,.02);hook.rotation.x=Math.PI/2;cabin.add(hook);
   const rail=new THREE.Mesh(new THREE.BoxGeometry(.78,.055,.055),brass);rail.position.set(0,2.6,.12);cabin.add(rail);
   const hanger=new THREE.Mesh(new THREE.TorusGeometry(.105,.015,6,16,Math.PI*1.65),brass);hanger.position.set(0,2.51,.12);hanger.rotation.x=Math.PI/2;cabin.add(hanger);
   const jerseyGeo=new THREE.PlaneGeometry(1.15,1.43,1,1);const jerseyMat=new THREE.MeshStandardMaterial({map:jerseyTexture(p,color),roughness:.56,metalness:.015,side:THREE.DoubleSide,transparent:true,alphaTest:.015});
   const shirtRig=new THREE.Group();shirtRig.position.set(0,1.73,.135);cabin.add(shirtRig);hangingKits.push({group:shirtRig,velocity:0});const shirt=new THREE.Mesh(jerseyGeo,jerseyMat);shirt.castShadow=true;shirtRig.add(shirt);
   const trim=new THREE.Mesh(new THREE.BoxGeometry(.83,.27,.08),new THREE.MeshStandardMaterial({color:'#ded9cc',roughness:.58}));trim.position.set(0,2.49,.09);cabin.add(trim);
   const plate=new THREE.Mesh(new THREE.PlaneGeometry(1.23,.33),new THREE.MeshStandardMaterial({map:labelTexture(p.name,`${String(p.number).padStart(2,'0')}  ·  ${p.position}  ·  ${p.overall} OVR`),roughness:.7,side:THREE.DoubleSide}));plate.position.set(0,3.03,.02);cabin.add(plate);
   const clicker=new THREE.Mesh(new THREE.PlaneGeometry(1.34,2.65),new THREE.MeshBasicMaterial({transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false}));clicker.position.set(0,1.57,.2);clicker.userData.playerId=p.id;cabin.add(clicker);pickTargets.push(clicker);playerObject.set(clicker,p.id);
  });
  const keys=new Set<string>();const ray=new THREE.Raycaster();const pointer=new THREE.Vector2();let yaw=0;let dragId:number|null=null;let lastX=0;let lastY=0;let running=true;
  camera.rotation.order='YXZ';
  const down=(e:KeyboardEvent)=>{if(['KeyW','KeyA','KeyS','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)){e.preventDefault();keys.add(e.code);}};
  const up=(e:KeyboardEvent)=>keys.delete(e.code);
  const lock=()=>setLocked(document.pointerLockElement===renderer.domElement);
  const move=(e:MouseEvent)=>{if(document.pointerLockElement===renderer.domElement){yaw-=e.movementX*.0022;camera.rotation.y=yaw;camera.rotation.x=THREE.MathUtils.clamp(camera.rotation.x-e.movementY*.0018,-.55,.55);}else if(dragId!==null){yaw-=(e.clientX-lastX)*.004;camera.rotation.y=yaw;lastX=e.clientX;lastY=e.clientY;}};
  const pointerDown=(e:PointerEvent)=>{if(e.pointerType==='touch'||e.pointerType==='pen'){dragId=e.pointerId;lastX=e.clientX;lastY=e.clientY;}};
  const pointerUp=()=>{dragId=null;};
  const click=(e:MouseEvent)=>{const rect=renderer.domElement.getBoundingClientRect();pointer.x=(e.clientX-rect.left)/rect.width*2-1;pointer.y=-(e.clientY-rect.top)/rect.height*2+1;ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(pickTargets,false)[0];if(hit){const id=playerObject.get(hit.object);if(id){document.exitPointerLock?.();select.current(id);}}};
  const resize=()=>{if(!element.clientWidth)return;camera.aspect=element.clientWidth/element.clientHeight;camera.updateProjectionMatrix();renderer.setSize(element.clientWidth,element.clientHeight);};
  window.addEventListener('keydown',down);window.addEventListener('keyup',up);document.addEventListener('pointerlockchange',lock);window.addEventListener('mousemove',move);renderer.domElement.addEventListener('pointerdown',pointerDown);window.addEventListener('pointerup',pointerUp);renderer.domElement.addEventListener('click',click);window.addEventListener('resize',resize);
  let previous=performance.now();let raf=0;
  const frame=(now:number)=>{if(!running)return;const delta=Math.min((now-previous)/1000,.04);previous=now;const forward=Number(keys.has('KeyW')||keys.has('ArrowUp'))-Number(keys.has('KeyS')||keys.has('ArrowDown'));const strafe=Number(keys.has('KeyD'))-Number(keys.has('KeyA'));const turn=Number(keys.has('ArrowRight'))-Number(keys.has('ArrowLeft'));yaw-=turn*delta*1.5;camera.rotation.y=yaw;
   const vector=new THREE.Vector3(strafe,0,forward);if(vector.lengthSq())vector.normalize().multiplyScalar(delta*2.8).applyAxisAngle(new THREE.Vector3(0,1,0),yaw);camera.position.x=THREE.MathUtils.clamp(camera.position.x+vector.x,-2.35,2.35);camera.position.z=THREE.MathUtils.clamp(camera.position.z+vector.z,-55,1.3);const breeze=Math.sin(now*.0013)*.006+(vector.lengthSq()?Math.sin(now*.009)*.035:0);for(const kit of hangingKits){const target=THREE.MathUtils.clamp(breeze-vector.x*.35,-.09,.09);kit.velocity+=(target-kit.group.rotation.z)*delta*8-kit.velocity*delta*2.8;kit.group.rotation.z+=kit.velocity*delta;}renderer.render(scene,camera);raf=requestAnimationFrame(frame);};raf=requestAnimationFrame(frame);
  return()=>{running=false;cancelAnimationFrame(raf);keys.clear();window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);document.removeEventListener('pointerlockchange',lock);window.removeEventListener('mousemove',move);renderer.domElement.removeEventListener('pointerdown',pointerDown);window.removeEventListener('pointerup',pointerUp);renderer.domElement.removeEventListener('click',click);window.removeEventListener('resize',resize);renderer.dispose();renderer.domElement.remove();scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();const materials=Array.isArray(o.material)?o.material:[o.material];materials.forEach(m=>{if('map'in m&&m.map)m.map.dispose();m.dispose();});}});};
 },[players,club,color]);
 const hold=(direction:Direction,down:boolean)=>{const code:Record<Direction,string>={forward:'KeyW',back:'KeyS',left:'KeyA',right:'KeyD',turnLeft:'ArrowLeft',turnRight:'ArrowRight'};const event=new KeyboardEvent(down?'keydown':'keyup',{code:code[direction],bubbles:true});window.dispatchEvent(event);};
 return <section className="locker3d-shell"><div className="locker3d-header"><div><strong>BALNEÁRIO / {club.toUpperCase()}</strong><span>{players.length} cabines · camisolas de demonstração editáveis</span></div><button className="button subtle" type="button" onClick={()=>host.current?.querySelector('canvas')?.requestPointerLock?.()}>{locked?'Exploração ativa':'Explorar com rato'}</button></div><div className="locker3d-world" ref={host} aria-label="Balneário 3D interativo"><div className="locker3d-crosshair"/><div className="locker3d-hint" role="status">{status}</div><div className="locker3d-pad"><button aria-label="Andar para a frente" onPointerDown={()=>hold('forward',true)} onPointerUp={()=>hold('forward',false)} onPointerLeave={()=>hold('forward',false)}>↑</button><div><button aria-label="Andar para a esquerda" onPointerDown={()=>hold('left',true)} onPointerUp={()=>hold('left',false)} onPointerLeave={()=>hold('left',false)}>←</button><button aria-label="Andar para trás" onPointerDown={()=>hold('back',true)} onPointerUp={()=>hold('back',false)} onPointerLeave={()=>hold('back',false)}>↓</button><button aria-label="Andar para a direita" onPointerDown={()=>hold('right',true)} onPointerUp={()=>hold('right',false)} onPointerLeave={()=>hold('right',false)}>→</button></div></div><span className="locker3d-source">MODELO ARQUITETÓNICO PRÓPRIO · SEM EMBLEMAS OU CAMISOLAS LICENCIADOS</span></div><div className="locker3d-footer"><span>Clica numa cabine para abrir a ficha. Arrasta a câmara no telemóvel.</span><button className="text-link" onClick={()=>setStatus('Modo de demonstração: a sala tem materiais e camisolas próprios. Nenhum emblema, patrocínio ou letra oficial é usado.')}>Sobre a cena</button></div></section>;
}
