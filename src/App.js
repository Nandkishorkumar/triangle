import { BackupOutlined, FileCopyOutlined, Fingerprint, Speed,PermIdentityTwoTone } from '@material-ui/icons';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import React, { useEffect } from 'react';
import './App.css';
import Createquote from './components/CreateQuote';
import Loginform from './components/loginForm';
import app from './components/required';
import { UploadFile } from './components/upload';


function App() {
  const storage = getStorage();
  const [data, setData] = React.useState("")
  const [open, setopen] = React.useState(false)
  const db = getFirestore(app);
  const[Page, setPage]=React.useState("create_quote")
  // const [inProgress,setInProgress]=React.useState(false)
  // const unsub = onSnapshot(doc(db, "cities", "LA"), (doc) => {
  //   // console.log("Current data: ", doc.data());
  //   // setData(doc.data())

  // });

  function handelClose() {
    setopen(false)
  }
  function openPopUp() {
    setopen(true)
  }


  // async function uploadFile() {
  //   const handles = await window.showOpenFilePicker({ multiple: false });
  //   const files = await fromEvent(handles);
  //   const path = files[0].path
  //   // console.log(path);
  //   const mountainsRef = ref(storage, path);
  //   const storageRef = ref(storage, `nandu/${path}`);
  //   const uploadTask = uploadBytesResumable(storageRef, files);
  //   uploadTask.on('state_changed',
  //     (snapshot) => {
  //       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log('Upload is ' + progress + '% done');
  //       switch (snapshot.state) {
  //         case 'paused':
  //           console.log('Upload is paused');
  //           break;
  //         case 'running':
  //           console.log('Upload is running');
  //           break;
  //       }
  //     },
  //     (error) => {
  //       // A full list of error codes is available at
  //       // https://firebase.google.com/docs/storage/web/handle-errors
  //       switch (error.code) {
  //         case 'storage/unauthorized':
  //           // User doesn't have permission to access the object
  //           break;
  //         case 'storage/canceled':
  //           // User canceled the upload
  //           break;

  //         // ...

  //         case 'storage/unknown':
  //           // Unknown error occurred, inspect error.serverResponse
  //           break;
  //       }
  //     },
  //     () => {
  //       // Upload completed successfully, now we can get the download URL
  //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //         console.log('File available at', downloadURL);
  //       });
  //     }
  //   );
  // }


  // console.log(unsub)
  async function handle_data() {
    const data_load = await (await getDocs(collection(db, 'cities'))).docs
    // await setDoc(doc(db, "cities", "LA"), {
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA",
    //   name: { firstName: "nandu", midName: "yadav" }
    // });
  }
  useEffect(() => {
    //     const unsubscribe = onSnapshot(doc(db, "cities", "LA"), (doc) => {
    //       // console.log("Current data: ", doc.data().country);
    //       setData(doc.data())
    //     }
    //     )
    //     setTimeout(()=>{
    //       unsubscribe();
    //  }, 1000);
    // console.log("unsub")

    // onSnapshot(doc(db, "cities", "LA"), (doc) => {
    //     // console.log("Current data: ", doc.data());
    //     setData(doc.data())
    //   });
  }, []);

  // useEffect(() => {
  //   handle_data()
  // });
  function page(args){
    setPage(args)
  }

  return (
    <>

      {
        open ? <Loginform open={open} setopen={setopen} /> : <></>
      }

      <div className='header'>
        <p className='headLine'>Journey Router</p>
        <div className='button' onClick={() => openPopUp()}>
          <Fingerprint
            style={{ height: "5rem", width: "2rem" }}
          />
        </div>
      </div>
      <div className='assembler'>
        <div className='sidebars'>
          <div className='sidebarCard' onClick={(()=>page("rapid_fire"))}>
            <div className='sidebarCardContaint'>
              <Speed style={{ marginRight: "1rem" }} />
              <p>Rapid Fire</p>
            </div>
          </div>
          <div className='sidebarCard' onClick={() => UploadFile()}>
            <div className='sidebarCardContaint'>
              <BackupOutlined style={{ marginRight: "1rem" }} />
              <p>Feed The Lead</p>
            </div>
          </div>
          <div className='sidebarCard' onClick={()=>page("create_quote")}>
            <div className='sidebarCardContaint'>
              <FileCopyOutlined style={{ marginRight: "1rem" }} />
              <p>Create Quote</p>
            </div>
          </div>
          <div className='sidebarCard' onClick={()=>page("Quotation Followup")}>
            <div className='sidebarCardContaint'>
              <FileCopyOutlined style={{ marginRight: "1rem" }} />
              <p>Quotation Followup</p>
            </div>
          </div>
        </div>
        <div className='mainContaint'>
        {
          Page=="create_quote"?<>
          <Createquote/>
          </>:
          Page=="rapid_fire"?<>rapid_fire</>:<><></><></></>
        }
        </div>
      </div>
      {/* <button className='top'>Top</button> */}
    </>

  );
}

export default App;
