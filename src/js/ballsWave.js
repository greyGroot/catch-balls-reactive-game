export default class BallsWave {
  constructor({width, height}, level) {
    this.speed = level;
    this.balls = this.setBalls(width, height, level)
  }

  moveY() {
    this.balls.map(rock => {
      rock.positionY += this.speed;
    });
    return this;
  }

  setBalls(width, height, quantity) {
    return Array(quantity)
      .fill({})
      .map(item => {
        let radius = this.constructor.getRadius();
        let color = this.constructor.getColor();
        let positionX = this.getPositionX(width, radius);
        let positionY = -1 * this.getPositionY(height, radius, quantity);
        let catched = false;
        return { radius, color, positionX, positionY, catched };
      });
  }

  static getColor() {
    const CHARTS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    let color = '#';
    for (let i = 0; i < 6; i++) {
      let randomChartIndex = Math.floor(Math.random() * CHARTS.length);
      color += CHARTS[randomChartIndex];
    }
    return color;
  }

  static getRadius() {
    return Math.round((Math.random() * (15 - 3) + 3));
  }

  getPositionX(width, radius) {
    return Math.round(Math.random() * (width - radius * 2)) + radius;
  }

  getPositionY(height, radius, quantity) {
    return Math.round(Math.random() * (height / 10 * quantity - radius * 2)) + radius;
  }
}