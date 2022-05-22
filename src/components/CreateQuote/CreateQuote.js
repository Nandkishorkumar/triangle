import { CircularProgress, Modal } from '@material-ui/core';
import { collection, getDocs, getFirestore, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import app from '../required';
import Box from './Box';
import './TripComponent.css';



const Createquote = (props) => {
    const [open, setopen] = useState(true)
    const db = getFirestore(app);
    const [lead_data, setLead_data] = useState([])
    const [time_flg, settime] = useState()
    const time = new Date()
    const Current = time.getSeconds()
    const [lastVisible, setlastVisible] = useState()


    async function datahandle() {
        if (props.auth) {
            let list = []
            var q;
            if(props.userProfile.access_type=='User'){
                q = query(collection(db, "Trip"),where('Destination','!=','Dump'), where('Destination', 'in',props.userProfile.following_lead), where("quotation_flg", "==", false), limit(3));

            }

           else if(props.userProfile.access_type=='admin'){

                q = query(collection(db, "Trip"), where("uploaded_by", "==", props.auth.uid), where("quotation_flg", "==", false), limit(3));
            }
            
            const querySnapshot = await getDocs(q);
            if (querySnapshot.docs.length == 0) {
                setopen(false)
            }
            querySnapshot.forEach((doc) => {
                list.push(doc.data())
            });
            setlastVisible(querySnapshot.docs[querySnapshot.docs.length - 1])
            setLead_data(list)
            setopen(false)
        }
        else {
            setopen(false)
            setLead_data([])
        }

    }
    async function getnextData() {
        if (props.auth) {
            let list = []
            const q = query(collection(db, "Trip"), where("uploaded_by", "==", props.auth.uid), where("quotation_flg", "==", false),orderBy("TripId"), startAfter(lastVisible), limit(3));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.docs.length == 0) {
                setopen(false)
                datahandle()
            }
            querySnapshot.forEach((doc) => {
                list.push(doc.data())
            });
            setlastVisible(querySnapshot.docs[querySnapshot.docs.length - 1])
            if (list.lenght === 0) {
                datahandle()
            }
            else {
                setLead_data(list)
            }
            setopen(false)
        }
        else {
            setopen(false)
            setLead_data([])
        }
    }
    function getnextdatacontroller() {
        getnextData()
    }

    useEffect(() => {
        datahandle()
    }, [props.auth])

    return (

        <div>
            {
                props.auth ? <>
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
                                    <Box key={index} data={info} datahandle={datahandle} userProfile={props.userProfile} />
                                ))
                            }
                            <button className='loadMOreBUtton' onClick={() => getnextdatacontroller()}>Load more</button>
                        </>
                    }
                </> : <>
                    <div className='no_data'></div>
                </>
            }


        </div>
    );
}

export default Createquote;
