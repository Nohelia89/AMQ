import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useState } from "react";


function Logo() {

// Create a reference to the file we want to download
const storage = getStorage();
const starsRef = ref(storage, 'https://firebasestorage.googleapis.com/v0/b/proyectofing-a7930.appspot.com/o/AMQ.png?alt=media&token=62cf5aad-6c2f-431a-a8fb-37e8253e12db');
const [url, setUrl] = useState('');

// Get the download URL
getDownloadURL(starsRef)
  .then((url) => {
      setUrl(url);
  })

  return (
    <img src = {url} alt='logo'  style={{ width: 80, height: 80 }} />
  );
}
  export default Logo;
