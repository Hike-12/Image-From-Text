import React from 'react';
import './SampleImage.css';

const SampleImage = ({ src, alt, onSelect }) => {
  return (
    <div className="sample-image-container" onClick={() => onSelect(src)}>
      <img src={src} alt={alt} className="sample-image" />
    </div>
  );
};


export default SampleImage;
