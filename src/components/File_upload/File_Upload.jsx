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
  const samples = [img1, img2, img3, img4, img5,img6,img7];

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
  function toggleSampleVisibility(){
    setSeeSample(seeSample=>!seeSample)
  }
  
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
    // Create a File object with the selected image
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
      <input type="file" id="fileInput" onChange={handleFileChange} />
      <button
        id="uploadButton"
        onClick={() => file && setFile(file)}
        disabled={uploading}
      >
        Upload
      </button>
      <div className='files'>
        {uploading && <p>Uploading...</p>}
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
        <button onClick={toggleSampleVisibility}>{seeSample ?"Close":"See" } Sample Images</button>
      </div>
    </>
  );
}
