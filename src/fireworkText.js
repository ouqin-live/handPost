/**
 * 👋 你好！这是一个使用 ml5.js 创建并共享的示例。
 * 了解更多关于 ml5.js 项目的信息：https://ml5js.org/
 * ml5.js 许可证和行为准则：https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * 这个示例演示了如何通过 ml5.handPose 跟踪手部的特定部分。
 */

// 声明全局变量

let handPose; // 用于存储 ml5.handPose 模型的实例
let video; // 用于存储来自摄像头的视频流
let hands = []; // 存储检测到的手部关键点数据

// 用于跟踪拇指和食指之间的“捏合”距离
let pinch = 0;

let showFireWork = false;
let showFireText = false;
let canvas;



/**
 * 预加载函数，在 setup() 之前运行，用于加载 ml5.handPose 模型。
 */
function preload() {
  // 加载 handPose 模型
  handPose = ml5.handPose();
}

/**
 * 设置函数，在预加载完成后运行，初始化画布和视频捕捉。
 */
function setup() {
  createCanvas(640, 480); // 创建一个 640x480 像素的画布

  // 创建摄像头视频捕捉，并隐藏原始视频元素
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // 开始从摄像头视频中检测手部
  handPose.detectStart(video, gotHands);
  canvas = document.createElement("canvas");
  document.body.appendChild(canvas);
}

/**
 * 绘制函数，每帧都会调用，用于显示视频和处理手部数据。
 */
function draw() {
  // 在画布上绘制摄像头视频
  image(video, 0, 0, width, height);

  // 如果检测到至少一只手
  // if (hands.length > 0) {
  //   // 获取第一只手的食指尖和拇指尖关键点
  //   let finger = hands[0].middle_finger_tip; // 中指尖
  //   let thumb = hands[0].thumb_tip; // 拇指尖

  //   // 计算食指尖和拇指尖的中心位置
  //   let centerX = (finger.x + thumb.x) / 2;
  //   let centerY = (finger.y + thumb.y) / 2;

  //   // 计算食指尖和拇指尖之间的距离，用于表示“捏合”程度
  //   let currentPinch = dist(finger.x, finger.y, thumb.x, thumb.y);

  //   if (currentPinch > 80) {
  //     // 初始化烟花实例
  //     showFireWork = true;
  //   } else {
  //     showFireWork = false;
  //   }
  // }
  if (hands.length > 1) {
    // 获取第一只手的食指尖和拇指尖关键点
    let finger = hands[0].middle_finger_tip; // 中指尖
    let thumb = hands[0].thumb_tip; // 拇指尖

    // 计算食指尖和拇指尖之间的距离，用于表示“捏合”程度
    let currentPinch = dist(finger.x, finger.y, thumb.x, thumb.y);

    if (currentPinch > 80) {
      // 初始化烟花实例
      //     // 初始化烟花实例
      showFireWork = true;
    } else {
      showFireWork = false;
    }

    let finger1 = hands[1].middle_finger_tip; // 中指尖
    let thumb1 = hands[1].thumb_tip; // 拇指尖

    let currentPinch1 = dist(finger1.x, finger1.y, thumb1.x, thumb1.y);

    if (currentPinch1 > 80) {
      // 初始化烟花实例
      //     // 初始化烟花实例
      showFireText = true;
    } else {
      showFireText = false;
    }
  }
}

/**
 * 回调函数，当 handPose 检测到手部数据时调用。
 * @param {Array} results - 检测到的手部关键点数据。
 */
function gotHands(results) {
  // 将检测结果保存到 hands 变量中
  hands = results;
  console.log(results);
}

// 开启烟花动画
setInterval(animationFrameCallback, 100);

let container = null;

async function animationFrameCallback() {
  console.log("showFireWork:", showFireWork);
  console.log("container:", container);
  if (showFireWork & (container === null)) {
    container = await tsParticles.load({
      id: "tsparticles",
      options: {
        preset: "fireworks",
        background: {
          color: "transparent", // 设置背景为透明
        },
      },
    });
    const canvas = document.querySelector("#tsparticles canvas");
    if (canvas) {
      canvas.style.backgroundColor = "transparent";
    }
  } else if (container && !showFireWork) {
    container.destroy("tsparticles");
    container = null;
  }

  if(showFireText && document.querySelector(".firework-text").style.opacity==0){
    const text = document.querySelector(".firework-text");
    text.style.opacity = 1
    
  }else if(!showFireText && document.querySelector(".firework-text").style.opacity==1){
    const text = document.querySelector(".firework-text");
    text.style.opacity = 0
  }
}
