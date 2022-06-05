import { Details } from '@material-ui/icons';
import React, { useState } from 'react';
import './Payments.css'


const VouchersCompo = ({ data }) => {
    console.log("from vouchers", data.comments)
    const [details, setDetails] = useState(false)
    function detailsFlgactive() {
        setDetails(!details)
    }
    return (
        <div className='details_of_specific_trip'>
            <div className='client_detail'>
                <div className='personal-details'>
                    <div className='TripId'>
                        {data.TripId}
                    </div>
                    <p>Name :-
                        {data.Traveller_name}
                    </p>
                    <p>Contact:-
                        {data.Contact_Number}
                    </p>
                    <p>Email:-
                        {data.Email}
                    </p>
                </div>
                <div className='trip_details'>
                    <p> Package:-
                        {data.Departure_City} ----
                        {data.Destination}
                    </p>
                    <p>Travel Duration:-
                        {data.Travel_Duration}
                    </p>
                    <p>Follow Up date:-
                        {data.Follow_Up_date}
                    </p>
                    <p>Budget:-
                        {data.Budget}
                    </p>
                    <button
                        onClick={() => detailsFlgactive()}
                    >Show More
                    </button>



                </div>

            </div>
            {
                details ? <>
                    <div className='AllDetailsOfTripQuoteComments'>
                        <div className='allComments'>
                            {
                                data.comments.slice(0).reverse().map((U_data, index) => (<>
                                    <p className='comment_'>
                                        <p>
                                            {U_data.comments}
                                        </p>
                                        <p>
                                            {U_data.date}
                                        </p>
                                        <p>
                                            {U_data.time}
                                        </p>
                                    </p>
                                </>))
                            }
                        </div>

                    </div>
                </> : <>
                </>
            }

        </div>
    );
}

export default VouchersCompo;
