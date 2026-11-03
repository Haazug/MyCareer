from pathlib import Path
import re
p = Path('src/Locker3D.tsx'); s = p.read_text(encoding='utf-8')
if 'lockerLayout' in s: raise SystemExit('já aplicado')

LAYOUT = r'''function lockerLayout(n:number){
 const S=1.5,back=Math.min(n,10),rest=Math.max(0,n-back),sideL=Math.ceil(rest/2),sideR=rest-sideL;
 const W=Math.max(9,back*S+2.4),D=Math.max(8,Math.max(sideL,sideR)*S+3.4);
 const slots:{x:number;z:number;rot:number}[]=[];
 for(let k=0;k<sideL;k++)slots.push({x:-W/2+.54,z:-1.8-k*S,rot:Math.PI/2});
 for(let k=0;k<back;k++)slots.push({x:(k-(back-1)/2)*S,z:-D+.54,rot:0});
 for(let k=0;k<sideR;k++)slots.push({x:W/2-.54,z:-1.8-(sideR-1-k)*S,rot:-Math.PI/2});
 return{W,D,slots};
}
'''

NEWBLOCK = r'''  const models=players.slice(0,36);const layout=lockerLayout(models.length);const roomLength=layout.D;const roomW=layout.W;const zFront=3.25;const roomDepth=roomLength+zFront;const zMid=(zFront-roomLength)/2;const kitD=clubKitDesign(club,color);
  const lum=(c:string)=>new THREE.Color(c).getHSL({h:0,s:0,l:0}).l;
  const wood=new THREE.MeshStandardMaterial({color:lum(style.wallColor)>.35?'#1c1b19':style.wallColor,roughness:.8});const slat=new THREE.MeshStandardMaterial({color:'#0b0b0a',roughness:.9});
  const floorMat=new THREE.MeshStandardMaterial({color:'#121211',roughness:.24,metalness:.3});const brass=new THREE.MeshStandardMaterial({color:lum(style.accentColor)>.75?'#b8923f':style.accentColor,metalness:.6,roughness:.34});const benchMat=new THREE.MeshStandardMaterial({color:'#262522',roughness:.55});
  const glowCanvas=document.createElement('canvas');glowCanvas.width=128;glowCanvas.height=128;const gctx=glowCanvas.getContext('2d')!;const gg=gctx.createRadialGradient(64,64,4,64,64,64);gg.addColorStop(0,'rgba(255,255,255,1)');gg.addColorStop(1,'rgba(255,255,255,0)');gctx.fillStyle=gg;gctx.fillRect(0,0,128,128);const glowTex=new THREE.CanvasTexture(glowCanvas);
  const floor=new THREE.Mesh(new THREE.BoxGeometry(roomW+.4,.18,roomDepth),floorMat);floor.position.set(0,-.09,zMid);floor.receiveShadow=true;room.add(floor);
  const floorBadge=new THREE.Mesh(new THREE.PlaneGeometry(4.6,4.6),new THREE.MeshStandardMaterial({map:clubBadgeTexture(club,color,style,crestDataUrl),roughness:.3,metalness:.15}));floorBadge.rotation.x=-Math.PI/2;floorBadge.position.set(0,.012,zMid-.5);room.add(floorBadge);
  const ceiling=new THREE.Mesh(new THREE.BoxGeometry(roomW+.4,.16,roomDepth),new THREE.MeshStandardMaterial({color:'#0e0e0d',roughness:.9}));ceiling.position.set(0,3.55,zMid);room.add(ceiling);
  const badgeTex=clubBadgeTexture(club,color,style,crestDataUrl);const ceilingBadge=new THREE.Mesh(new THREE.PlaneGeometry(6,6),new THREE.MeshStandardMaterial({map:badgeTex,emissiveMap:badgeTex,emissive:'#ffffff',emissiveIntensity:.8,roughness:.8,side:THREE.DoubleSide}));ceilingBadge.rotation.set(Math.PI/2,0,Math.PI);ceilingBadge.position.set(0,3.455,zMid-.5);room.add(ceilingBadge);
  const ceilingPanel=new THREE.Mesh(new THREE.PlaneGeometry(4.5,1.9),new THREE.MeshStandardMaterial({map:ceilingTexture(style),roughness:.78,side:THREE.DoubleSide}));ceilingPanel.rotation.x=Math.PI/2;ceilingPanel.position.set(0,3.455,1.2);room.add(ceilingPanel);
  for(const side of [-1,1]){
   const wall=new THREE.Mesh(new THREE.BoxGeometry(.17,3.55,roomDepth),wood);wall.position.set(side*(roomW/2+.085),1.77,zMid);wall.receiveShadow=true;room.add(wall);
   for(let z=zFront-.3;z>-roomLength;z-=.48){const g=new THREE.Mesh(new THREE.BoxGeometry(.035,3.35,.025),slat);g.position.set(side*(roomW/2-.01),1.78,z);room.add(g);}
   const bench=new THREE.Mesh(new THREE.BoxGeometry(.54,.12,roomLength-2.1),benchMat);bench.position.set(side*(roomW/2-.345),.48,(.1-roomLength)/2);bench.castShadow=true;bench.receiveShadow=true;room.add(bench);
   const legGeo=new THREE.BoxGeometry(.055,.45,.07);for(let z=-1.3;z>-roomLength+1.2;z-=3){const leg=new THREE.Mesh(legGeo,brass);leg.position.set(side*(roomW/2-.345),.23,z);room.add(leg);}
  }
  const endWall=new THREE.Mesh(new THREE.BoxGeometry(roomW+.4,3.55,.18),wood);endWall.position.set(0,1.77,-roomLength-.09);room.add(endWall);
  for(let x=-roomW/2+.3;x<roomW/2;x+=.48){const g=new THREE.Mesh(new THREE.BoxGeometry(.025,3.35,.035),slat);g.position.set(x,1.78,-roomLength+.01);room.add(g);}
  const backBench=new THREE.Mesh(new THREE.BoxGeometry(roomW-1.4,.12,.54),benchMat);backBench.position.set(0,.48,-roomLength+.345);backBench.receiveShadow=true;room.add(backBench);
  const frontWall=new THREE.Mesh(new THREE.BoxGeometry(roomW+.4,3.55,.18),wood);frontWall.position.set(0,1.77,zFront+.09);room.add(frontWall);
  const signC=document.createElement('canvas');signC.width=512;signC.height=128;const sctx=signC.getContext('2d')!;sctx.fillStyle='#0f0f0e';sctx.fillRect(0,0,512,128);sctx.fillStyle='#d4af5a';sctx.font='700 42px Arial';sctx.textAlign='center';sctx.fillText(`${club.toLocaleUpperCase().slice(0,22)} · BALNEÁRIO`,256,78);const signTex=new THREE.CanvasTexture(signC);signTex.colorSpace=THREE.SRGBColorSpace;const sign=new THREE.Mesh(new THREE.PlaneGeometry(2.8,.7),new THREE.MeshBasicMaterial({map:signTex,side:THREE.DoubleSide}));sign.position.set(0,2.7,zFront-.02);sign.rotation.y=Math.PI;room.add(sign);
  for(const lz of [zMid+roomDepth*.28,zMid,zMid-roomDepth*.28]){const lamp=new THREE.PointLight(style.lightColor,7*style.lighting/68,roomDepth*.7,1.6);lamp.position.set(0,3.1,lz);room.add(lamp);}
  const wash=new THREE.PointLight(kitD.primary,5,12,1.6);wash.position.set(0,2.6,-roomLength+2);room.add(wash);
'''

def rep(old, new):
    global s
    n = s.count(old)
    if n != 1: raise SystemExit(f'Esperava 1, encontrei {n}: {old[:80]}')
    s = s.replace(old, new)

a = s.find("  const models=players.slice(0,36);"); b = s.find("  const pickTargets:THREE.Object3D[]=[]")
if s.count("  const models=players.slice(0,36);") != 1 or b < a or a < 0: raise SystemExit('não encontrei as âncoras do bloco da cena')
s = s[:a] + NEWBLOCK + s[b:]

rep("export function Locker3D(", LAYOUT + "export function Locker3D(")
rep("scene.background=new THREE.Color('#111110');scene.fog=new THREE.FogExp2('#111110',.025);", "scene.background=new THREE.Color('#0a0a09');scene.fog=new THREE.FogExp2('#0a0a09',.014);")
rep("new THREE.HemisphereLight('#eee7d9','#24221f',.85)", "new THREE.HemisphereLight('#eee7d9','#24221f',.3)")
rep("DirectionalLight(style.lightColor,1.65*style.lighting/68)", "DirectionalLight(style.lightColor,.55*style.lighting/68)")
rep("const side=i%2===0?-1:1;const row=Math.floor(i/2);const z=-2-row*4.6;const x=side*2.43;", "const slot=layout.slots[i];const z=slot.z;const x=slot.x;")
rep("cabin.rotation.y=side===-1?Math.PI/2:-Math.PI/2;room.add(cabin);",
    "cabin.rotation.y=slot.rot;room.add(cabin);const glow=new THREE.Mesh(new THREE.PlaneGeometry(1.6,2.7),new THREE.MeshBasicMaterial({map:glowTex,color:'#ffe7b0',transparent:true,opacity:.55,blending:THREE.AdditiveBlending,depthWrite:false}));glow.position.set(0,1.6,-.03);cabin.add(glow);")
rep("const jerseyMat=new THREE.MeshStandardMaterial({map:jerseyTexture(p,color,club,crestDataUrl),roughness:.56,",
    "const jerseyMap=jerseyTexture(p,color,club,crestDataUrl);const jerseyMat=new THREE.MeshStandardMaterial({map:jerseyMap,emissiveMap:jerseyMap,emissive:'#ffffff',emissiveIntensity:.4,roughness:.56,")
rep("plate.position.set(0,3.03,.02);",
    "const pm=plate.material as THREE.MeshStandardMaterial;pm.emissive=new THREE.Color('#ffffff');pm.emissiveMap=pm.map;pm.emissiveIntensity=.9;plate.position.set(0,3.03,.02);")
rep("camera.position.x+vector.x,-2.35,2.35)", "camera.position.x+vector.x,-(layout.W/2-1.6),layout.W/2-1.6)")
rep("-roomLength+2,3.1)", "-roomLength+1.5,3.1)")

pat = re.compile(r"const side=next%2===0\?-1:1;.*?camera\.rotation\.set\(0,yaw,0\);\}", re.S)
if len(pat.findall(s)) != 1: raise SystemExit('não encontrei o jumpToCabin')
s = pat.sub(lambda m: "const slot=lockerLayout(count).slots[next];const camera=cameraRef.current;if(camera){camera.position.set(slot.x+Math.sin(slot.rot)*2.3,1.68,slot.z+Math.cos(slot.rot)*2.3);camera.fov=50;camera.updateProjectionMatrix();yawRef.current=slot.rot;camera.rotation.set(0,slot.rot,0);}", s)

p.write_text(s, encoding='utf-8'); print('ok')
