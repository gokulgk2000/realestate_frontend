 import {initializeApp} from "firebase/app";
 import {getFirestore} from   "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBo3lsco_RPkIhkohM_AByVtZn9bXg_NBk",
    authDomain: "covai-realestate-4a993.firebaseapp.com",
    projectId: "covai-realestate-4a993",
    storageBucket: "covai-realestate-4a993.appspot.com",
    messagingSenderId: "827631601740",
    appId: "1:827631601740:web:49c500d5947605fe6dcce9",
    measurementId: "G-YC644BX4Y4"
  };
  const app = initializeApp(firebaseConfig);
  export const db =  getFirestore(app);