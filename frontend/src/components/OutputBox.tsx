import React, { useState, useEffect } from 'react';

const OutputBox: React.FC = () => {
  const [outputText, setOutputText] = useState<string>('Loading...');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/update-output');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        setOutputText(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setOutputText('Failed to load data');
      }
    };

    const intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full max-w-[1500px] mx-auto overflow-hidden rounded-xl shadow-lg">
      <div className="card">
        <div className="card-body p-6">
          <div className="text-sm">
            <h4 className="mb-4 text-lg font-medium leading-none">...</h4>
            <p className="mt-4 leading-7">
              {outputText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutputBox;