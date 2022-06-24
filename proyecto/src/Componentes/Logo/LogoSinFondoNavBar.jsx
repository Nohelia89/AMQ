import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useState } from "react";


function LogoSinFondoNavBar() {

// Create a reference to the file we want to download
const storage = getStorage();
const starsRef = ref(storage, 'https://firebasestorage.googleapis.com/v0/b/proyectofing-a7930.appspot.com/o/logosinfondo2.jpg?alt=media&token=e7183d2f-1a4b-436c-be05-b558793de12b');
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
  export default LogoSinFondoNavBar;
