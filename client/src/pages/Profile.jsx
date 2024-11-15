import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { updateUserStart, updateUserSuccess, updateUserFailure, 
         deleteUserStart, deleteUserSuccess, deleteUserFailure, signOut } from '../redux/user/userSlice';

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);    // console.log("imagePercent is ", + imagePercent + "% done")
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user); // eslint-disable-line no-unused-vars

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;   // console.log("Upload is ", + progress + "% done")
          setImagePercent(Math.round(progress));
        },
        (error) => {  // eslint-disable-line no-unused-vars
            setImageError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) =>
            setFormData({ ...formData, profilePicture: downloadURL })
          );
        }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } 
    catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
      navigate("/sign-in");
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
      navigate("/sign-in")
    } catch (error) {
      console.log(error);
    }
  };

    // console.log("==formData==", formData)

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => {
            handleChange
            const file = e.target.files[0];
            if (file && file.type.startsWith("image/")) {
              setImage(file);
            } else {
              alert("이미지 파일만 선택할 수 있습니다.");
            }
          }}

        />

        {/* 
          == Firebase Storage Homepage Update ==
          firebase storage rules:  
          allow read;
          allow write: if
          request.resource.size < 2 * 1024 * 1024 &&        <--- 2M 이상 업로드 불가
          request.resource.contentType.matches('image/.*')  <--- 이미지 파일만 업로드
        */}

        <img
          src={formData?.profilePicture || currentUser?.profilePicture}
          alt='profile'
          className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
          onClick={() => fileRef.current.click()}
        />

        <p className='text-sm self-center'>
          {
            imageError ? (
              <span className='text-red-700'>
                Error uploading image (file size must be less than 2 MB)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
            ) : imagePercent === 100 ? (
              <span className='text-green-700'>Image uploaded successfully</span>
            ) : (
              ''
            )
          }
        </p> 

        <input
          defaultValue={currentUser?.username}
          type='text'
          id='username'
          placeholder='Username'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser?.email}
          type='email'
          id='email'
          placeholder='Email'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />
        
        <input
          type='password'
          id='password'
          placeholder='Password'
          className='bg-slate-100 rounded-lg p-3'
          onChange={handleChange}
        />

        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...' : 'Update'}
        </button>

      </form>

      
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteAccount} className='text-red-700 cursor-pointer' >
          Delete Account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
          Sign out
        </span>
      </div> 
     
      <p className='text-red-700 mt-5'>{ error && 'Something went wrong...' }</p>
      <p className='text-green-700 mt-5'>{ updateSuccess && 'User is updated successfully...' }</p>


    </div>
  );
}
