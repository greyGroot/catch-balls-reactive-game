import BallsWave from "./ballsWave";

export default class GameState {
  constructor({canvas, canvasContext}, paddle = {width: 200, height: 40, color: 'green', positionX: 100}) {
    this.currentLevel = 1;
    this.canvas = canvas;
    this.canvasContext = canvasContext;
    this.paddle = {
      distFromEdge: this.canvas.height * 0.15,
      width: paddle.width,
      height: paddle.height,
      color: paddle.color,
      positionX: paddle.positionX,
      positionY: this.canvas.height - this.canvas.height * 0.1
    }
  }

  updatePaddlePosition(evt) {
    let rect = this.canvas.getBoundingClientRect();
    let root = document.documentElement;

    let mouseX = evt.clientX - rect.left - root.scrollLeft;

    this.paddle.positionX = mouseX - this.paddle.width / 2;

    return this;
  }

  increaseLevel() {
    this.currentLevel++;
    return this;
  }

  restart() {
    this.currentLevel = 1;
    return this;
  }

  getNewBallsWave() {
    return new BallsWave(this.canvas, this.currentLevel);
  }
}