import React, { useState, useEffect, useRef } from 'react';
import './Help.css';

const Help = () => {
  const [helpStatus, setHelpStatus] = useState(false);
  const popupRef = useRef(null);

  const toggleHelp = () => setHelpStatus(!helpStatus);

  useEffect(() => {
    if (helpStatus) {
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          toggleHelp();
        }
      };
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [helpStatus]);

  useEffect(() => {
    if (helpStatus && popupRef.current) {
      popupRef.current.focus();
    }
  }, [helpStatus]);

  return (
    <div>
      <button onClick={toggleHelp}>{!helpStatus ? "Help" : "Close"}</button>
      {helpStatus && (
        <div className="popup-overlay">
          <div className="popup-content" ref={popupRef} tabIndex="-1">
            <button className="close-button" onClick={toggleHelp}>X</button>
            <Help_Content />
          </div>
        </div>
      )}
    </div>
  );
};

const Help_Content = () => (
  <div>
    <ol>
            <li>This site can be used to extract the text from an image</li>
            <li>The image must be in png or jpeg format</li>
            <li>Please ensure the image is clear</li>
            <li>Unclear text or improper text font wont be read correctly (Check last 2 sample images)</li>
            <li>Click on the sample images for a visual representation of how the site works</li>
        </ol>
  </div>
);

export default Help;
