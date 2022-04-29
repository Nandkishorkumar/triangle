import { doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import jsPDF from 'jspdf';
import React from 'react';
import app from '../required';
import './profile.css';
const db = getFirestore(app);

const Profile = (props) => {
    const Data = props.travel_data
    console.log(Data)
    const currentdate = new Date();
    console.log(currentdate)
    const TripId=Data.TripId
    const month=currentdate.toLocaleString('default', { month: 'long' })

    async function dataSetter() {
        await setDoc(doc(db, "Quote", "JR",TripId,String(currentdate)), {
            travel_data: props.travel_data,
            cost: props.cost,
            itineary:props.itineary,
            followUpDate:String(props.selected_date),
            NightDataFields: props.NightDataFields,
            pdf_name:String(currentdate)
            
        });
    }
     async function update_quotation_flg() {
        let quotation_new = parseInt(props.travel_data.quotation) + 1
        await updateDoc(doc(db, "Trip", `${props.travel_data.trip_doc}`), {
            quotation: quotation_new,
            quotation_flg: true,
            month:month

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
        props.closeHandler()
        props.closePDF()
        props.datahandle()
        dataSetter()
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
                                    <text className='pdfImg'>
                                        <img alt='hotel img' src='/assets/img/apple_a_day_room.jpg' width='160px' height='160px' />
                                        <img alt='hotel img' src='/assets/img/apple_a_day_pool.jpg' width='160px' height='160px' />
                                    </text>
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
                                    <div className='pdfImg'>
                                        <img alt='hotel img' src='/assets/img/apple_a_day_room.jpg' width='160px' height='160px' />
                                        <img alt='hotel img' src='/assets/img/apple_a_day_pool.jpg' width='160px' height='160px' />
                                    </div>
                                    <p>{data.HotelType} Room x{data.comments}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
            <button className='download_button' onClick={() => pdfgenrator()}>gen pdf</button>

        </div>
    );
}

export default Profile
