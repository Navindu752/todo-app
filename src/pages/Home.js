import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { mergeClasses } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers } from "../redux/actions";

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
    table: {
        marginTop: 100,
        minWidth: 900,
    },
});

const Home = () => {
    const Classes = useStyles();
    let dispatch =useDispatch();

    const {users} = useSelector(state => state.data)

    useEffect(() => {
        dispatch(loadUsers());
    },[]);

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={Classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Contact</StyledTableCell>
                            <StyledTableCell align="center">Address</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((user) => (
                            <StyledTableRow key={user.id}>
                                <StyledTableCell component="th" scope="row">
                                    {user.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{user.email}</StyledTableCell>
                                <StyledTableCell align="right">{user.contact}</StyledTableCell>
                                <StyledTableCell align="right">{user.address}</StyledTableCell>
                                <StyledTableCell align="right"> </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Home