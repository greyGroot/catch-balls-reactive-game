export default function drawGame(state, wave) {
  const { canvas, paddle } = state;
  const canvasContext = canvas.getContext('2d');

  colorRect(0,0, canvas.width,canvas.height, 'black');
  colorRect(paddle.positionX, canvas.height - paddle.distFromEdge, paddle.width, paddle.height, paddle.color);
  colorBalls(wave, );


  function colorCircle(centerX,centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY, radius, 0,Math.PI*2, true);
    canvasContext.fill();
  }

  function colorBalls(wave) {
    const { balls } = wave;
    balls.forEach(item => {
      colorCircle(item.positionX, item.positionY, item.radius, item.color);
    });
  }

  function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
  }
}