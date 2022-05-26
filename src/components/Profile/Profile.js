import { addDoc, collection, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import jsPDF from 'jspdf';
import React from 'react';
import app from '../required';
import './profile.css';
const db = getFirestore(app);

const Profile = (props) => {
    const Data = props.travel_data
    // console.log(Data)
    const currentdate = new Date();
    // console.log(currentdate)
    const TripId = Data.TripId
    const month = currentdate.toLocaleString('default', { month: 'long' })

    async function dataSetter() {
        console.log(props.indicator, "indicator")
        if (props.indicator) {

        }
        else {
            await addDoc(collection(db, "Quote"), {
                travel_data: props.travel_data,
                cost: props.cost,
                itineary: props.itineary,
                followUpDate: String(props.selected_date),
                NightDataFields: props.NightDataFields,
                pdf_name: `${currentdate.getDate() + 1}:${currentdate.getMonth()}:${(currentdate.getFullYear())}:${currentdate.getHours()}:${currentdate.getMinutes()}`,
                cabDetailsData: props.cabDetailsData,
                flights: props.flights,
                inclusion_data: props.inclusion_data ? props.inclusion_data : '',

            });
        }
    }
    async function update_quotation_flg() {
        let quotation_new = parseInt(props.travel_data.quotation) + 1
        await updateDoc(doc(db, "Trip", `${props.travel_data.trip_doc}`), {
            quotation: quotation_new,
            quotation_flg: true,
            month: month

        });
    }
    function pdfgenrator() {
        update_quotation_flg()
        var doc = new jsPDF("p", "pt", "a4");
        doc.html(document.querySelector("#sample"), {
            callback: function (pdf) {
                pdf.save(Data.Traveller_name)
            }
        })
        try {

            props.closeHandler()
        }
        catch (e) {
            console.log(e)
        }
        try {

            props.closePDF()
        }
        catch (e) {
            console.log(e)
        }
        try {

            props.datahandle()
        }
        catch (e) {
            console.log(e)
        }
        try {

            dataSetter()
        }
        catch (e) {
            console.log(e)
        }
        try {
            props.Allquote()
        }
        catch (error) {
            console.log(error)
        }

    }


    return (
        <div className='pre'>
            <div id='sample'>
                <div className='pdf_Header'>
                    <img alt="JR_image" src='/assets/img/JR.jpg' width="41px" height="38px" />
                    <img alt='star_img' src="/assets/img/fiveStar.jpg" width="41px" height="38px" />
                </div>
                <p className='name'>Journey Routers</p>
                <div >
                    <div className='details'>
                        <p>Dear {props.travel_data.Traveller_name},</p>
                        <p >
                            Greeting from Journey Routers.com! We have listed below the holiday package details by one of our trusted
                            agents which match your needs. On the webpage, you can review this quotation & comment for
                            modifications. When it is ready as per your requirements, you can book it online.
                        </p>
                        <p className='underline'></p>
                        <div className='destination_details'>
                            <p>Destination</p>
                            <p>{props.cost} <text>total</text></p>
                        </div>
                        <p className='underline'></p>
                        <p className='Itinerary'>Itinerary</p>
                    </div>
                    <div>
                        {
                            props.itineary.map((data, index) => (
                                <div key={index} className='details1'>
                                    <p className='day_'>Day:{index + 1}</p>
                                    <div>
                                        {data.Day}
                                    </div>
                                   
                                    <div>
                                        {data.Description}
                                    </div>

                                </div>
                            ))
                        }

                    </div>
                    <div>
                        <p className='travel_info'>
                            <img alt='' src='/assets/img/info.png' width='25px' height='25px' />
                            <p>
                                Travel Information
                            </p>
                        </p>
                        <div className='parallel'>
                            <div>
                                <p>
                                    <text>
                                        Departure City
                                    </text><br />
                                    <text>
                                        {
                                            props.travel_data.Departure_City
                                        }
                                    </text>
                                </p>
                                <p>
                                    <text>
                                        Travelers
                                    </text><br />
                                    <text>
                                        {props.travel_data.Pax} Adult ,Child{props.travel_data.Child}

                                    </text>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <text>
                                        Duration
                                    </text><br />
                                    <text>
                                        {
                                            props.travel_data.Travel_Duration
                                        }
                                    </text>
                                </p>
                                <p>
                                    <text>
                                        Dates
                                    </text><br />
                                    <text>
                                        {
                                            props.selected_date
                                        }
                                    </text>
                                </p>
                            </div>

                        </div>
                        <p className='travel_info1'>
                            <img alt='' src='/assets/img/hotel.png' width='55px' height='55px' />
                            <p>
                                Hotel
                            </p>
                        </p>
                        {
                            props.NightDataFields.map((data, index) => (
                                <div key={index} className='night_details'>
                                    <p>{data.HotelName}</p>
                                    <p>Room Type {data.HotelType}</p>
                                    <p className='set_in_line'>nights:-{
                                        data.Night.map((value,index)=>(
                                            <div> {value}, </div>
                                        ))
                                        }</p>
                                    <div className='pdfImg'>
                                        <img alt='hotel img' src='/assets/img/apple_a_day_room.jpg' width='160px' height='160px' />
                                        <img alt='hotel img' src='/assets/img/apple_a_day_pool.jpg' width='160px' height='160px' />
                                    </div>
                                    <p>{data.HotelType} Room x{data.comments}</p>
                                </div>
                            ))
                        }
                    </div>

                    <div className='details1'>
                        <p style={{ fontWeight: '600' }}>Flight</p>
                        <img alt='plane' src='/assets/img/airplane.png' width='45px' height='35px' style={{ margin: "1rem", marginTop: "-0.4rem", marginBottom: "-0.7rem" }} />
                        <p>{props.flights}</p>
                        <p style={{ fontWeight: '600' }}>Cabs</p>
                        <img alt='plane' src='/assets/img/taxi.png' width='50px' height='50px' style={{ margin: "1rem", marginTop: "-0.7rem", marginBottom: "-1rem" }} />
                        <p>{props.cabDetailsData}</p>
                    </div>
                    <p>inclusions/Exclusion</p>
                    <p className='small_line'></p>
                    <div className='details1'>
                        {props.inclusion_data ? <>
                            <p className='inclusion'>{props.inclusion_data.breakfast}</p>
                            <p className='comments_'>{props.inclusion_data.lunch}</p>
                            <p> :-{props.inclusion_data.lunch_comments}</p>
                            <p className='comments_'>{props.inclusion_data.dinner}</p>
                            <p>:-{props.inclusion_data.dinner_comments}</p>
                            <p>{props.inclusion_data.airport_arival}</p>
                            <p>{props.inclusion_data.airport_departure}</p>
                            <p>{props.inclusion_data.cab_SIC}</p>
                            <p className='comments_'>{props.inclusion_data.cab_Private}</p>
                            <p>:-{props.inclusion_data.cab_Private_comments}</p>
                            <p>{props.inclusion_data.Gst}</p>
                            <p>{props.inclusion_data.airfair}</p>
                            <p className='comments_'> {props.inclusion_data.siteseeing}</p>
                            <p>:-{props.inclusion_data.siteseeing_comments}</p>
                            <p className='comments_'>{props.inclusion_data.Visa}</p>
                            <p>:-{props.inclusion_data.Visa_comments}</p>
                            <p className='comments_'>{props.inclusion_data.Entrance_fee}</p>
                            <p>:-{props.inclusion_data.Entrance_comments}</p>
                            <p>other_Inclusion</p>
                            <p>{props.inclusion_data.other_Inclusion}</p>
                            <p>other_Exclusion</p>
                            <p>{props.inclusion_data.other_Exclusion}</p>
                            {/* inclusion Exclusion here */}
                        </> : <></>
                        }
                    </div>
                </div>

            </div>
            <button className='download_button' onClick={() => pdfgenrator()}>downloadURL</button>

        </div>
    );
}

export default Profile
