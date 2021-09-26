import React, { useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow ,Typography} from '@material-ui/core';
import { mergeClasses } from "@material-ui/styles";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, loadNotes } from "../redux/actions";
import { Button, ButtonGroup } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { format } from 'date-fns';

const useButtonStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            margin: theme.spacing(1),
        }
    }
}))

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
        marginTop: 50,
        minWidth: 900,
    },
    date: {
        flexGrow: 1,
        marginTop:30,
        fontSize:25,
    },
});


const Home = () => {

    const Classes = useStyles();
    const buttonStyles = useButtonStyles();
    let dispatch = useDispatch();
    let history = useHistory();


    const { users } = useSelector(state => state.data)

    useEffect(() => {
        dispatch(loadNotes());
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure wanted to delete the user ?")) {
            dispatch(deleteNote(id));
        }
    };

    return (
        <div>
            <div className={buttonStyles.root}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => history.push("/addNote")}
                >
                    Create a new note
                </Button>
            </div>
            <Typography className={Classes.date} >
                Today is the {format(new Date(), 'do MMMM Y')}
            </Typography>
            <TableContainer component={Paper}>
                <Table className={Classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Note Title</StyledTableCell>
                            <StyledTableCell align="center">Category</StyledTableCell>
                            <StyledTableCell align="center">Date</StyledTableCell>
                            <StyledTableCell align="center">Details</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users && users.map((user) => (
                            <StyledTableRow key={user.id}>
                                <StyledTableCell component="th" scope="row">
                                    {user.title}
                                </StyledTableCell>
                                <StyledTableCell align="center">{user.category}</StyledTableCell>
                                <StyledTableCell align="center">{user.date}</StyledTableCell>
                                <StyledTableCell align="center">{user.details}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <div className={buttonStyles.root}>
                                        <ButtonGroup
                                            variant="contained"
                                            aria-label="contained primary button group"

                                        >
                                            <Button
                                                style={{ marginRight: "5px" }}
                                                color="secondary"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                Delete
                                            </Button>
                                            <Button color="primary" onClick={() => history.push(`/editNote/${user.id}`)}>Edit</Button>
                                        </ButtonGroup>
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Home