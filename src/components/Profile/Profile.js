import { addDoc, collection, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import jsPDF from 'jspdf';
import React, { useRef, useState, useEffect } from 'react';
import app from '../required';
import './profile.css';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { Image } from '@material-ui/icons';
const db = getFirestore(app);

const Profile = (props) => {
    const [layoutSelection, setLayoutSelection] = useState({
        text: "A4",
        value: "size-a4"
    });
    const Data = props.travel_data
    const [callback, setcallback] = useState(false)
    const pdfExportComponent = useRef(null);

    // console.log(Data)
    const currentdate = new Date();
    // console.log(currentdate)
    // var doc = new jsPDF("p", "pt", "a4");
    const TripId = Data.TripId
    const month = currentdate.toLocaleString('default', { month: 'long' })

    async function dataSetter() {
        if (props.indicator) {

        }
        else {
            await addDoc(collection(db, "Quote"), {
                travel_data: props.travel_data,
                cost: props.cost,
                itineary: props.itineary,
                followUpDate: String(props.selected_date),
                NightDataFields: props.NightDataFields,
                pdf_name: `${currentdate.getDate()}:${currentdate.getMonth() + 1}:${(currentdate.getFullYear())}:${currentdate.getHours()}:${currentdate.getMinutes()}`,
                cabDetailsData: props.cabDetailsData,
                flights: props.flights,
                inclusion_data: props.inclusion_data,

            });
        }
    }

    async function update_quotation_flg() {
        let quotation_new = parseInt(props.travel_data.quotation) + 1
        await updateDoc(doc(db, "Trip", `${props.travel_data.trip_doc}`), {
            quotation: quotation_new,
            quotation_flg: true,
            month: month,

        });
    }

    function handleExportWithComponent() {
        pdfExportComponent.current.save();
        // pdfgenrator
    };
    function pdfgenrator() {
        handleExportWithComponent()
        update_quotation_flg()
        // doc.html(document.querySelector("#sample"), {
        //     // autoPaging:'text',
        //     // pagesplit:true,
        //     format: 'letter',
        //     callback: function (pdf) {
        //         pdf.save(Data.Traveller_name)
        //     }
        // })

        // try {
        //     props.closePDF()
        // }
        // catch (e) {
        //     console.log(e)
        // }

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
        <>
            <PDFExport
                ref={pdfExportComponent}
                fileName={`${Data.Traveller_name}`}
            >
                <div className={`pre ${layoutSelection.value}`}>
                    <div id='sample'>
                        <div className='intro_page'>
                            <div className='client_details'>


                            </div>

                        </div>
                        <div className='pdf_Header'>
                            <img alt="JR_image" src='/assets/img/jr_.png' width="41px" height="38px" />
                            <img alt='star_img' src="/assets/img/fiveStar.jpg" width="41px" height="38px" />
                        </div>
                        <p className='name'>Journey Routers</p>
                        <p className='address'>
                            2nd Floor, 258, Kuldeep
                            House, Lane 3,, Champagali,
                            Saket, New Delhi - 110030
                        </p>

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
                                    <p>{Data.Destination} : {props.travel_data.Pax} Adult ,Child{props.travel_data.Child}</p>
                                    <p>{props.cost} <text>total</text></p>
                                </div>
                                <p className='underline'></p>

                            </div>
                            <div className='customer_Details'>
                                <div>
                                    <p>

                                        Departure City : {props.travel_data.Departure_City}
                                    </p>
                                    <p>
                                        Travelers: {props.travel_data.Traveller_name} ({props.travel_data.Pax} Adult ,Child{props.travel_data.Child})
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        Duration :{props.travel_data.Travel_Duration} Days , {props.travel_data.Travel_Duration - 1} Nights
                                    </p>
                                    <p>
                                        Journney Date:-

                                        {
                                            props.selected_date
                                        }
                                    </p>
                                </div>
                            </div>
                            <p className='underline'></p>

                            <div className='details1'>
                                <p style={{ color: 'black' }}>Flight</p>
                                <img alt='plane' src='/assets/img/airplane.png' width='45px' height='35px' style={{ margin: "1rem", marginTop: "-0.4rem", marginBottom: "-0.7rem" }} />
                                <p>{props.flights}</p>
                                <p style={{ color: 'black' }}>Cabs</p>
                                <img alt='plane' src='/assets/img/taxi.png' width='50px' height='50px' style={{ margin: "1rem", marginTop: "-0.7rem", marginBottom: "-1rem" }} />
                                <p>{props.cabDetailsData}</p>
                            </div>
                            <div>
                                <p className='Itinerary'>Itinerary</p>
                                {
                                    props.itineary.map((data, index) => (
                                        <div key={index} className='details1'>
                                            <p className='day_'>Day:{index + 1}</p>
                                            <p>
                                                {data.Day}
                                            </p>

                                            <p>
                                                {data.Description}
                                            </p>

                                        </div>
                                    ))
                                }

                            </div>
                            <div>
                                <h1 className='travel_info1'>
                                    <img alt='' src='/assets/img/hotel.png' width='55px' height='55px' />
                                    <p>
                                        Hotel
                                    </p>
                                </h1>
                                {
                                    props.NightDataFields.map((data, index) => (
                                        <div key={index} className='night_details'>
                                            <div key={index} className='details1'>
                                                <span className='index'> Hotel Name:-</span> {data.HotelName}<br />
                                                <span className='index'>Room Type:- </span>{data.HotelType}
                                                <p className='set_in_line'>nights :-{
                                                    data.Night.map((value, index) => (
                                                        <div> {value}, </div>
                                                    ))
                                                }</p>
                                                <h1 className='pdfImg'>
                                                    <img alt='hotel img' src='/assets/img/apple_a_day_room.jpg' width='200px' height='200px' />
                                                    <img alt='hotel img' src='/assets/img/apple_a_day_pool.jpg' width='200px' height='200px' />
                                                </h1>
                                                <p>{data.comments}</p>
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>


                            <p className='index'>inclusions/Exclusion</p>
                            <p className='small_line'></p>
                            <div className='details1'>
                                {props.inclusion_data ? <>
                                    <p className='comments_'>{props.inclusion_data.breakfast}</p>
                                    <p className='comments_'>{props.inclusion_data.lunch}</p>
                                    <p className='comments_details'>{props.inclusion_data.lunch_comments}</p>
                                    <p className='comments_'>{props.inclusion_data.dinner}</p>
                                    <p className='comments_details'>{props.inclusion_data.dinner_comments}</p>
                                    <p className='comments_'>{props.inclusion_data.airport_arival}</p>
                                    <p className='comments_'>{props.inclusion_data.airport_departure}</p>
                                    <p className='comments_'>{props.inclusion_data.cab_SIC}</p>
                                    <p className='comments_'>{props.inclusion_data.cab_Private}</p>
                                    <p className='comments_details'>{props.inclusion_data.cab_Private_comments}</p>
                                    <p className='comments_'>{props.inclusion_data.Gst}</p>
                                    <p className='comments_'>{props.inclusion_data.airfair}</p>
                                    <p className='comments_'> {props.inclusion_data.siteseeing}</p>
                                    <p className='comments_details'>{props.inclusion_data.siteseeing_comments}</p>
                                    <p className='comments_'>{props.inclusion_data.Visa}</p>
                                    <p className='comments_details'>{props.inclusion_data.Visa_comments}</p>
                                    <p className='comments_'>{props.inclusion_data.Entrance_fee}</p>
                                    <p className='comments_details'>{props.inclusion_data.Entrance_comments}</p>
                                    <p className='comments_'>other_Inclusion</p>
                                    <p className='comments_details'>{props.inclusion_data.other_Inclusion}</p>
                                    <p className='comments_'>other_Exclusion</p>
                                    <p className='comments_details'>{props.inclusion_data.other_Exclusion}</p>
                                </> : <></>
                                }
                            </div>
                            {/* <p className='underline'></p> */}

                            <div className='jraccountdetails'>
                                <div className='accounts_and_bank'>
                                    Bank Transfer options
                                    <img alt='icici' src='/assets/img/icici_image.jpg' width='59px' height='61px' />
                                </div>
                                <div className='acc_details'>
                                    <span>Name:Journey Routers </span>
                                    <span> Account:113605000773</span>
                                    <span> Branch:Malviya Nagar</span>
                                    <span> IFSCode:ICIC0001136</span>
                                    <span> Account-Type:Current Account</span>
                                </div>
                                <p className='underline'></p>
                                <div className='imgCollection'>
                                    <div className='upper'>
                                        <img src='/assets/img/review1.jpg' width='150px' height='100px' />
                                        <img src='/assets/img/review2.jpg' width='150px' height='100px' />
                                        <img src='/assets/img/review3.jpg' width='150px' height='100px' />
                                        <img src='/assets/img/review8.jpg' width='150px' height='100px' />


                                    </div>
                                    <div className='lower'>
                                        <img src='/assets/img/review4.jpg' width='150px' height='100px' />
                                        <img src='/assets/img/review6.jpg' width='150px' height='100px' />
                                        <img src='/assets/img/review7.jpg' width='150px' height='100px' />
                                        <img src='/assets/img/review9.jpg' width='150px' height='100px' />

                                    </div>

                                </div>
                                <div>
                                    <h2>FAQ</h2>
                                    <h5>Is this itinerary customizable? How can I make the changes to further personalize it according to my
                                        requirement?</h5>
                                    <p className='answer'>Of course! This itinerary is completely yours and you can personalize it however you want your vacation to be!
                                        Just click on the link 'Make Changes' in this document and it will take you to your own Journey Routers itinerary anf
                                        you can 'Edit' the trip or 'Change' flights or hotels or activities or anything you absolutely wish to do!</p>
                                    <h5>
                                        How do I know this itinerary suits my interests?

                                    </h5>
                                    <p className='answer'>
                                        If you created this itinerary in our website, you would have noticed that we keep your interests in mind and use
                                        our smart algorithm to suggest the cities and activities that are most suitable for you. And if our travel consultants
                                        had a chat with you and sent this itinerary - Be rest assured they would have taken extra efforts to ensure this
                                        itinerary perfectly suits yourrequirements. you can always customize this itinerary further by clicking on 'Make
                                        Changes' link in this doc.

                                    </p>
                                    <h5>Will anyone be able to help me out in crafting my perfect itinerary?</h5>
                                    <p className='answer'>
                                        You can craft your own awesome itinerary in just a few clicks. However, we do understand that you may still have
                                        queries on the itinerary or the destination. Travel consultants details are available in this document and they are
                                        just a call away! You can feel free to contact them anytime during 9.00am to 8.00pm from Mondays to Saturdays.
                                        You can also chat with our consultants from our website or request for a call back from our website and our team
                                        will be more than happy to help you with all your needs!

                                    </p>
                                    <h5>
                                        What kind of Visa Assistance would be provided by Pickyourtrail ?

                                    </h5>
                                    <p className='answer'>
                                        Visa isn't rocket science but it can be nerve wrecking for some destinations. Worry not! We are here to help. We
                                        will provide information on the documents that needs to be submitted, best practices for applying visa, how to
                                        book your appointment and assist you in the process throughout.

                                    </p>
                                    <h5>Is the itinerary costed real time? How long are these prices valid?
                                    </h5>
                                    <p className='answer'>
                                        Yes, everything you see as a part of your itinerary is real-time costing and you would be able to book your vacation
                                        for those prices. However, the costs of flights, hotels and some activities are highly fluctuating and will change as
                                        per demand. Your costed itinerary will expire in 6 hours and you need to click on 'Update Cost' to view the current
                                        updated price for the itinerary.
                                    </p>
                                    <h5>How do I confirm and book this itinerary? When will I get my confirmations and vouchers?
                                    </h5>
                                    <p className='answer'>
                                        How do I confirm and book this itinerary? When will I get my confirmations and vouchers?

                                    </p>
                                </div>


                            </div>
                            <p className='underline'></p>

                            <div className='cutomerCare'>
                            
                            <img src='/assets/img/customercare.png' width='90px' height='80px' />
                            <div>
                                <p>
                                    e-mail: customercare@jouneryrouters.com
                                </p>
                                <p>
                                    contact:9876543210
                                </p>
                            </div>

                            </div>
                        </div>

                    </div>

                </div>
            </PDFExport>

            <button className='download_button' onClick={() => pdfgenrator()}>downloadURL</button>
            {/* <button className='download_button' onClick={() => pdfgenrator()}>save Quote</button> */}



        </>
    );
}

export default Profile
