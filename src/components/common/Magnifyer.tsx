import React, { useEffect, useRef } from 'react';

interface MagnifierProps {
  imageUrl: string;
  largeImageUrl: string;
  zoomFactor: number;
  imgAlt: string;
  glassDimension: number;
  glassBorderColor: string;
  glassBorderWidth: number;
}

interface MousePosition {
  x: number;
  y: number;
}

enum CursorType {
  NONE = 'none',
  NORMAL = 'normal',
}

const Magnifier: React.FC<MagnifierProps> = ({
  imageUrl,
  largeImageUrl,
  zoomFactor,
  imgAlt,
  glassDimension,
  glassBorderColor,
  glassBorderWidth,
}) => {
  const imgEl = useRef<HTMLImageElement>(null);
  const glass = useRef<HTMLDivElement>(null);
  const touchMoveListenerAdded = useRef<boolean>(false);

  useEffect(() => {
    const img = imgEl.current;
    const glassDiv = glass.current;

    const handleMouseMove = (evt: any): void => {
      evt.preventDefault();
      const isTouch = evt.type === 'touchmove' || evt.type === 'touchstart';
      handleImagePosition(evt as MouseEvent, isTouch);
    };

    const handleTouchStart = (evt: TouchEvent) => {
      evt.preventDefault();

      if (touchMoveListenerAdded.current) {
        img?.removeEventListener('touchmove', handleMouseMove);
        touchMoveListenerAdded.current = false;
      }

      if (evt.targetTouches[0].target !== img) {
        removeGlass();
        if (glassDiv) {
          glassDiv.style.opacity = '0';
        }
        return;
      }

      if (glassDiv) {
        glassDiv.style.opacity = '1';
      }
      img?.addEventListener('touchmove', handleMouseMove);
      touchMoveListenerAdded.current = true;
    };

    const handleTouchEnd = (evt: TouchEvent) => {
      evt.preventDefault();
      img?.removeEventListener('touchmove', handleMouseMove);
      touchMoveListenerAdded.current = false;
      removeGlass();
      if (glassDiv) {
        glassDiv.style.opacity = '0';
      }
    };

    const removeGlass = () => {
      window.requestAnimationFrame(() => {
        if (img) {
          img.style.cursor = CursorType.NORMAL;
        }
      });
    };

    const handleImagePosition = (evt: any, touch: boolean = false) => {
      const target = touch ? evt.targetTouches[0].target : evt.target;

      if (target !== img) {
        removeGlass();
        return;
      }

      window.requestAnimationFrame(() => {
        const cursorPosition: MousePosition = {
          x: touch ? evt.targetTouches[0].pageX : evt.pageX,
          y: touch ? evt.targetTouches[0].pageY : evt.pageY,
        };
        const imgRect: ClientRect = img!.getBoundingClientRect();
        const glassOffset: number = glassDiv!.offsetWidth / 2;
        const bgrLeft: number =
          zoomFactor * (cursorPosition.x - imgRect.left) - glassOffset;
        const bgrTop: number =
          zoomFactor * (cursorPosition.y - imgRect.top) - glassOffset;

        if (img) {
          img.style.cursor = CursorType.NONE;
        }
        if (glassDiv) {
          glassDiv.style.left = `${cursorPosition.x - glassOffset}px`;
          glassDiv.style.top = `${cursorPosition.y - glassOffset}px`;
          glassDiv.style.backgroundPosition = `${-bgrLeft}px ${-bgrTop}px`;
          glassDiv.style.backgroundSize = `${zoomFactor * imgRect.width}px ${
            zoomFactor * imgRect.height
          }px`;
        }
      });
    };

    img?.addEventListener('mousemove', handleMouseMove);
    img?.addEventListener('touchstart', handleTouchStart);
    img?.addEventListener('touchend', handleTouchEnd);

    if (glassDiv) {
      glassDiv.style.backgroundImage = `url("${largeImageUrl}")`;
      glassDiv.style.height = `${glassDimension || 150}px`;
      glassDiv.style.width = `${glassDimension || 150}px`;
      glassDiv.style.borderColor = glassBorderColor || '#be9a35';
      glassDiv.style.borderWidth = `${glassBorderWidth || 8}px`;
    }

    return () => {
      img?.removeEventListener('mousemove', handleMouseMove);
      img?.removeEventListener('touchmove', handleMouseMove);
      img?.removeEventListener('touchstart', handleTouchStart);
      img?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    largeImageUrl,
    zoomFactor,
    glassDimension,
    glassBorderColor,
    glassBorderWidth,
  ]);

  return (
    <div className="container">
      <img
        src={imageUrl}
        alt={imgAlt}
        ref={imgEl}
        className="w-full h-52 md:h-96 object-contain"
      />
      <div className="magnifying-glass" ref={glass}></div>
    </div>
  );
};

export default Magnifier;
