import { Modal, Radio } from '@material-ui/core';
import { EmojiTransportation, ExtensionSharp, Flight, PermIdentityTwoTone } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import Inclusion from './Inclusion';
import Profile from './Profile/Profile';
import './TripComponent.css';

const Box = (props) => {
    // console.log(props.TripId)
    const Data = props.data
    // console.log(Data)
    const [Travel_Duration, setTravel_Duration] = useState(Data.Travel_Duration)
    const [open, setOpen] = useState(false)
    const [SelectedValue, setSelectedValue] = useState("perPerson")
    const [flightcost, setFlightcost] = useState(0)
    const [visacost, setvisacost] = useState(0)
    const [landPackage, setlandpackage] = useState(0)
    const [marketcorrection, setmarketcorrection] = useState(0)
    const [countNight, setCountnight] = useState(0)
    const [flight, setflight] = useState(true)
    const [cab, setcab] = useState(true)
    const [itineary, setItineary] = useState([{ Day: '', Description: '' },])
    const days = Array(Data.Travel_Duration).fill('a');
    const [days_total, setTotalDays] = useState(days);
    const [cont_days, setDayscounter] = useState(parseInt(Data.Travel_Duration))
    const [NightDataFields, setNightDataFields] = useState([
        { Night: '1', HotelName: '', City: '', Category: '', HotelType: '', comments: '' },])
    const [selected_date, set_selected_date] = useState()
    const [opennclusion, setInclusion] = useState(false)
    const [openPDF, setPDF] = useState(false)
    const[inclusion_data,setinclusion]=useState()
    const[flights,setflights]=useState()
    const[cabDetailsData,setcabDetails]=useState()

    function cabDetails(e){
        setcabDetails(e.target.value)
    }
    function closePDF() {
        setPDF(false)
    }
    function showPDF() {
        setPDF(true)
    }
    function openInclusion() {
        setInclusion(true)
    }
    function closeInclusion() {
        setInclusion(false)
    }

    function daysChanges(event) {
        // console.log('target', event.target.value, typeof (event.target.value))
        let len = parseInt(event.target.value)
        var temp = Array(len).fill('a');
        console.log(event.target.value)
        // for(let s=0;)
        setTotalDays(temp)
        if (countNight < len) {
            console.log(NightDataFields.length)
            setCountnight(countNight - 1)
        }
        else if (countNight > len) {
            setCountnight(countNight + 1)

        }

    }
    function itinearyDays() {
        let data = { Day: '', Description: '' }
        setItineary([...itineary, data])
    }
    function setVar() {
        for (let s = 0; s < Travel_Duration - 1; s++) {
            let data = { Day: '', Description: '' }
            let temp = itineary
            temp.push(data)
            setItineary(temp)
        }
        console.log(itineary)
    }
    useEffect(() => {
        setVar()

    }, []);
    const handleFormChangeItineary = (event, index) => {
        let data = [...itineary];
        // console.log(data[index][event.target.name])
        data[index][event.target.name] = event.target.value;
        setItineary(data);
        console.log(itineary)
    }
    function addFields() {
        if (countNight < Travel_Duration - 2) {
            // console.log('hiii')
            let object = { Night: '', HotelName: '', City: '', Category: '', HotelType: '', comments: '' }
            setNightDataFields([...NightDataFields, object])
            setCountnight(countNight + 1)
            // console.log(NightDataFields)
        }

    }
    function removeFields(index) {
        let data = [...NightDataFields];
        data.splice(index, 1)
        setNightDataFields(data)
        setCountnight(countNight - 1)

    }
    const handleFormChange = (event, index) => {
        let data = [...NightDataFields];
        data[index][event.target.name] = event.target.value;
        setNightDataFields(data);
        console.log(data)
    }

    function flightcostChange(e) {
        setFlightcost(e.target.value)
    }
    function visacostChange(e) {
        setvisacost(e.target.value)
    }
    function landPackagechange(e) {
        setlandpackage(e.target.value)
    }
    function marketcorrectionChnage(e) {
        setmarketcorrection(e.target.value)
    }
    const currency = [
        "INR",
        "ILS",
        "CNY",
        "KWD",
        "AFN",
        "MYR",
        "NPR",
        "PHP",
        "AMD",
        "EUR",
        "ISK",
        "USD",
        "CLP"
    ]

    function openHandler() {
        setOpen(true)

    }
    function closeHandler() {
        setOpen(false)
    }
    function handleChange(event) {
        setSelectedValue(event.target.value);
    };
    function Save_download() {
        showPDF()
    }
    function select_date(e) {
        set_selected_date(e.target.value)
    }
    function flightDetails(e){
        setflights(e.target.value)
    }

    return (
        <>
            <div className='fullContainer'>
                <div className='compo_header'>

                    <p className='text'>Trip Id: {Data.TripId}</p>
                    <button className='compo_button' onClick={() => openHandler()}>give Quote</button>
                </div>
                <div className='compo_details'>
                    <div className='leftDiv'>
                        <div className='line1'>
                            <div >
                                <p className='item1'>Starting Date</p>
                                {Data.Date_of_lead}
                            </div>
                            <div >
                                <p className='item1'>Duration</p>
                                {Travel_Duration}
                            </div>
                            <div >
                                <p className='item1'>Budget</p>
                                {Data.Budget}
                            </div>
                            <div >
                                <p className='item1'>No. of Travelers</p>
                                {Data.Pax} Adult ,Child{Data.Child}
                            </div>
                        </div>
                        <div className='line'></div>
                        <div className='line2'>
                            <div>
                                <p className='item1'>Desination</p>
                                {Data.Destination}
                            </div>
                            <div>
                                <p className='item1'>Origin</p>
                                {Data.Departure_City}
                            </div>
                            <div>
                                <p className='item1'>Trip Stage</p>
                                {Data.Lead_Status}
                            </div>

                        </div>

                    </div>

                    <div className='right'>
                        {/* <div className='verticle_line'></div> */}
                        <div className='line1_right'>
                            <div className='traveller_details'>
                                <PermIdentityTwoTone />
                                <p>{Data.Traveller_name}</p>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Modal open={openPDF} onClose={closePDF} style={{ display: "grid", justifyContent: "center", marginTop: "4rem", with: '100%', overflowY: 'scroll' }} >
                <Profile inclusion_data={inclusion_data}travel_data={Data} cabDetailsData={cabDetailsData} flights={flights} closePDF={closePDF} datahandle={props.datahandle} closeHandler={closeHandler} itineary={itineary} NightDataFields={NightDataFields} selected_date={selected_date} cost={parseInt(flightcost) + parseInt(visacost) + parseInt(marketcorrection) + parseInt(landPackage)} />
            </Modal>
            <Modal open={open} onClose={closeHandler} style={{ display: "flex", justifyContent: "right", marginTop: "4rem" }} >
                <div className='popUp_body'>
                    <div className='save_close'>
                        <button className='compo_button' onClick={() => closeHandler()} >close</button>
                        <button className='compo_button' onClick={() => Save_download()}>save&downlod</button>
                    </div>
                    <div>
                        <p className='basicDetailsheading'>Basic Details</p>
                        <div className='basicDetails'>
                            <div>
                                <label>Days</label>
                                <input type="number" placeholder='Days count eg:-0,1,2,3..' onChange={(e) => daysChanges(e)} value={days_total.length}></input>
                            </div>
                            <div>
                                <label>Night</label>
                                <input placeholder='Night count eg:-0,1,2,3..' value={days_total.length - 1} readOnly={true}></input>
                            </div>
                        </div>
                        <div className='cost_estimation_body'>
                            <div className='costOption'>
                                <div>
                                    <Radio
                                        checked={SelectedValue === 'perPerson'}
                                        onChange={handleChange}
                                        value="perPerson"
                                        name="radio-button"
                                        color='primary'
                                    // inputProps={{ 'aria-label': 'A' }}
                                    />
                                    <label>per Person</label>
                                </div>
                                <div>
                                    <Radio
                                        checked={SelectedValue === 'total'}
                                        onChange={handleChange}
                                        value="total"
                                        name="radio-button"
                                        color='primary'
                                    // inputProps={{ 'aria-label': 'A' }}
                                    />
                                    <label>total</label>
                                </div>
                                <div>
                                    <select className='currency_option'>
                                        <option value={currency[0]}>{currency[0]}</option>
                                        <option value={currency[1]}>{currency[1]}</option>
                                        <option value={currency[2]}>{currency[2]}</option>
                                        <option value={currency[3]}>{currency[3]}</option>
                                        <option value={currency[4]}>{currency[4]}</option>
                                        <option value={currency[5]}>{currency[5]}</option>
                                        <option value={currency[6]}>{currency[6]}</option>
                                        <option value={currency[7]}>{currency[7]}</option>
                                        <option value={currency[8]}>{currency[8]}</option>
                                        <option value={currency[9]}>{currency[9]}</option>
                                        <option value={currency[10]}>{currency[10]}</option>
                                        <option value={currency[11]}>{currency[11]}</option>

                                    </select>
                                </div>
                            </div>
                            <div className='costOption_estimatiom'>
                                <div>
                                    <label >Flight Cost</label><br />
                                    <input type="number"
                                        className='input_filed'
                                        placeholder='0'
                                        onChange={(e) => flightcostChange(e)}
                                    ></input>
                                    <text className='spacer'>+</text>
                                </div>
                                <div>
                                    <label>Visa Cost</label><br />
                                    <input type="number" className='input_filed' placeholder='0' onChange={(e) => visacostChange(e)}></input>
                                    <text className='spacer'>+</text>
                                </div>
                                <div>
                                    <label>Land Package Cost</label><br />
                                    <input type="number" className='input_filed' placeholder='0' onChange={(e) => landPackagechange(e)}></input>
                                    <text className='spacer'>+</text>
                                </div>
                                <div>
                                    <label>Market Correction Amount</label><br />
                                    <input type="number" className='input_filed' placeholder='0' onChange={(e) => marketcorrectionChnage(e)}></input>
                                    <text className='spacer'>=</text>
                                </div>
                                <div className='totalSeprator'>
                                    <label>Quotation price</label><br />
                                    <input type="number" className='input_filed' value={parseInt(flightcost) + parseInt(visacost) + parseInt(marketcorrection) + parseInt(landPackage)} placeholder='0' readOnly={true}></input>
                                </div>

                            </div>
                        </div>
                        <div className='cost_estimation_body'>
                            <p className='HotelDetailsheading'>Hotel Details</p>
                            {
                                NightDataFields.map((form, index) => {
                                    return (
                                        <>
                                            <div className='costOption_estimatiom'>
                                                <div className='unitComponent'>
                                                    <label>Night</label><br />
                                                    <select placeholder='select'
                                                        name='Night'
                                                        onChange={(event) =>
                                                            handleFormChange(event, index)
                                                            // console.log(event)
                                                        }


                                                    >
                                                        {days_total.map((option, index) => (
                                                            <option value={index + 1}>{index + 1} night</option>
                                                        ))}


                                                    </select>
                                                </div>
                                                <div className='unitComponent'>
                                                    <label>Hotel Name</label><br />
                                                    <input placeholder='hotel Name'
                                                        name='HotelName'
                                                        onChange={(event) => handleFormChange(event, index)}
                                                    ></input>
                                                </div>
                                                <div className='unitComponent'>
                                                    <label>City</label><br />
                                                    <input placeholder='city'
                                                        name='City'
                                                        onChange={(event) => handleFormChange(event, index)}
                                                    ></input>
                                                </div>
                                                <div className='unitComponent'>
                                                    <label>Category</label><br />
                                                    <input placeholder='Category'
                                                        name='Category'
                                                        onChange={(event) => handleFormChange(event, index)}
                                                    ></input>
                                                </div>
                                                <div className='unitComponent'>
                                                    <label>Hotel Type</label><br />
                                                    <select defaultValue='normal' name='HotelType' onChange={(event) => handleFormChange(event, index)}>
                                                        <option value='standrad'>standrad</option>
                                                        <option value='delux'>delux</option>
                                                        <option value='super delux'>super delux</option>
                                                        <option value='Luxury'>Luxury</option>
                                                        <option value='duplex'>duplex</option>
                                                        <option value='Excutive suite'>Excutive suite</option>
                                                        <option value='family suite'>family suite</option>
                                                        <option value='grand suite'>grand suite</option>
                                                        <option value='HouseBoat'>HouseBoat</option>
                                                        <option value='superior room'>superior room</option>
                                                        <option value='others'>others</option>

                                                    </select>
                                                </div>
                                                <button onClick={() => removeFields(index)}>Remove</button>
                                            </div>
                                            <textarea
                                                className='comments'
                                                name='comments'
                                                onChange={(event) => handleFormChange(event, index)}
                                                placeholder='Additional information'
                                            ></textarea>
                                        </>
                                    );
                                }
                                )
                            }
                            <button className='addMore' onClick={addFields}>Add More..</button>
                            <div className='FlightDetails'>
                                <Flight />
                                <p>
                                    <input type='checkbox' onChange={() => setflight(!flight)}></input>
                                    <label>Flight Not Included</label>
                                </p>
                            </div>
                            {
                                flight ?
                                    <>
                                        <textarea onChange={(e)=>flightDetails(e)} value={flights} className='flightdetails'>
                                        </textarea>
                                    </>
                                    :
                                    <></>
                            }
                            <div className='FlightDetails'>
                                <EmojiTransportation />
                                <p>
                                    <input type='checkbox' onChange={() => setcab(!cab)}></input>
                                    <label>cab Not Included</label>
                                </p>
                            </div>
                            {
                                cab ?
                                    <>
                                        <textarea onChange={(e)=>cabDetails(e)} value={cabDetailsData} className='flightdetails'>
                                        </textarea>
                                    </>
                                    :
                                    <></>
                            }
                            <div className='inclusionExclusion'>
                                <ExtensionSharp />
                                <button onClick={() => openInclusion()}>Inclusion/Exclusion</button>
                            </div>
                            <Modal open={opennclusion} onClose={closeInclusion} style={{ justifyContent: "center", with: '100%', overflowY: 'scroll' }} >
                                <>
                                    <Inclusion onClose={closeInclusion} setinclusion={setinclusion}></Inclusion>
                                </>
                            </Modal>

                            <div className='itineary'>
                                <p>Itinerary Start date</p>
                                <input type='date' onChange={(e) => select_date(e)}></input>
                            </div>
                            {

                                days_total.map((data, index) => {
                                    return (
                                        <div className='days'>
                                            <label className='title'>Day{index + 1}:Title</label><br />
                                            <input className='dayByitineary' placeholder='Enter Title of the day' name='Day' onChange={(e) => handleFormChangeItineary(e, index)}></input>
                                            <div>
                                                <label className='title'>Description</label><br />
                                                <textarea placeholder=' Write Description' name='Description' onChange={(event) => handleFormChangeItineary(event, index)} className='Description'></textarea>
                                            </div>
                                        </div>
                                    )
                                })


                            }

                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Box;
