let seaweeds = []; // 儲存水草屬性的陣列

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute');
  canvas.style('z-index', '1'); // 將畫布層級設為 1，確保在 iframe 前面
  canvas.style('pointer-events', 'none'); // 禁用畫布的滑鼠事件，讓 iframe 可操作

  // 初始化水草屬性
  let baseColors = ['#FDEE00', '#FFBF00', '#ED9121', '#FDBCB4']; // 基本顏色
  for (let i = 0; i < 80; i++) { // 將水草數量增加到 80
    let baseColor = color(baseColors[int(random(baseColors.length))]); // 隨機選擇基本顏色
    baseColor.setAlpha(128); // 設定透明度為 0.5 (128/255)
    seaweeds.push({
      x: random(width), // 水草的初始 x 座標
      height: random(100, 200), // 水草的高度改為 100-200
      color: baseColor, // 使用固定透明度的顏色
      weight: random(20, 40), // 水草的粗細改為 20-40
      frequency: random(0.05, 0.2) // 水草搖晃的頻率
    });
  }

  // 創建 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.style('position', 'absolute');
  iframe.style('width', '80%');
  iframe.style('height', '80%');
  iframe.style('top', '10%');
  iframe.style('left', '10%');
  iframe.style('border', 'none');
  iframe.style('z-index', '0'); // 將 iframe 層級設為 0，確保在畫布後面
}

function draw() {
  clear(); // 清除畫布，讓背景透明

  blendMode(MULTIPLY); // 設定混合模式為 MULTIPLY，讓重疊處顏色較深

  // 繪製每條水草
  for (let seaweed of seaweeds) {
    let xBase = seaweed.x; // 底部保持穩定
    let y1 = height; // 底部起點
    let previousX = xBase; // 初始化上一節的 x 座標
    let previousY = y1; // 初始化上一節的 y 座標
    let segments = 10; // 將水草分為 10 段

    stroke(seaweed.color); // 設定水草顏色，確保整條水草顏色一致
    strokeWeight(seaweed.weight / 2); // 減少水草的粗細

    for (let i = 1; i <= segments; i++) {
      let segmentHeight = seaweed.height / segments; // 每段的高度
      let currentY = y1 - i * segmentHeight; // 當前段的 y 座標
      let currentX = seaweed.x + sin(frameCount * seaweed.frequency + i) * 5; // 減少擺動幅度

      // 繪製當前段
      line(previousX, previousY, currentX, currentY);

      // 更新上一段的座標
      previousX = currentX;
      previousY = currentY;
    }
  }

  blendMode(BLEND); // 恢復混合模式為默認
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  // 重新初始化水草位置
  for (let seaweed of seaweeds) {
    seaweed.x = random(width); // 更新水草的 x 座標
  }
}
