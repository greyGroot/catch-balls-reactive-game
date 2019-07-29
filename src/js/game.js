import { Observable, fromEvent, interval, BehaviorSubject, Subject, combineLatest } from "rxjs";
import { switchMap, takeUntil, map, tap } from "rxjs/operators";

import GameState from './gameState';
import drawGame from './draw';

export default function game() {
  let startBtn = document.getElementById('start');

  const canvas = document.getElementById('gameCanvas');
  const canvasContext = canvas.getContext('2d');

  let framesPerSecond = 30;

  let gameState = new GameState({canvas, canvasContext});

  const Wave$ = new BehaviorSubject(gameState.getNewBallsWave());
  const Paddle$ = new BehaviorSubject(gameState.paddle);

  const WaveMove$ = interval(1000 / framesPerSecond)
    .pipe(
      map(() => Wave$.value.moveY()),
    );

  const start$ = fromEvent(startBtn, 'click')
    .pipe(
      tap(() => {
        drawGame(gameState, Wave$.value);
        console.log('after start', Wave$.value);
      }),
      switchMap(() => WaveMove$),
    );

  let mouseMove$ = fromEvent(document, 'mousemove')

  combineLatest(start$, Paddle$, mouseMove$).subscribe(([wave, paddle, mouseMove]) => {
    let isLevelLost = false;

    gameState = gameState.updatePaddlePosition(mouseMove);
    drawGame(gameState, wave);

    wave.balls = wave.balls.filter(ball => {
      if (
        ball.positionY > paddle.positionY &&
        ball.positionX > paddle.positionX &&
        ball.positionX < paddle.positionX + paddle.width
        ) {
        console.log('-------------Wow you just cached ball-------------');
        return false;
      } else if (ball.positionY > gameState.canvas.height) {
        isLevelLost = true;
        return true;
      } else {
        return true;
      }
    });

    if (!wave.balls.length) {
      gameState.increaseLevel();
      Wave$.next(gameState.getNewBallsWave());
      console.log('-------------LEVEl COMPLETED!-------------\nMove to next level:', gameState.currentLevel, '\nwave', wave);
    }

    if (isLevelLost) {
      Wave$.next(gameState.getNewBallsWave());
      console.log('-------------WASTED!-------------\nTry again:', gameState.currentLevel, '\nwave', wave);        
    }
  });
}