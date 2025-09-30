import { getContext, FPS } from "./utils-module.js";

document.title = "ทุ่งนาในฝัน";
document.addEventListener("DOMContentLoaded", main);
function main(ev) {
	const ctx = getContext("#myCanvas");
	   const config = {
		   bgColor : "white",
		   debug : true,
	   };

	   function resizeCanvas() {
		   ctx.canvas.width = window.innerWidth;
		   ctx.canvas.height = window.innerHeight;
	   }
	   window.addEventListener('resize', resizeCanvas);
	   resizeCanvas();

	   // วาดท้องฟ้า
	   function drawSky(ctx, w, h) {
		   ctx.fillStyle = '#87ceeb';
		   ctx.fillRect(0, 0, w, h);
	   }

	   // วาดภูเขาหลายลูก
	   function drawMountains(ctx, w, h) {
		   // ลูกที่ 1 (ซ้ายสุด)
		   ctx.fillStyle = '#888';
		   ctx.beginPath();
		   ctx.moveTo(0, h*0.78);
		   ctx.lineTo(w*0.15, h*0.48);
		   ctx.lineTo(w*0.32, h*0.78);
		   ctx.closePath();
		   ctx.fill();
		   // ลูกที่ 2 (กลางซ้าย)
		   ctx.fillStyle = '#aaa';
		   ctx.beginPath();
		   ctx.moveTo(w*0.18, h*0.75);
		   ctx.lineTo(w*0.38, h*0.42);
		   ctx.lineTo(w*0.58, h*0.75);
		   ctx.closePath();
		   ctx.fill();
		   // ลูกที่ 3 (กลางขวา)
		   ctx.fillStyle = '#bbb';
		   ctx.beginPath();
		   ctx.moveTo(w*0.45, h*0.78);
		   ctx.lineTo(w*0.65, h*0.5);
		   ctx.lineTo(w*0.85, h*0.78);
		   ctx.closePath();
		   ctx.fill();
		   // ลูกที่ 4 (ขวาสุด)
		   ctx.fillStyle = '#999';
		   ctx.beginPath();
		   ctx.moveTo(w*0.7, h*0.8);
		   ctx.lineTo(w*0.88, h*0.6);
		   ctx.lineTo(w, h*0.8);
		   ctx.closePath();
		   ctx.fill();
	   }

	   // วาดพระอาทิตย์ (หยุดนิ่ง)
	   function drawSun(ctx, w, h) {
		   ctx.beginPath();
		   ctx.arc(w*0.8, h*0.2, 40, 0, Math.PI*2);
		   ctx.fillStyle = 'yellow';
		   ctx.fill();
	   }

	   // วาดท้องนา
	   function drawField(ctx, w, h) {
		   ctx.fillStyle = '#b6e388';
		   ctx.fillRect(0, h*0.7, w, h*0.3);
	   }

	   // วาดต้นไม้
	   function drawTree(ctx, x, y) {
		   ctx.fillStyle = '#8d5524';
		   ctx.fillRect(x-15, y, 30, 90);
		   ctx.beginPath();
		   ctx.arc(x, y, 60, 0, Math.PI*2);
		   ctx.fillStyle = '#2ecc40';
		   ctx.fill();
	   }
    // วาดแม่น้ำ 
	   function drawRiver(ctx, w, h) {
		   ctx.save();
		   ctx.beginPath();
		   ctx.moveTo(w*0.48, h*0.7); 
		   ctx.lineTo(w*0.58, h*0.7);
		   ctx.lineTo(w*0.7, h);
		   ctx.lineTo(w*0.36, h);
		   ctx.closePath();
		   ctx.fillStyle = '#3498db';
		   ctx.globalAlpha = 0.7;
		   ctx.fill();
		   ctx.globalAlpha = 1.0;
		   ctx.restore();
	   }
	   // วาดบ้าน (พร้อมประตู)
	   function drawHouse(ctx, x, y) {
		   // ตัวบ้าน
		   ctx.fillStyle = '#ffe0b2';
		   ctx.fillRect(x, y, 160, 120);
		   // หลังคา
		   ctx.fillStyle = '#b5651d';
		   ctx.beginPath();
		   ctx.moveTo(x - 20, y);
		   ctx.lineTo(x + 80, y - 70);
		   ctx.lineTo(x + 180, y);
		   ctx.closePath();
		   ctx.fill();
		   // ประตูบ้าน
		   ctx.fillStyle = '#a0522d';
		   ctx.fillRect(x + 65, y + 70, 30, 50);
	   }
	   // ตัวแปรตำแหน่งเมฆ
	   let cloud1X = 0, cloud2X = 0;

	   function drawCloud(ctx, x, y, scale) {
		   ctx.save();
		   ctx.translate(x, y);
		   ctx.scale(scale, scale);
		   ctx.beginPath();
		   ctx.arc(0, 0, 22, 0, Math.PI*2);
		   ctx.arc(20, -8, 20, 0, Math.PI*2);
		   ctx.arc(40, 0, 18, 0, Math.PI*2);
		   ctx.arc(20, 12, 16, 0, Math.PI*2);
		   ctx.arc(10, 8, 15, 0, Math.PI*2);
		   ctx.closePath();
		   ctx.fillStyle = '#fff';
		   ctx.globalAlpha = 0.88;
		   ctx.fill();
		   ctx.globalAlpha = 1.0;
		   ctx.restore();
	   }

	   let lastTime = 0;
	   function animate(time) {
		   FPS.update();
		   let w = ctx.canvas.width;
		   let h = ctx.canvas.height;
		   if (!lastTime) lastTime = time;
		   let dt = (time - lastTime) / 1000;
		   lastTime = time;

		   // อัปเดตตำแหน่งเมฆ
		   if (typeof cloud1X !== 'number' || cloud1X === 0) cloud1X = w * 0.7;
		   if (typeof cloud2X !== 'number' || cloud2X === 0) cloud2X = w * 0.3;
		   cloud1X -= dt * w * 0.07;
		   cloud2X -= dt * w * 0.04;
		   if (cloud1X < -100) cloud1X = w + 100;
		   if (cloud2X < -100) cloud2X = w + 100;

		   drawSky(ctx, w, h);
		   drawCloud(ctx, cloud1X, h*0.18, 0.7);
		   drawCloud(ctx, cloud2X, h*0.28, 1.0);
		   drawSun(ctx, w, h);
		   drawMountains(ctx, w, h);
		   drawField(ctx, w, h);
		   drawRiver(ctx, w, h);
		   drawTree(ctx, w*0.25, h*0.8);
		   drawTree(ctx, w*0.7, h*0.82);
		   drawHouse(ctx, w*0.3, h*0.62);

		   if (config.debug) FPS.show(ctx, 10, 28);
		   requestAnimationFrame(animate);
	   }
	   requestAnimationFrame(animate);
}