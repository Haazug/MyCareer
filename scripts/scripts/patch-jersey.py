from pathlib import Path
import shutil

p = Path('src/Locker3D.tsx')
s = p.read_text(encoding='utf-8')
a = s.count('function jerseyTexture(')
b = s.count('\nexport function Locker3D')
if a != 1 or b != 1:
    raise SystemExit(f'Esperava 1 e 1, encontrei {a} e {b}')

NEW = r'''function jerseyTexture(player:Player,color:string,club:string,crestDataUrl?:string){
 const design=clubKitDesign(club,color);
 const canvas=document.createElement('canvas');canvas.width=512;canvas.height=640;
 const ctx=canvas.getContext('2d')!;
 const body=new Path2D();
 body.moveTo(174,45);body.lineTo(220,25);body.quadraticCurveTo(256,43,292,25);body.lineTo(338,45);body.lineTo(455,130);body.lineTo(408,208);body.lineTo(357,178);body.lineTo(374,596);body.quadraticCurveTo(256,620,138,596);body.lineTo(155,178);body.lineTo(104,208);body.lineTo(57,130);body.closePath();
 ctx.save();ctx.clip(body);
 ctx.fillStyle=design.primary;ctx.fillRect(0,0,512,640);
 ctx.fillStyle=design.secondary;
 if(design.pattern==='shoulder'){for(const offset of [0,14,28]){ctx.beginPath();ctx.moveTo(112+offset,45);ctx.lineTo(142+offset,45);ctx.lineTo(205+offset,175);ctx.lineTo(175+offset,175);ctx.closePath();ctx.fill();ctx.beginPath();ctx.moveTo(400-offset,45);ctx.lineTo(370-offset,45);ctx.lineTo(307-offset,175);ctx.lineTo(337-offset,175);ctx.closePath();ctx.fill();}}
 else if(design.pattern==='vertical'){for(const x of [116,184,292,360])ctx.fillRect(x,20,28,610);}
 else if(design.pattern==='hoops'){for(const y of [205,320,440])ctx.fillRect(36,y,440,42);}
 else if(design.pattern==='sash'){ctx.beginPath();ctx.moveTo(80,76);ctx.lineTo(120,44);ctx.lineTo(458,574);ctx.lineTo(415,603);ctx.closePath();ctx.fill();}
 else if(design.pattern==='quarters'){ctx.fillRect(32,42,220,270);ctx.fillRect(254,312,220,300);}
 else if(design.pattern==='pinstripe'){for(const x of [148,176,336,364])ctx.fillRect(x,24,7,605);}
 else if(design.pattern==='diagonal'){ctx.beginPath();ctx.moveTo(35,70);ctx.lineTo(78,40);ctx.lineTo(450,568);ctx.lineTo(408,600);ctx.closePath();ctx.fill();}
 else if(design.pattern==='split'){ctx.fillRect(256,20,256,610);}
 else if(design.pattern==='chevrons'){for(const y of [220,340,460]){ctx.beginPath();ctx.moveTo(60,y-30);ctx.lineTo(256,y+26);ctx.lineTo(452,y-30);ctx.lineTo(452,y+8);ctx.lineTo(256,y+70);ctx.lineTo(60,y+8);ctx.closePath();ctx.fill();}}
 else if(design.pattern==='central'){ctx.fillRect(222,20,68,610);}
 else if(design.pattern==='wave'){for(const y of [240,355,470]){ctx.beginPath();ctx.moveTo(20,y);ctx.bezierCurveTo(150,y-70,340,y+70,492,y);ctx.lineTo(492,y+34);ctx.bezierCurveTo(340,y+104,150,y-36,20,y+34);ctx.closePath();ctx.fill();}}
 else if(design.pattern==='diamonds'){for(const y of [240,350,460]){ctx.beginPath();ctx.moveTo(256,y-34);ctx.lineTo(284,y);ctx.lineTo(256,y+34);ctx.lineTo(228,y);ctx.closePath();ctx.fill();}}
 else if(design.pattern==='bars'){for(const y of [220,300,380,460])ctx.fillRect(46,y,420,24);}
 else {ctx.fillRect(74,275,32,325);ctx.fillRect(406,275,32,325);}
 for(const m of [1,-1]){const X=(x:number)=>m===1?x:512-x;ctx.beginPath();ctx.moveTo(X(57),130);ctx.lineTo(X(104),208);ctx.lineTo(X(125),193);ctx.lineTo(X(78),115);ctx.closePath();ctx.fillStyle=design.secondary;ctx.fill();ctx.strokeStyle='rgba(0,0,0,.22)';ctx.lineWidth=2;ctx.stroke();}
 ctx.strokeStyle='rgba(0,0,0,.2)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(174,45);ctx.lineTo(155,178);ctx.moveTo(338,45);ctx.lineTo(357,178);ctx.stroke();
 const side=ctx.createLinearGradient(0,0,512,0);side.addColorStop(0,'rgba(0,0,0,.38)');side.addColorStop(.2,'rgba(0,0,0,0)');side.addColorStop(.5,'rgba(255,255,255,.05)');side.addColorStop(.8,'rgba(0,0,0,0)');side.addColorStop(1,'rgba(0,0,0,.38)');ctx.fillStyle=side;ctx.fillRect(0,0,512,640);
 const vert=ctx.createLinearGradient(0,0,0,640);vert.addColorStop(0,'rgba(255,255,255,.1)');vert.addColorStop(.45,'rgba(0,0,0,0)');vert.addColorStop(1,'rgba(0,0,0,.28)');ctx.fillStyle=vert;ctx.fillRect(0,0,512,640);
 for(const fx of [205,305]){const fold=ctx.createLinearGradient(fx-26,0,fx+26,0);fold.addColorStop(0,'rgba(0,0,0,0)');fold.addColorStop(.5,'rgba(0,0,0,.09)');fold.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=fold;ctx.fillRect(fx-26,215,52,390);}
 ctx.globalAlpha=.05;ctx.strokeStyle='#000000';ctx.lineWidth=1;for(let x=-640;x<512;x+=5){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+640,640);ctx.stroke();}ctx.globalAlpha=1;
 ctx.fillStyle='rgba(0,0,0,.22)';ctx.fillRect(100,583,320,4);
 ctx.beginPath();ctx.moveTo(214,24);ctx.quadraticCurveTo(256,98,298,24);ctx.closePath();ctx.fillStyle='rgba(0,0,0,.45)';ctx.fill();
 ctx.lineCap='round';ctx.strokeStyle=design.secondary;ctx.lineWidth=13;ctx.beginPath();ctx.moveTo(208,26);ctx.quadraticCurveTo(256,104,304,26);ctx.stroke();
 ctx.strokeStyle='rgba(0,0,0,.28)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(214,36);ctx.quadraticCurveTo(256,110,298,36);ctx.stroke();
 ctx.restore();
 ctx.strokeStyle='rgba(0,0,0,.35)';ctx.lineWidth=4;ctx.stroke(body);ctx.strokeStyle='rgba(255,255,255,.12)';ctx.lineWidth=1.5;ctx.stroke(body);
 if(!crestDataUrl){ctx.fillStyle=design.secondary;ctx.beginPath();ctx.moveTo(338,196);ctx.lineTo(370,208);ctx.lineTo(364,246);ctx.quadraticCurveTo(338,263,312,246);ctx.lineTo(306,208);ctx.closePath();ctx.fill();ctx.fillStyle='#17201a';ctx.beginPath();ctx.arc(338,224,17,0,Math.PI*2);ctx.fill();ctx.fillStyle=design.secondary;ctx.font='24px "Apple Color Emoji","Segoe UI Emoji",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(design.symbol,338,225);}
 const lum=(hex:string)=>{const v=Number.parseInt(hex.replace('#','').slice(0,6),16);return(((v>>16)&255)*.299+((v>>8)&255)*.587+(v&255)*.114)/255;};
 const ink=lum(design.primary)>.62?'#1b1f1c':'#f7f2e8';
 ctx.fillStyle=ink;ctx.textAlign='center';ctx.textBaseline='middle';ctx.font='700 23px Arial';ctx.fillText(primaryPlayerName(player.name).toLocaleUpperCase().slice(0,18),256,342);ctx.font='700 92px Arial';ctx.fillText(String(player.number).padStart(2,'0'),256,458);ctx.font='700 18px Arial';ctx.globalAlpha=.8;ctx.fillText(`${player.position} · ${player.overall}`,256,534);ctx.globalAlpha=1;
 const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=8;
 if(crestDataUrl){const image=new Image();image.onload=()=>{const k=Math.min(60/image.width,60/image.height);const w=image.width*k;const h=image.height*k;ctx.drawImage(image,338-w/2,226-h/2,w,h);texture.needsUpdate=true;};image.src=crestDataUrl;}
 return texture;
}
'''

start = s.index('function jerseyTexture(')
end = s.index('\nexport function Locker3D')
Path('work').mkdir(exist_ok=True)
shutil.copy(p, 'work/Locker3D.tsx.bak')
p.write_text(s[:start] + NEW + s[end:], encoding='utf-8')
print('ok, cópia de segurança em work/Locker3D.tsx.bak')