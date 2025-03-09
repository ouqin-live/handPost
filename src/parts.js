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

let fireworks =[] ;
let secondFireWorks = []
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
  if (hands.length > 0) {
    // 获取第一只手的食指尖和拇指尖关键点
    let finger = hands[0].middle_finger_tip; // 中指尖
    let thumb = hands[0].thumb_tip; // 拇指尖

    // 计算食指尖和拇指尖的中心位置
    let centerX = (finger.x + thumb.x) / 2;
    let centerY = (finger.y + thumb.y) / 2;

    // 计算食指尖和拇指尖之间的距离，用于表示“捏合”程度
    let currentPinch = dist(finger.x, finger.y, thumb.x, thumb.y);

    if (currentPinch > 80) {
      // 初始化烟花实例
      if(fireworks.length < 1){
        console.log(fireworks.length)
        fireworks.push({x:centerX,y:centerY})
      }
    }
  }
  if (hands.length > 1) {
    // 获取第一只手的食指尖和拇指尖关键点
    let finger = hands[1].middle_finger_tip; // 中指尖
    let thumb = hands[1].thumb_tip; // 拇指尖

    // 计算食指尖和拇指尖的中心位置
    let centerX = (finger.x + thumb.x) / 2;
    let centerY = (finger.y + thumb.y) / 2;

    // 计算食指尖和拇指尖之间的距离，用于表示“捏合”程度
    let currentPinch = dist(finger.x, finger.y, thumb.x, thumb.y);

    if (currentPinch > 80) {
      // 初始化烟花实例
      if(secondFireWorks.length < 1){
        console.log(secondFireWorks.length)
        secondFireWorks.push({x:centerX,y:centerY})
      }
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
  console.log(results)
}


// 开启烟花动画
setInterval(animationFrameCallback, 100)

function animationFrameCallback(timestamp) {

  if(fireworks.length > 0){
    window.Fireworks({
      x: fireworks[0].x,
      y: fireworks[0].y,
      colors: ["#FFD700", "#FF0000", "#FFA500", "#800080"],
    })
    fireworks.shift()
  }

  if(secondFireWorks.length > 0){
    window.Fireworks({
      x: secondFireWorks[0].x,
      y: secondFireWorks[0].y,
      colors: ["#FFD700", "#FF0000", "#FFA500", "#800080"],
    })
    secondFireWorks.shift()
  }
}
