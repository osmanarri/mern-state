import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from '../../src/firebase';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(currentUser.avatar); // State to store the image URL

  useEffect(() => {
    if(file){
      handleFileUpload(file)
    }
  }, [file]);

  // upload image to firebase
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        // Handle upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        // Handle unsuccessful uploads
        console.error('Upload failed:', error);
      }, 
      () => {
        // Handle successful uploads
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setImageUrl(downloadURL); // Update the state with the new image URL
          // You can save this URL to the user's profile or use it as needed
        });
      }
    );
  }

  console.log(file);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef} 
          accept="image/*" 
          hidden 
        />
        <img 
          src={imageUrl} // Use the updated image URL state
          alt="profile-picture"
          onClick={() => fileRef.current.click()}
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" 
        />
        <input 
          type="text" 
          id="username" 
          placeholder="username" 
          className="border p-3 rounded-lg" 
        />
        <input 
          type="email" 
          id="email" 
          placeholder="email" 
          className="border p-3 rounded-lg" 
        />
        <input 
          type="password" 
          id="password" 
          placeholder="password" 
          className="border p-3 rounded-lg" 
        />
        <button 
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-90"
        >
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Log out</span>
      </div>
    </div>
  );
}
