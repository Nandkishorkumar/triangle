import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import app from '../required';

const Vouchers = (props) => {
    const [lead_data, setLead_data] = useState([])
    const [open, setopen] = useState(true)
    const db = getFirestore(app);

    async function datahandle() {
        if (props.auth) {
            let list = []
            const q = query(collection(db, "Trip"), where("uploaded_by", "==", props.auth.uid), where("quotation_flg", "==", true), where("Lead_Status", "==", "converted"));
            const querySnapshot = await getDocs(q);
            console.log(querySnapshot)
            try{
                if (querySnapshot.docs.length == 0) {
                    setopen(false)
                }                
                querySnapshot.forEach((doc) => {
                    list.push(doc.data())
                    // doc.data() is never undefined for query doc snapshots
                });
                setLead_data(list)
                console.log(list);
                setopen(false)
            }
            catch (error){
                console.log(error)
            }
        }
        else {
            setopen(false)
            setLead_data([])
        }

    }
    return (
        <div>
            <h1>
                testing query
            </h1>
            set feed in firebase
        </div>
    );
}

export default Vouchers;
