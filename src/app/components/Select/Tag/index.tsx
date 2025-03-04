import React from 'react';

export interface TagProps {
  value: string;
  onClose?: () => void;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ value, onClose, className }) => {
  return (
    <div className={`custom-select-tag ${className}`}>
      <span>{value}</span>
      {onClose && (
        <span className="custom-select-tag-close" onClick={onClose}>
          ×
        </span>
      )}
    </div>
  );
};

export { Tag };
