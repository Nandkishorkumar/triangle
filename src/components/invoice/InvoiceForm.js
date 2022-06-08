import { Modal } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './invoice.css'
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import InvoicePdf from './invoicePdf';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import app from '../required';


const Invoice = ({ inclusion_data, Invoice_flg, closeinvoice, itineary, NightDataFields, userData, Allquote, followUpDate, cost, auth }) => {
    console.log(userData)
    const [installment, setinstallment] = useState([
        { Date: '', amount: 0 },])
    const [BillingAddress, setBillingAddress] = useState('')
    const [profile, setprofile] = useState({})
    const [flight_cost, setFlight_cost] = useState(0)
    const [visa_cost, set_visa_cost] = useState(0)
    const [land_package, setlandpackage] = useState(0)
    const [deliverable_item, setdeliverableItem] = useState([])
    const [documents, setdocuments] = useState([])
    const [invoice, setInvoice] = useState(false)
    const db = getFirestore(app);
    function showinvoice() {
        setInvoice(true)
    }
    function closeinvoice_() {
        setInvoice(false)
    }
    function handleDeliverable(e) {
        let tempList = [...deliverable_item]
        if (e.target.checked) {
            tempList.push(e.target.name)
        }
        else {
            tempList = tempList.filter(element => element !== e.target.name);
        }
        setdeliverableItem(tempList)
    }
    function handleDocuments(e) {
        let tempList = [...documents]
        if (e.target.checked) {
            tempList.push(e.target.name)
        }
        else {
            tempList = tempList.filter(element => element !== e.target.name);
        }
        setdocuments(tempList)
    }
    function handleBillingaddress(addressEvent) {
        setBillingAddress(addressEvent.target.value)
    }
    function handleFlightCost(FlightEvent) {
        setFlight_cost(FlightEvent.target.value)
    } function handlevisaCost(VisaEvent) {
        set_visa_cost(VisaEvent.target.value)
    } function handlelandPAckage(landEvent) {
        setlandpackage(landEvent.target.value)
    }
    function handleInstallments(event, index) {
        let data = [...installment];
        console.log(data)
        data[index][event.target.name] = event.target.value;
        setinstallment(data);

    }
    function addMOreInstallments() {
        let newInstallment = { Date: '', amount: 0 }
        setinstallment([...installment, newInstallment])
        console.log(documents)
    }
    function removeInstallments(index) {
        let data = [...installment];
        data.splice(index, 1)
        setinstallment(data)

    }
    async function getProfile() {
        const q = query(collection(db, "Profile"), where("email", "==", auth.email));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setprofile(doc.data())
            // console.log(doc.data())
        });
    }
    function getTotalamount() {

        if (isNaN(flight_cost)) {
            setFlight_cost(0)

        }
        if (isNaN(visa_cost)) {
            set_visa_cost(0)
        }
        if (isNaN(land_package)) {
            setlandpackage(0)
        }
        return parseFloat(flight_cost) + parseFloat(visa_cost) + parseFloat(land_package)
    }
    useEffect(() => {
        getProfile()
    }, []);
    return (
        <div>
            <Modal open={Invoice_flg} onClose={closeinvoice} style={{ display: "flex", justifyContent: "center", marginTop: "4rem" }} >
                <div className='mainModalDivSetter'>
                    <div >
                        <span>
                            <label>CURRENCY</label>
                            <select className='selectOptions'>
                                <option value="INR">INR</option>
                                <option value="CND">CND</option>

                            </select>
                        </span>
                        {
                            installment.map((data, index) => (
                                <>
                                    <div className=''>
                                        <label>INSTALLMENT{index + 1}</label>

                                    </div>
                                    <div className='installments'>
                                        <input type='date' name='Date' value={data.Date} onChange={(event) => handleInstallments(event, index)}></input>
                                        <input value={data.amount} name='amount' onChange={(event) => handleInstallments(event, index)}></input>
                                        <div className='deleteInstallmentButton' onClick={() => removeInstallments(index)}>
                                            <img alt='delete icon' src='/assets/img/deleteIcon.png' />
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                        <button className='addmoreInstallments' onClick={addMOreInstallments}>+</button>
                    </div>
                    <div>

                        <div className='BillingAddress'>
                            <label>Billing Address</label>
                            <input className='txtArea' type='text' name='Billing_Address' value={BillingAddress} onChange={(event) => handleBillingaddress(event)} >
                            </input>
                        </div>
                        <div className='BillingAddress'>
                            <label>Flight Cost</label>
                            <input className='txtArea' name='Flight_cost' defaultValue={0} value={flight_cost} onChange={(event) => handleFlightCost(event)} >
                            </input>
                        </div>
                        <div className='BillingAddress'>
                            <label>VISA Cost</label>
                            <input className='txtArea' name='visa_cost' defaultValue={0} value={visa_cost} onChange={(event) => handlevisaCost(event)} >
                            </input>
                        </div>
                        <div className='BillingAddress'>
                            <label>Land Package</label>
                            <input className='txtArea' name="Land_package" defaultValue={0} value={land_package} onChange={(event) => handlelandPAckage(event)} >
                            </input>
                        </div>
                        <div className='BillingAddress'>
                            <label>Total Cost</label>
                            <input className='txtArea' value={parseFloat(flight_cost) + parseFloat(visa_cost) + parseFloat(land_package)}  >
                            </input>
                        </div>
                    </div>
                    <div>
                        <div className='deliverable' onChange={(event) => handleDeliverable(event)}>
                            <h5>Select Deliverables (if any)</h5>
                            <label>
                                <input type='checkbox' name='flight/Train Ticket' value=' flight/Train Ticket'></input>
                                <span>
                                    flight/Train Ticket
                                </span>
                            </label>

                            <label>
                                <input type='checkbox' name='Hotel Voucher' value=' Hotel Voucher'></input>
                                <span>
                                    Hotel Voucher

                                </span>
                            </label>

                            <label>
                                <input type='checkbox' name='Processed Visa' value='Processed Visa'></input>
                                <span>
                                    Processed Visa
                                </span>
                            </label>

                            <label>
                                <input type='checkbox' name='Sight Seeing/Activities Tickets' value='Sight Seeing/Activities Tickets'></input>
                                <span>
                                    Sight Seeing/Activities Tickets
                                </span>
                            </label>
                            <lable>
                                <input type='checkbox' name='Others' ></input>
                                <span>Others</span><br />
                                <input className='txtArea'></input>
                            </lable>

                        </div>
                        <div className='deliverable' onChange={(event) => handleDocuments(event)}>
                            <h5>Travel Document(if any)</h5>
                            <label>
                                <input type='checkbox' name='Scanned Copy Of Passport' ></input>
                                <span>
                                    Scanned Copy Of Passport
                                </span>
                            </label>

                            <label>
                                <input type='checkbox' name='Scanned Copy Of Flights And Tickets' ></input>
                                <span>
                                    Scanned Copy Of Flights And Tickets

                                </span>
                            </label>

                            <label>
                                <input type='checkbox' name='Screen Shot Of Payment( When Done- Specially For NEFT Payment)' ></input>
                                <span>
                                    Screen Shot Of Payment( When Done- Specially For NEFT Payment)
                                </span>
                            </label>

                            <label>
                                <input type='checkbox' name='Scanned Copy Of PAN Card' ></input>
                                <span>
                                    Scanned Copy Of PAN Card
                                </span>
                            </label>
                            <lable>
                                <input type='checkbox' name='Others' ></input>
                                <span>Others</span><br />
                                <input className='txtArea'></input>
                            </lable>

                        </div>
                        <button onClick={() => showinvoice()}>Invoice</button>
                        <button style={{ marginLeft: '16px' }} onClick={closeinvoice}>Cancel</button>



                        <Modal open={invoice} onClose={closeinvoice_} style={{ display: "grid", justifyContent: "center", marginTop: "4rem", with: '100%', overflowY: 'scroll' }} >
                            <InvoicePdf
                                profile={profile}
                                auth={auth}
                                followUpDate={followUpDate}
                                cost={cost}
                                itineary={itineary}
                                Allquote={Allquote}
                                documents={documents}
                                deliverable_item={deliverable_item}
                                userData={userData}
                                inclusion_data={inclusion_data}
                                installment={installment}
                                NightDataFields={NightDataFields} />
                        </Modal>


                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Invoice;
