import { CircularProgress, makeStyles, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import app from '../required';
import Row from './Row';
import './quote.css'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';



const FollowUp = (props) => {
    const db = getFirestore(app);
    const [lead_data, setLead_data] = useState([])
    const [open, setopen] = useState(true)
    const [Destination, SetDestination_list] = useState([])
    const animatedComponents = makeAnimated();
    const [columnDefs, setColumnDefs] = useState([
        { field: 'athlete', filter: 'agMultiColumnFilter' },
        {
            field: 'gold',
            filter: 'agMultiColumnFilter',
            filterParams: {
                filters: [
                    {
                        filter: 'agNumberColumnFilter',
                    },
                    {
                        filter: 'agSetColumnFilter',
                    },
                ],
            },
        },
        {
            field: 'date',
            filter: 'agMultiColumnFilter',
            // filterParams: dateFilterParams,
        },
    ]);

    async function datahandle() {
        if (props.auth) {
            // console.log("create quote datahandler")
            let list = []
            const q = query(collection(db, "Trip"), where("uploaded_by", "==", props.auth.uid), where("quotation_flg", "==", true));
            const querySnapshot = await getDocs(q);
            // console.log(querySnapshot)
            if (querySnapshot.docs.length == 0) {
                setopen(false)
            }
            querySnapshot.forEach((doc) => {
                list.push(doc.data())
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
            });
            setLead_data(list)
            setopen(false)
            console.log(lead_data)
        }
        else {
            setopen(false)
            setLead_data([])
        }

    }
    async function queryDesigner(args) {
        if (props.auth) {
            // console.log("create quote datahandler")
            try{
            let list = []
            const q = query(collection(db, "Trip"), where("Destination", "in", args),  where("quotation_flg", "==", true));
            const querySnapshot = await getDocs(q);
            // console.log(querySnapshot)
            if (querySnapshot.docs.length == 0) {
                setopen(false)
            }
            querySnapshot.forEach((doc) => {
                list.push(doc.data())
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.id, " => ", doc.data());
            });
            setLead_data(list)
            setopen(false)
            console.log(lead_data)
        }
        catch (e){
            console.log(e)
        }
        }
        else {
            setopen(false)
            setLead_data([])
        }

    }
    useEffect(() => {
        // console.log("create quote")
        datahandle()
    }, [props.auth])
    function createData(name, calories, fat, carbs, protein, price) {
        return {
            name,
            calories,
            fat,
            carbs,
            protein,
            price,
            history: [
                { date: '2020-01-05', customerId: '11091700', amount: 3 },
                { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
            ],
        };
    }
    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
        createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
        createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
        createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
    ];
    const Destinations = [
        { value: 'Thailand', label: 'Thailand', color: '#00B8D9' },
        { value: 'Bali', label: 'Bali', color: '#0052CC' },
        { value: 'Dubai', label: 'Dubai', color: '#5243AA' },
        { value: 'Europe', label: 'Europe', color: '#FF5630', },
        { value: 'Sri Lanka', label: 'Sri Lanka', color: '#FF8B00' },
        { value: 'Mauritius', label: 'Mauritius', color: '#FFC400' },
        { value: 'Seychelles', label: 'Seychelles', color: '#36B37E' },
        { value: 'Vietnmam', label: 'Vietnmam', color: '#00875A' },
        { value: 'Malaysia', label: 'Malaysia', color: '#253858' },
        { value: 'Singapore', label: 'Singapore', color: '#666666' },
        { value: 'Australia', label: 'Australia', color: '#666666' },
        { value: 'New Zealand', label: 'New Zealand', color: '#666666' },
        { value: 'Kashmir', label: 'Kashmir', color: '#666666' },
        { value: 'Himachal', label: 'Himachal', color: '#666666' },
        { value: 'Rajasthan', label: 'Rajasthan', color: '#666666' },
        { value: 'Uttrakhand', label: 'Uttrakhand', color: '#666666' },
        { value: 'Goa', label: 'Goa', color: '#666666' },
        { value: 'Kerala', label: 'Kerala', color: '#666666' },
        { value: 'Andaman', label: 'Andaman', color: '#666666' },
        { value: 'Sikkim', label: 'Sikkim', color: '#666666' },
        { value: 'Karnataka', label: 'Karnataka', color: '#666666' },
        {value:"Manali",label:"Manali",color:'#666666'},
        {value:"Andaman",label:"Andaman",color:'666666'}
    ];
    const months = [
        { value: 'JAN', label: 'JAN', color: '#00B8D9' },
        { value: 'FEB', label: 'FEB', color: '#0052CC' },
        { value: 'MAR', label: 'MAR', color: '#5243AA' },
        { value: 'APR', label: 'APR', color: '#FF5630', },
        { value: 'MAY', label: 'MAY', color: '#FF8B00' },
        { value: 'My Hot', label: 'JUE', color: '#FFC400' },
        { value: 'JUL', label: 'JUL', color: '#36B37E' },
        { value: 'AUG', label: 'AUG', color: '#00875A' },
        { value: 'SEP', label: 'SEP', color: '#253858' },
        { value: 'OCT', label: 'OCT', color: '#666666' },
        { value: 'NOV', label: 'NOV', color: '#666666' },
        { value: 'DEC', label: 'DEC', color: '#666666' },

    ];
    const Lead_type = [
        { value: 'ACTIVE', label: 'ACTIVE', color: '#00B8D9' },
        { value: 'HOT', label: 'HOT', color: '#0052CC' },
        { value: 'In Progress', label: 'In Progress', color: '#5243AA' },
        { value: 'Book Now', label: 'Book Now', color: '#FF5630', },
        { value: 'Invoiced', label: 'Invoiced', color: '#FF8B00' },
        { value: 'My Hot', label: 'My Hot', color: '#FFC400' },
        { value: 'No Response', label: 'No Response', color: '#36B37E' },
        { value: 'Booker', label: 'Booker', color: '#00875A' },
        { value: 'Hidden Lead', label: 'Hidden Lead', color: '#253858' },
    ];
    const Agent = [
        { value: 'Nand', label: 'Nand', color: '#00B8D9' },
        { value: 'kishor', label: 'kishor', color: '#0052CC' },
        { value: 'kumar', label: 'kumar', color: '#5243AA' },
        { value: 'singh', label: 'singh', color: '#FF5630', },
        { value: 'verma', label: 'verma', color: '#FF8B00' },
        { value: 'jacove', label: 'jacove', color: '#FFC400' },

    ];

    function DestinationHandler(e) {
        const list = []
        for (let len = 0; len <= e.length - 1; len++) {
            list.push(e[len].value)
            console.log(e[len].value)
        }
        console.log(list)
        SetDestination_list(list)
        // console.log(Destination)
        queryDesigner(list)
        if(list.length==0){
            datahandle()
        }
        
        
    }
    return (
        <div>
            {
                props.auth ? <>
                    <div className='filter'>
                        <div>
                            <label>Destination</label>
                            <Select
                                placeholder='Destination'
                                className='select_opt'
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                options={Destinations}
                                onChange={(e) => DestinationHandler(e)}
                            />

                        </div>
                        <div>
                            <label>Month of travel</label>
                            <Select
                                placeholder='Month'
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                options={months}
                                // onChange={(e) => leadHandler(e)}
                            />

                        </div>
                        <div>
                            <label>Lead Type</label>
                            <Select
                                placeholder='Lead'
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                options={Lead_type}
                                // onChange={(e) => leadHandler(e)}
                            />

                        </div>
                        <div>
                            <label>Agent</label>
                            <Select
                                placeholder='Agent'
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                isMulti
                                options={Agent}
                                // onChange={(e) => leadHandler(e)}
                            />

                        </div>
                    </div>
                    {
                        lead_data.length == 0 ? <>
                            {

                                open ?
                                    <Modal style={{ display: "flex", justifyContent: "center", marginTop: "15rem" }} open={open}  >
                                        <CircularProgress />

                                    </Modal> :
                                    <>

                                        <div className='no_data'></div>
                                    </>
                            }

                        </> : <>
                            {/* {
                        lead_data.map((info, index) => (
                            <Boxs key={index} data={info} />
                        ))
                    } */}
                            <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Trip</TableCell>
                                            <TableCell align="right">Name</TableCell>
                                            <TableCell align="right">Lead Status</TableCell>
                                            <TableCell align="right">Destination</TableCell>
                                            <TableCell align="right">Departure City</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {

                                            lead_data.map((row, index) => (
                                                <Row key={index} row={row} />
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </>
                    }
                </> : <>
                    <div className='no_data'></div>
                </>
            }


        </div>
    );
}

export default FollowUp;
