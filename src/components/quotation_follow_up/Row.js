import { FormControl, FormControlLabel, FormLabel, Modal, Radio, RadioGroup, TextField } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React, { useEffect, useState } from 'react';
import './quote.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import PictureAsPdfTwoToneIcon from '@material-ui/icons/PictureAsPdfTwoTone';
import app from '../required';
import Profile from '../Profile/Profile';
import Redownload from './ReDownload';
import moment from 'moment';
import Reqoute from './Reqoute';



const Row = (props) => {
    const { row } = props;
    // console.log(row)
    const db = getFirestore(app);
    const [Lead_Status, setLead_Status] = useState(row.Lead_Status)
    const [openUpdater, setopenupdater] = useState(false)
    const [access_type, setAccessType] = useState(row.Lead_Status)
    const [comments, setcomments] = useState([])
    const [latestComment, setLatestComment] = useState([])
    const [pdfHolder, setpdf] = useState([])
    const [update, setUpdate] = useState('')
    const [change, setChange] = useState(true)
    const reverse = latestComment.slice(0).reverse();
    const [viewPDF, setPDF] = useState(false)
    const [data, setdata] = useState()
    const[Reqoute_flg,setReqoute_flg]=useState(false)
    var today = new Date();
    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    // var date= today.getDate()+":"+(today.getMonth()+1)+":"+today.getFullYear();
    function Controller_reqoute(){
        setReqoute_flg(true)
    }
    function closeReqoute_flg(){
        setReqoute_flg(false)
    }
    function closePDF() {
        setPDF(false)
    }
    function showPDF(args) {
        console.log("args", args)
        setdata(args)
        setPDF(true)

    }
    const useRowStyles = makeStyles({
        root: {
            '& > *': {
                borderBottom: 'unset',
            },
        },
    });
    function dochange() {
        setChange(!change)
    }

    function handlecomment(e) {
        console.log('e')
        if (e.target.outerText) {
            if(e.target.outerText.length===0){
                alert('comments')
            }
            else{
                setcomments(e.target.outerText)
                console.log(e.target.outerText)
            }
        }
        else {
            if(e.target.value.length===0){
                alert('comments')
            }
            else{                
                setcomments(e.target.value)
                console.log(e.target.value)
            }
        }


    }
    const reasons = [
        { title: 'not interested', year: 1994 },
        { title: 'change mind', year: 1972 },
        { title: 'next year plan', year: 1974 },
        { title: 'confirmed', year: 2008 },
        { title: 'budget issue', year: 1957 },
        { title: "converted", year: 1993 },
        { title: "others", year: 1993 },
    ]
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    function changeStatus(Status) {
        setLead_Status(Status)
    }
    function closeUpdater() {
        setopenupdater(false)
    }
    function closeOnstatusComments() {
        update_comments()
        setopenupdater(false)
    }
    async function latestComments() {
        const docRef = doc(db, "Trip", `${row.trip_doc}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setLatestComment(docSnap.data().comments)
            console.log(docSnap.id)
        } else {
            console.log("No such document!");
        }

    }
    async function Allquote() {
        let list = []
        const q = query(collection(db, "Quote"), where("travel_data.TripId", "==", row.TripId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            list.push(doc.data())
        });
        setpdf(list)
        console.log(list)

    }
    async function update_comments() {
        if (comments) {
            let allComments = row.comments
            let comment_holder = {
                 comments: comments, 
                 time:moment(today).format('MMMM Do YYYY'),
                 date:moment(today).format('h:mm:ss')
                }
            allComments.push(comment_holder)
            // console.log('allcoments new', allComments, row.trip_doc)
            setDoc(doc(db, "Trip", row.trip_doc), {
                comments: allComments
            }, { merge: true });

            latestComments()
            dochange()
            setcomments()
        }
        else {
            // console.log("input please")
        }

    }

    useEffect(() => {
        latestComments()
        Allquote()
    }, []);
    function OpenUpdater() {
        setopenupdater(true)
    }
    function sethint(hint) {
        setUpdate(hint)
        setopenupdater(true)

    }
    function changeAcessType(args) {
        setAccessType(args.target.value)
    }

    return (
        <>
            <Modal open={openUpdater}  style={{ display: "grid", justifyContent: "center", marginTop: "4rem", with: '100%', overflowY: 'scroll' }} >
                <div className='popOver'>
                    {
                        update == 'status' ?
                            <div className='status'>
                                <FormControl onChange={(e) => changeAcessType(e)}>
                                    <FormLabel >Status</FormLabel>
                                    <RadioGroup value={access_type} >
                                        <FormControlLabel value="Active" control={<Radio />} label="Active" />
                                        <FormControlLabel value="Cold" control={<Radio />} label="Cold" />
                                        <FormControlLabel value="Hot" control={<Radio />} label="Hot" />
                                        <FormControlLabel value="Invoiced" control={<Radio />} label="Invoiced" />
                                        <FormControlLabel value="In Progress" control={<Radio />} label="In Progress" />
                                        <FormControlLabel value="Book Now" control={<Radio />} label="Book Now" />
                                        <FormControlLabel value="No Response" control={<Radio />} label="No Response" />
                                        <FormControlLabel value="Hidden Lead" control={<Radio />} label="Hidden Lead" />
                                        <FormControlLabel value="Dump" control={<Radio />} label="Dump" />

                                    </RadioGroup>
                                </FormControl>
                                <div>

                                    <Autocomplete
                                        freeSolo={true}
                                        key={change}
                                        onChange={(e) => handlecomment(e)}
                                        options={reasons.map((option) => option.title)}
                                        renderInput={(params) => (
                                            <TextField {...params} placeholder='Comments' margin="normal" variant="outlined" />
                                        )}
                                    />
                                    <button className='button_save' onClick={() => closeOnstatusComments()}>save</button>
                                </div>
                            </div> : <></>

                    }
                    {
                        update == 'destination' ? <div className='destination'>
                            <div className='contains_destination'>
                                <p>current Destination:- {row.Destination}</p>
                                <input placeholder='New Destination'></input>
                                <button className='button_save' onClick={() => closeUpdater()}>save</button>

                            </div>
                        </div> : <></>
                    }
                    {
                        update == 'number' ? <div className='destination'>
                            <div className='contains_destination'>
                                <p>current contact_number:- {row.Contact_Number}</p>
                                <input placeholder='New contact'></input>
                                <button className='button_save' onClick={() => closeUpdater()}>save</button>

                            </div>
                        </div> : <></>
                    }
                </div>
            </Modal>
            <React.Fragment >
                <TableRow className='compo' onClick={() => setOpen(!open)}>
                    {/* <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell> */}
                    <TableCell component="th" scope="row">{row.TripId}</TableCell>
                    <TableCell align="right">{row.Traveller_name}</TableCell>
                    <TableCell align="right">{row.Lead_Status}</TableCell>
                    <TableCell align="right">{row.Destination}</TableCell>
                    <TableCell align="right">{row.Departure_City}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <div className='collaps'>
                                <div className='client_details'>
                                    <p className='p' onClick={() => sethint('status')}>{access_type}</p>
                                    <p className='p1' >{row.Traveller_name}</p>
                                    <p>{row.Email}</p>
                                    <p>{row.Budget}</p>
                                    <p className='p' onClick={() => sethint('destination')}> {row.Destination}</p>
                                    <p className='p' onClick={() => sethint('number')}>{row.Contact_Number}</p>
                                </div>
                                <div className='follow_up'>
                                    <div className='remark' >
                                        {
                                            reverse.map((text, index) => (
                                                <div key={index} className='comments_maping'>
                                                    {/* {console.log("comments data",text)} */}
                                                    <p>
                                                    {text.comments}
                                                    </p>
                                                    <div className='time_date'>
                                                        <p>{text.time}</p>
                                                        <p>{text.date}</p>

                                                    </div>
                                                </div>
                                            ))
                                        }
                                        {row.Remark}

                                    </div>


                                    <div className='remark_set'>
                                        <div className='comments_box'>
                                            <Autocomplete
                                                key={change}
                                                className='Autocomplete'
                                                freeSolo={true}
                                                onChange={(e) => handlecomment(e)}
                                                options={reasons.map((option) => option.title)}
                                                renderInput={(params) => (
                                                    <TextField {...params} placeholder='Comments' margin="normal" variant="outlined" />
                                                )}
                                            />
                                            <button className='button_save_comments' onClick={() => update_comments()}>save</button>
                                        </div>

                                    </div >
                                    {
                                        viewPDF ? <>
                                            <Modal open={viewPDF} onClose={closePDF} style={{ display: "grid", justifyContent: "center", marginTop: "4rem", with: '100%', overflowY: 'scroll' }} >

                                                <Redownload travel_data={data.travel_data} inclusion_data={data.inclusion_data} cabDetailsData={data.cabDetailsData} flights={data.flights} indicator={true} closePDF={closePDF} closeHandler={closePDF} itineary={data.itineary} NightDataFields={data.NightDataFields} selected_date={data.followUpDate} cost={data.cost} />
                                            </Modal>
                                        </> : <></>
                                    }
                                    <div className='remark'>
                                        {

                                            pdfHolder.map((data, index) => (
                                                <>
                                                    <div className='pdf_setter'>
                                                        <PictureAsPdfTwoToneIcon style={{ margin: '15px' }} />
                                                        <p key={index}>{data.pdf_name}</p>
                                                        <button onClick={() => showPDF(data)} className='download_requote'>downloadURL</button>
                                                        <button className='download_requote' onClick={()=>Controller_reqoute()}>Requote</button>
                                                        {
                                                            
                                                            Reqoute_flg?<>
                                                            <Reqoute Allquote={Allquote} closeReqoute_flg={closeReqoute_flg} data={data.travel_data} inclusion_data={data.inclusion_data} cabDetailsData={data.cabDetailsData} flights={data.flights} indicator={false} closePDF={closePDF} closeHandler={closePDF} itineary={data.itineary} NightDataFields={data.NightDataFields} selected_date={data.followUpDate} cost={data.cost}/>
                                                            </>:<></>
                                                        }
                                                    </div>

                                                </>
                                            ))
                                        }
                                    </div>


                                </div>
                            </div>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        </>
    );
}

export default Row;
