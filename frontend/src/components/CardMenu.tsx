import React, { useState } from 'react';
import CanvasDraw from './CanvasDraw';
import SnapButton from './SnapButton';

const CardMenu: React.FC = () => {
  const [showFileInput, setShowFileInput] = useState<boolean>(false);
  const [buttonLabel, setButtonLabel] = useState<string>('Upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null); 
  const [showDrawProcessButton, setShowDrawProcessButton] = useState<boolean>(true);
  const handleButtonClick = () => {
    setShowFileInput(!showFileInput);
    setButtonLabel(showFileInput ? 'Upload' : 'Draw');
    setShowDrawProcessButton(!showDrawProcessButton);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const processFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      try {
        const response = await fetch('http://localhost:8080/store', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          console.log('File uploaded successfully');
          setShowFileInput(false);
        } else {
          console.error('File upload failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
      setShowDrawProcessButton(!showDrawProcessButton)

    }
  };

  return (
    <div className="w-full max-w-[1500px] mx-auto space-y-4 text-black">
      <div className="card bg-black text-white">
        <div className="card-body">
          <h2 className="card-title">Draw</h2>
          {showFileInput ? (
            <input
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
              onChange={handleFileUpload}
            />
          ) : (
            <div className="border border-gray-300 bg-white rounded w-full h-[600px] flex items-center justify-center">
              <CanvasDraw />
            </div>
          )}
          <div className="card-actions justify-end">
            <button className="btn" onClick={handleButtonClick}>{buttonLabel}</button>
            {showDrawProcessButton ? (
              <SnapButton /> // takes screenshot
            ) : (
              <button className="btn" onClick={processFileUpload}>Process</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMenu;
