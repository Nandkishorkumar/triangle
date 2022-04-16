import { CircularProgress, Modal } from '@material-ui/core';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react';
import Boxs from '../Box';
import app from '../required';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const FollowUp = (props) => {
    const db = getFirestore(app);
    const [lead_data, setLead_data] = useState([])
    const [open, setopen] = useState(true)
    const useRowStyles = makeStyles({
        root: {
            '& > *': {
                borderBottom: 'unset',
            },
        },
    });
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
    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        const classes = useRowStyles();

        return (
            <React.Fragment>
                <TableRow className={classes.root}>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.TripId}
                    </TableCell>
                    <TableCell align="right">{row.Traveller_name}</TableCell>
                    <TableCell align="right">{row.Lead_Status}</TableCell>
                    <TableCell align="right">{row.Destination}</TableCell>
                    <TableCell align="right">{row.Departure_City}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h6" gutterBottom component="div">
                                    History
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Customer</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                            <TableCell align="right">Total price ($)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    {/* <TableBody>
                                        {row.history.map((historyRow) => (
                                            <TableRow key={historyRow.date}>
                                                <TableCell component="th" scope="row">
                                                    {historyRow.date}
                                                </TableCell>
                                                <TableCell>{historyRow.customerId}</TableCell>
                                                <TableCell align="right">{historyRow.amount}</TableCell>
                                                <TableCell align="right">
                                                    {Math.round(historyRow.amount * row.price * 100) / 100}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody> */}
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
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
    return (
        <div>
            {
                props.auth ? <>
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
                            {
                        lead_data.map((info, index) => (
                            <Boxs key={index} data={info} />
                        ))
                    }
                            {/* <TableContainer component={Paper}>
                                <Table aria-label="collapsible table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell />
                                            <TableCell>Trip</TableCell>
                                            <TableCell align="right">Name</TableCell>
                                            <TableCell align="right">Lead Status</TableCell>
                                            <TableCell align="right">Destination</TableCell>
                                            <TableCell align="right">Departure City</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            
                                        lead_data.map((row,index) => (
                                            <Row key={index} row={row} />
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer> */}

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
