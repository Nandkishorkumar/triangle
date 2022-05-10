import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import app from '../required';
import { CircularProgress, Modal } from '@material-ui/core';
import Box from './Box';
// import firebase from 'firebase';



const Createquote = (props) => {
    const [open, setopen] = useState(true)
    const db = getFirestore(app);
    const [lead_data, setLead_data] = useState([])
    const [time_flg, settime] = useState()
    const time = new Date()
    const Current = time.getSeconds()

    
    async function datahandle() {
        if(props.auth){
            // console.log("create quote datahandler")
            let list = []
            const q = query(collection(db, "Trip"),where("uploaded_by", "==", props.auth.uid),where("quotation_flg","==",false));
            const querySnapshot = await getDocs(q);
            // console.log(querySnapshot)
            if(querySnapshot.docs.length==0){
                setopen(false)
            }
            querySnapshot.forEach((doc) => {
                list.push(doc.data())
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
            });
            setLead_data(list)
            setopen(false)
        }
        else{
            setopen(false)
            setLead_data([])
        }
        
    }

    useEffect(() => {
        // console.log("create quote")
        datahandle()
    }, [props.auth])

    return (
        
        <div>
            {
                props.auth?<>
                {
                lead_data.length == 0 ? <>
                    {
                       
                        open ?
                            <Modal style={{ display: "flex", justifyContent: "center", marginTop: "15rem" }} open={open}  >
                                <CircularProgress />
                                
                            </Modal> :
                            <>
                            
                            <div className='no_data'></div>
                            </>
                    }

                </> : <>
                    {
                        lead_data.map((info, index) => (
                            <Box key={index} data={info} datahandle={datahandle} />
                        ))
                    }
                </>
            }
                </>:<>
                <div className='no_data'></div>
                </>
            }
            

        </div>
    );
}

export default Createquote;
