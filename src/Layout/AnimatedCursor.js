import React, { useState, useEffect } from 'react';

const getComplementaryColor = (color) => {
  const r = 255 - color.r;
  const g = 255 - color.g;
  const b = 255 - color.b;
  return { r, g, b };
}

const NUM_CURSORS = 8;

const AnimatedCursor = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [positions, setPositions] = useState(Array(NUM_CURSORS).fill(cursorPos));
  const [hoveredElement, setHoveredElement] = useState(null);

  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', moveCursor);
    document.body.style.cursor = 'none';  // 기본 마우스 커서 숨기기

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.body.style.cursor = 'auto';
    };
  }, []);

  useEffect(() => {
    const updatePositions = () => {
      setPositions([cursorPos]);
    };

    const id = requestAnimationFrame(updatePositions);
    return () => cancelAnimationFrame(id);
  }, [cursorPos]);

  useEffect(() => {
    const checkHover = (e) => {
      if (e.target.matches('a, button, [data-cursor-hover]')) {
        setHoveredElement(e.target);
      } else {
        setHoveredElement(null);
      }
    };

    document.addEventListener('mouseover', checkHover);

    return () => {
      document.removeEventListener('mouseover', checkHover);
    };
  }, []);

  let backgroundColor = 'rgba(197, 22, 5, 0.8)';
  let cursorSize = '15px';

  if (hoveredElement) {
    const bgColor = getComputedStyle(hoveredElement).backgroundColor;
    const colorMatch = bgColor.match(/\((\d+), (\d+), (\d+)(, [\d.]+)?\)/);
    if (colorMatch) {
      const color = {
        r: parseInt(colorMatch[1], 10),
        g: parseInt(colorMatch[2], 10),
        b: parseInt(colorMatch[3], 10)
      };
      const complementary = getComplementaryColor(color);
      backgroundColor = `rgba(${complementary.r}, ${complementary.g}, ${complementary.b}, 0.8)`;
      cursorSize = '50px';
    }
  }

  return (
    <>
      {positions.map((pos, index) => {
        const style = {
          top: `${pos.y}px`,
          left: `${pos.x}px`,
          width: cursorSize,
          height: cursorSize,
          backgroundColor,
          borderRadius: '50%', 
          position: 'fixed',   
          pointerEvents: 'none', 
          zIndex: 9999,         
          transform: 'translate(-50%, -50%)', 
          transition: 'width 0.2s, height 0.2s' 
        };
        return <div key={index} className="animated-cursor" style={style}></div>;
      })}
    </>
  );
};

export default AnimatedCursor;
