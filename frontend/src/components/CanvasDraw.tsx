// most of the code referenced from: https://www.youtube.com/watch?v=FLESHMJ-bI0

import React, { useEffect, useRef, useState } from 'react';

const CanvasDraw: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parentDiv = canvas?.parentElement;

    if (canvas && parentDiv) {
      canvas.width = parentDiv.clientWidth * 2;
      canvas.height = parentDiv.clientHeight * 2;
      canvas.style.width = `${parentDiv.clientWidth}px`;
      canvas.style.height = `${parentDiv.clientHeight}px`;

      const context = canvas.getContext("2d");
      if (context) {
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 30;
        contextRef.current = context;
      }
    }
  }, []);

  const startDraw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDraw = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current?.lineTo(offsetX, offsetY);
    contextRef.current?.stroke();
  };

  return (
    <canvas
      id="draw-one"
      onMouseDown={startDraw}
      onMouseUp={finishDraw}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
};

export default CanvasDraw;