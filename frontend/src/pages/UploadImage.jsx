import axios from 'axios';
import { useState } from 'react';
import { URL } from '../url';

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
      setFile(selectedFile);
    }
  };
   console.log("file",file)
  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
       
    for (let [key, value] of formData.entries()) {
        console.log("Hello Hi");
        console.log(`${key}:`, value);
        console.log("Hello Hi.......................");
      }
    


    try {
      const response = await axios.post(`${URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      console.log('Image uploaded successfully:', response.data);
      setImageUrl(response.data.imageUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  console.log("ImageUrl",imageUrl)

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '200px', height: 'auto' }} />}
    </div>
  );
};

export default UploadImage;
