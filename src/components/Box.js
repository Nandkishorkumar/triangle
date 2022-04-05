import { Modal, Radio } from '@material-ui/core';
import { EmojiTransportation, ExtensionSharp, Flight, PermIdentityTwoTone } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import './TripComponent.css';





const Box = (props) => {
    // console.log(props.TripId)
    const Data = props.data
    // console.log(Data.Travel_Duration)
    const [open, setOpen] = useState(false)
    const [SelectedValue, setSelectedValue] = useState("perPerson")
    const [flightcost, setFlightcost] = useState(0)
    const [visacost, setvisacost] = useState(0)
    const [landPackage, setlandpackage] = useState(0)
    const [marketcorrection, setmarketcorrection] = useState(0)
    const [countNight, setCountnight] = useState(0)
    const [flight, setflight] = useState(true)
    const [cab, setcab] = useState(true)
    const [itineary, setItineary] = useState([{ Day: '', description: '' }])
    const days = Array(Data.Travel_Duration).fill('a');
    const [days_total, setTotalDays] = useState(days);
    const [cont_days, setDayscounter] = useState(parseInt(Data.Travel_Duration))
    const [NightDataFields, setNightDataFields] = useState([
        { Night: '', HotelName: '', City: '', Category: '', HotelType: '', comments: '' },])

    function daysChanges(event) {
        console.log('target', event.target.value, typeof (event.target.value))
        let len = parseInt(event.target.value)
        var temp = Array(len).fill('a');
        console.log(event)
        // for(let s=0;)
        setTotalDays(temp)
    }
    function itinearyDays() {
        let data = { Day: '', description: '' }
        setItineary([...itineary, data])
    }
    useEffect(() => {
        console.log(Data.Travel_Duration)
        for (let s = 0; s < Data.Travel_Duration - 1; s++) {
            let data = { Day: '', description: '' }
            setItineary([...itineary, data])
        }
        console.log(itineary.length)
    }, []);
    const handleFormChangeItineary = (event, index) => {
        let data = [...itineary];
        data[index][event.target.name] = event.target.value;
        setItineary(data);
        console.log(itineary)
    }
    function addFields() {
        if (countNight < Data.Travel_Duration - 2) {
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
                                {Data.Travel_Duration}
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
            <Modal open={open} onClose={closeHandler} style={{ display: "flex", justifyContent: "right", marginTop: "4rem" }} >
                <div className='popUp_body'>
                    <div className='save_close'>
                        <button className='compo_button' onClick={() => closeHandler()} >close</button>
                        <button className='compo_button' >save&downlod</button>
                    </div>
                    <div>
                        <p className='basicDetailsheading'>Basic Details</p>
                        <div className='basicDetails'>
                            <div>
                                <label>Days</label>
                                <input type="number" placeholder='Days count eg:-0,1,2,3..' onChange={(e) => daysChanges(e)}></input>
                            </div>
                            <div>
                                <label>Night</label>
                                <input type="number" placeholder='Night count eg:-0,1,2,3..'></input>
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
                                    <input type="number" className='input_filed' value={parseInt(flightcost) + parseInt(visacost) + parseInt(marketcorrection) + parseInt(landPackage)} placeholder='0'></input>
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
                                                        onChange={(event) => handleFormChange(event, index)}>
                                                        <option value={1}>1st</option>
                                                        <option value={2}>2nd</option>
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
                                                placeholder='test'
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
                                        <textarea className='flightdetails'>
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
                                        <textarea className='flightdetails'>
                                        </textarea>
                                    </>
                                    :
                                    <></>
                            }
                            <div className='inclusionExclusion'>
                                <ExtensionSharp />
                                <button>Inclusion/Exclusion</button>
                            </div>
                            <div className='itineary'>
                                <p>Itinerary Start date</p>
                                <input type='date'></input>
                            </div>
                            {

                                days_total.map((data, index) => {
                                    return (
                                        <div>
                                            <input placeholder='val' onChange={(e) => handleFormChangeItineary(e, index)}></input>
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
