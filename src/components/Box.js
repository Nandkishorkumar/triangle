import React from 'react';
import './TripComponent.css'
import { BackupOutlined, FileCopyOutlined, Fingerprint, Speed,PermIdentityTwoTone } from '@material-ui/icons';


const Box = (props) => {
    console.log(props.TripId)
    // console.log("data")
    const Data = props.data
    return (
        <div className='fullContainer'>
            <div className='compo_header'>

                <p className='text'>Trip Id: {Data.TripId}</p>
                <button className='compo_button'>give Quote</button>
            </div>
            <div className='compo_details'>
                <div className='leftDiv'>
                    <div className='line1'>
                        <p >
                            <p className='item1'>Starting Date</p>
                            {Data.Date_of_lead}
                        </p>
                        <p >
                            <p className='item1'>Duration</p>
                            {Data.Travel_Duration}
                        </p>
                        <p >
                            <p className='item1'>Budget</p>
                            {Data.Budget}
                        </p>
                        <p >
                            <p className='item1'>No. of Travelers</p>
                            {Data.Pax} Adult ,Child{Data.Child}
                        </p>
                    </div>
                    <div className='line'></div>
                    <div className='line2'>
                        <p >
                            <p className='item1'>Desination</p>
                            {Data.Destination}
                        </p>
                        <p >
                            <p className='item1'>Origin</p>
                            {Data.Departure_City}
                        </p>
                        <p >
                            <p className='item1'>Trip Stage</p>
                            {Data.Lead_Status}
                        </p>

                    </div>

                </div>
                
                <div className='right'>
                    {/* <div className='verticle_line'></div> */}
                    <div className='line1_right'>
                       <div className='traveller_details'>
                        <PermIdentityTwoTone/>
                        <p>{Data.Traveller_name}</p>

                       </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Box;
