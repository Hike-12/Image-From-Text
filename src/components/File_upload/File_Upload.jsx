import React, { useState, useEffect } from 'react';
import './File_Upload.css';
import img1 from '/src/assets/images/img1.jpeg';
import img2 from '/src/assets/images/img2.png';
import img3 from '/src/assets/images/img3.png';
import img4 from '/src/assets/images/img4.png';
import img5 from '/src/assets/images/img5.png';
import img6 from '/src/assets/images/img6.png';
import img7 from '/src/assets/images/img7.png';
import SampleImage from '/src/components/SampleImage/SampleImage.jsx';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [resStatus, setResStatus] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [seeSample, setSeeSample] = useState(false);
  const samples = [img1, img2, img3, img4, img5, img6, img7];

  const formatResponse = (data, wordsPerLine = 10) => {
    const text = data
      .map(item => item.text)
      .join(' ')
      .replace(/(\s\s+)/g, ' ')
      .trim();

    const words = text.split(' ');
    const lines = [];
    for (let i = 0; i < words.length; i += wordsPerLine) {
      lines.push(words.slice(i, i + wordsPerLine).join(' '));
    }

    return lines.join('\n');
  };

  const toggleSampleVisibility = () => {
    setSeeSample(prev => !prev);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setImageUrl(imageUrl);
      setError('');
    } else {
      setError('No file selected.');
      setFile(null);
      setImageUrl('');
    }
  };

  const handleSampleSelect = (src, type) => {
    fetch(src)
      .then(response => response.blob())
      .then(blob => {
        const selectedFile = new File([blob], 'sample-image', { type });
        const imageUrl = URL.createObjectURL(selectedFile);
        setFile(selectedFile);
        setImageUrl(imageUrl);
        setError('');
      })
      .catch(err => setError(`Error: ${err.message}`));
  };

  useEffect(() => {
    if (!file) return;

    const uploadFile = async () => {
      setUploading(true);

      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch('https://api.api-ninjas.com/v1/imagetotext', {
          method: 'POST',
          body: formData,
          headers: {
            'X-Api-Key': 'dzBejYXVkVKxPhYOE/KBOg==oT1uKtJsN8rpxbJV'
          }
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`HTTP error! status: ${response.status}. Message: ${errorText}`);
          throw new Error(`HTTP error! status: ${response.status}. Message: ${errorText}`);
        }

        const result = await response.json();
        setResponse(formatResponse(result));
        setError('');
        setResStatus(true);
      } catch (error) {
        setResponse('');
        setError(`Error: ${error.message}`);
      } finally {
        setUploading(false);
      }
    };

    uploadFile();
  }, [file]);

  return (
    <>
      <label htmlFor="fileInput" className="custom-file-upload">
        <div className="icon">
          <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"/>
          </svg>
        </div>
        <div className="text">
          <span>Click to upload image</span>
        </div>
        <input type="file" id="fileInput" onChange={handleFileChange} />
      </label>
        {uploading && <p>Uploading...</p>}
      <div className='files'>
        <div className='res'>
          {imageUrl && (<img className='image' src={imageUrl} alt="Image preview" />)}
          {resStatus && <p id="response">{error ? error : response}</p>}
        </div>
        {seeSample && <div className="sample-images">
          {samples.map((img, index) => (
            <SampleImage
              key={index}
              src={img}
              alt={`Sample ${index}`}
              onSelect={() => handleSampleSelect(img, img.endsWith('.png') ? 'image/png' : 'image/jpeg')}
            />
          ))}
        </div>}
        <button onClick={toggleSampleVisibility}>{seeSample ? "Close" : "See"} Sample Images</button>
      </div>
    </>
  );
}
