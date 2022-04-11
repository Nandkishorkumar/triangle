import React, { useEffect, useState } from 'react';
import './profile.css'
import jsPDF from 'jspdf'
const Profile = () => {
    const data = [1, 2, 3, 4]
    function pdfgenrator() {
        var doc = new jsPDF("p", "pt", "a4");
        doc.html(document.querySelector("#sample"), {
            callback: function (pdf) {
                pdf.save("newpdf")
            }
        })
    }
    //////////////////////////////////////////////
    const [formFields, setFormFields] = useState([
        { name: '', age: '' },
    ])
    const submit = (e) => {
        e.preventDefault();
        console.log(formFields)
    }
    const addFields = () => {
        let object = {
            name: '',
            age: ''
        }

        setFormFields([...formFields, object])
        // console.log(formFields)
    }
    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
    }
    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
    }

    return (
        <>
            <div id='sample'>
                <div className='pdf_Header'>
                    <img alt="JR_image" src='/assets/img/JR.jpg' width="41px" height="38px" marginTop="5px" />
                    <img alt='star_img' src="/assets/img/fiveStar.jpg" width="41px" height="38px" />
                </div>
                <p className='name'>Journey Routers</p>
                <div className='details'>
                    <p>Dear NAME,</p>
                    <p >
                        Greeting from Journey Routers.com! We have listed below the holiday package details by one of our trusted
                        agents which match your needs. On the webpage, you can review this quotation & comment for
                        modifications. When it is ready as per your requirements, you can book it online.
                    </p>
                    <p className='underline'></p>
                    <div className='destination_details'>
                        <p>Destination</p>
                        <p>Amount <text>total</text></p>
                    </div>
                    <p className='underline'></p>
                    <p className='Itinerary'>Itinerary</p>
                </div>
                
            </div>
            <button onClick={() => pdfgenrator()}>gen pdf</button>
            {/* <form onSubmit={submit}>
                {formFields.map((form, index) => {
                    return (
                        <div key={index}>
                            <input
                                name='name'
                                placeholder='Name'
                                onChange={event => handleFormChange(event, index)}
                                value={form.name}
                            />
                            <input
                                name='age'
                                placeholder='Age'
                                onChange={event => handleFormChange(event, index)}
                                value={form.age}
                            />
                            <button onClick={() => removeFields(index)}>Remove</button>
                        </div>
                    )
                })}
            </form>
            <button onClick={addFields}>Add More..</button>
            <br />
            <button onClick={submit}>Submit</button> */}
        </>
    );
}

export default Profile;
