import { initializeApp, getApp, getApps } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBOl8yConQqPAMceKuBPFX8gLBSnhcfSro",
  authDomain: "mma301-fc258.firebaseapp.com",
  projectId: "mma301-fc258",
  storageBucket: "mma301-fc258.appspot.com",
  messagingSenderId: "965082584291",
  appId: "1:965082584291:web:4e23f0548764d93d4421d6",
  measurementId: "G-ZDQNDCD16X",
};

if (getApps.length === 0) {
  initializeApp(firebaseConfig);
}

const fbApp = getApp();
const fbStorage = getStorage();

async function uploadImage(uri, fileType) {
  const res = await fetch(uri);
  const blob = await res.blob();

  const storageRef = ref(getStorage(), `images/${fileType + Date.now()}`);

  const uploadTask = uploadBytesResumable(storageRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("🚀 ~ uploadTask.on ~ progress:", progress);
      },
      (err) => {
        console.log("🚀 ~ uploadImage ~ err:", err);
        reject(err);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}

async function uploadFile(uri, fileType) {
  const res = await fetch(uri);
  const blob = await res.blob();

  const storageRef = ref(getStorage(), `files/${fileType + Date.now()}`);

  const uploadTask = uploadBytesResumable(storageRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("🚀 ~ uploadTask.on ~ progress:", progress);
      },
      (err) => {
        console.log("🚀 ~ uploadFile ~ err:", err);
        reject(err);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}

export { fbApp, fbStorage, uploadImage, uploadFile };
