import { BackupOutlined, FileCopyOutlined, Fingerprint, Speed } from '@material-ui/icons';
import { fromEvent } from "file-selector";
import { getAuth, signOut } from 'firebase/auth';
import { collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { getStorage, ref } from "firebase/storage";
import React, { useEffect, useState } from 'react';
import readXlsxFile from 'read-excel-file';
import './App.css';
import Createquote from './components/CreateQuote';
import Loginform from './components/loginForm';
import app from './components/required';


function App() {
  const storage = getStorage();
  const [data, setData] = React.useState("")
  const [open, setopen] = React.useState(false)
  const db = getFirestore(app);
  const [auth, setauth] = useState()
  const [Page, setPage] = React.useState("create_quote")
  const oauth = getAuth();
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
  async function UploadFile() {
    if(auth){    
    const handles = await window.showOpenFilePicker({ multiple: false });
    const files = await fromEvent(handles);
    // const [inProgress, setInProgress] = React.useState(false)
    const path = files[0].path
    // setInProgress(true)
    readXlsxFile(files[0]).then((rows) => {
      for (let i = 1; i <= rows.length - 1; i++) {
        let Row = rows[i]
        let id = `trp00${i}`
        setDoc(doc(db, "Trip", `trp00${i}`), {
          TripId: "TRP" + Math.random(),
          Lead_Status: Row[0],
          Campaign_code: Row[1],
          Date_of_lead: Row[2],
          Traveller_name: Row[3],
          Extra_Info: Row[4],
          Contact_Number: Row[5],
          Destination: Row[6],
          Comment: Row[7],
          Departure_City: Row[8],
          Travel_Date: Row[9],
          Travel_Duration: Row[10],
          Budget: Row[11],
          Pax: Row[12],
          Child: Row[13],
          Email: Row[14],
          Remark: Row[15],
          Follow_Up_date: Row[16],
          uploaded_by: auth.uid

        });
      }
      // console.log(rows[1][0])
    })
    // setInProgress(false)
    // console.log(path);
    const mountainsRef = ref(storage, path);
    const storageRef = ref(storage, `nandu/${path}`);
    // const uploadTask = uploadBytesResumable(storageRef, files[0]);
    // uploadTask.on('state_changed',
    //     (snapshot) => {
    //         console.log(snapshot)
    //         switch (snapshot.state) {
    //             case 'paused':
    //                 console.log('Upload is paused');
    //                 break;
    //             case 'running':
    //                 console.log('Upload is running');
    //                 break;
    //         }
    //     },
    //     (error) => {
    //         switch (error.code) {
    //             case 'storage/unauthorized':
    //                 break;
    //             case 'storage/canceled':
    //                 break;
    //             case 'storage/unknown':
    //                 break;
    //         }
    //     },
    //     () => {
    //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //             console.log('File available at', downloadURL);
    //         });
    //     }
    // );
  }
  else{
    setopen(true)
  }
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
  function logOut(){
    signOut(oauth).then(() => {
      setauth()
    }).catch((error) => {
      // An error happened.
    });
  }
  function page(args) {
    setPage(args)
  }
  const authListener = () => {
    // console.log(firebase)
   oauth.onAuthStateChanged(user => {
      if (user) {  
        setauth(user)
        console.log(user)      
      }
      else {
      }
    })
  }
  useEffect(()=>{
    authListener()
  })

  return (
    <>

      {
        open ? <Loginform open={open} setopen={setopen} setauth={setauth} /> : <></>
      }

      <div className='header'>
        <p className='headLine'>Journey Router</p>
        {
          auth?<>
          <div>
            <button className='button' onClick={()=>logOut()} >logout</button>
          </div>
          </>:<>
          <div className='button' onClick={() => openPopUp()}>
          <Fingerprint
            style={{ height: "5rem", width: "2rem" }}
          />
        </div>
          </>
        }
        
      </div>
      <div className='assembler'>
        <div className='sidebars'>
          <div className='sidebarCard' onClick={(() => page("rapid_fire"))}>
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
          <div className='sidebarCard' onClick={() => page("create_quote")}>
            <div className='sidebarCardContaint'>
              <FileCopyOutlined style={{ marginRight: "1rem" }} />
              <p>Create Quote</p>
            </div>
          </div>
          <div className='sidebarCard' onClick={() => page("Quotation Followup")}>
            <div className='sidebarCardContaint'>
              <FileCopyOutlined style={{ marginRight: "1rem" }} />
              <p>Quotation Followup</p>
            </div>
          </div>
        </div>
        <div className='mainContaint'>
          {
            Page == "create_quote" ? <>
              <Createquote auth={auth}/>
            </> :
              Page == "rapid_fire" ? <>
              
              </> : <><></><></></>
          }
        </div>
      </div>
      {/* <button className='top'>Top</button> */}
    </>

  );
}

export default App;
