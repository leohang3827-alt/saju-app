import React, { useState, useEffect, useRef } from 'react';

interface DraggableWrapperProps {
  children: React.ReactNode;
  id: string; // Unique identifier for saving coordinate offsets
  className?: string;
  style?: React.CSSProperties;
  defaultOffset?: { x: number; y: number };
}

export const DraggableWrapper: React.FC<DraggableWrapperProps> = ({ 
  children, 
  id, 
  className = '', 
  style,
  defaultOffset = { x: 0, y: 0 }
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showCoords, setShowCoords] = useState(false);
  const [offset, setOffset] = useState(defaultOffset);
  const [isDragging, setIsDragging] = useState(false);
  
  const dragStart = useRef({ x: 0, y: 0 });
  const elementStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Read initial coordinates from localStorage (persists positions!)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`ui_offset_${id}`);
      if (saved) {
        setOffset(JSON.parse(saved));
      } else if (defaultOffset) {
        setOffset(defaultOffset);
      }
    } catch (e) {
      console.error('Failed to load coordinate offsets', e);
    }
  }, [id, defaultOffset]);

  // Listen to keyboard shortcuts globally: 't' to toggle edit, 's' to toggle coords
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering when user is typing in inputs or textareas
      const activeEl = document.activeElement;
      if (activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        activeEl.getAttribute('contenteditable') === 'true'
      )) {
        return;
      }

      const key = e.key.toLowerCase();
      if (key === 't') {
        setIsEditMode(prev => !prev);
      } else if (key === 's') {
        setShowCoords(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isEditMode) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    elementStart.current = { x: offset.x, y: offset.y };
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isEditMode) return;
    const touch = e.touches[0];
    setIsDragging(true);
    dragStart.current = { x: touch.clientX, y: touch.clientY };
    elementStart.current = { x: offset.x, y: offset.y };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      const newOffset = {
        x: elementStart.current.x + dx,
        y: elementStart.current.y + dy
      };
      setOffset(newOffset);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      const dx = touch.clientX - dragStart.current.x;
      const dy = touch.clientY - dragStart.current.y;
      const newOffset = {
        x: elementStart.current.x + dx,
        y: elementStart.current.y + dy
      };
      setOffset(newOffset);
    };

    const handleMouseOrTouchUp = () => {
      if (isDragging) {
        setIsDragging(false);
        // Persist the offsets in localStorage
        try {
          localStorage.setItem(`ui_offset_${id}`, JSON.stringify(offset));
        } catch (e) {}
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseOrTouchUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseOrTouchUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseOrTouchUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseOrTouchUp);
    };
  }, [isDragging, offset, id]);

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOffset(defaultOffset);
    try {
      localStorage.removeItem(`ui_offset_${id}`);
    } catch (e) {}
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className={`${className} ${isEditMode ? 'draggable-edit-mode' : ''}`}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        cursor: isEditMode ? 'move' : 'inherit',
        position: 'relative',
        transition: isDragging ? 'none' : 'transform 0.1s ease',
        touchAction: isEditMode ? 'none' : 'auto',
        ...style
      }}
    >
      {/* Overlay indicator for edit mode */}
      {isEditMode && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          border: '1.5px dashed var(--color-accent-gold)',
          backgroundColor: 'rgba(192, 157, 91, 0.05)',
          borderRadius: 'inherit',
          pointerEvents: 'none',
          zIndex: 99
        }} />
      )}

      {/* Coordinates badge overlay */}
      {showCoords && (
        <div 
          onClick={handleReset}
          style={{
            position: 'absolute',
            top: '-18px',
            left: '6px',
            backgroundColor: 'var(--color-accent-red)',
            color: 'white',
            fontSize: '9px',
            fontWeight: 'bold',
            padding: '2px 6px',
            borderRadius: '4px',
            zIndex: 100,
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            pointerEvents: 'auto',
            cursor: 'pointer',
            fontFamily: 'var(--font-sans)',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
          title="클릭 시 좌표 초기화"
        >
          <span>📍 {id}: X:{offset.x} Y:{offset.y}</span>
          <span style={{ fontSize: '7px', opacity: 0.8 }}>[초기화]</span>
        </div>
      )}

      {children}
    </div>
  );
};

export default DraggableWrapper;
