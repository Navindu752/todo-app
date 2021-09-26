import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNote } from "../redux/actions";
import { FormControlLabel } from '@material-ui/core';
import { Radio, RadioGroup, FormControl, FormLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 100,
        '& > *': {
            margin: theme.spacing(1),
            width: "45ch",
        },
    },
}));

const AddNote = () => {
    const classes = useStyles();
    const [state, setState] = useState({
        title: "",
        category: "",
        date: "",
        details: "",
    });

    const [error, setError] = useState("");
    const [value, setValue] = useState('money');

    let history = useHistory();
    let dispatch = useDispatch();

    const { title, category, date, details } = state;

    /* const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })
    }; */
    

    const handleChange = (event) => {
        let { name, value } = event.target;
        setValue(value);
        setState({ ...state, [name]: value })
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !details || !category || !date) {
            setError("Please input all input Field");
        } else {
            dispatch(addNote(state));
            history.push("/");
            setError("");
        }
    };

    return (
        <div>
            <Button
                style={{ width: "100px", marginTop: "20px" }}
                variant="contained"
                color="secondary"
                onClick={() => history.push("/")}
            >
                Go back
            </Button>
            <h2>Add Note</h2>
            {error && <h3 style={{ color: "red" }}>{error}</h3>}
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField id="standard-basic" label="Note Title" value={title} name="title" type="text" onChange={handleChange} />
                <br />
                {/* <TextField id="standard-basic" label="Category" value={email} name="email" type="email" onChange={handleInputChange} /> */}
                <FormControl component="fieldset">
                    <FormLabel component="legend">Note Category</FormLabel>
                    <RadioGroup aria-label="gender" name="category" value={value} onChange={handleChange}>
                        <FormControlLabel value="money" control={<Radio />} label="Money" />
                        <FormControlLabel value="todos" control={<Radio />} label="Todos" />
                        <FormControlLabel value="reminders" control={<Radio />} label="Remindes" />
                        <FormControlLabel value="work" control={<Radio />} label="Work" />
                    </RadioGroup>
                </FormControl>

                {/* <FormControl className={classes.root}  >
                    <FormLabel>Note Category</FormLabel>
                    <RadioGroup value={category} onChange={handleInputChange} >
                        <FormControlLabel value="money" control={<Radio />} label="Money" />
                        <FormControlLabel value="todos" control={<Radio />} label="Todos" />
                        <FormControlLabel value="reminders" control={<Radio />} label="Remindes" />
                        <FormControlLabel value="work" control={<Radio />} label="Work" />
                    </RadioGroup>
                </FormControl> */}
                <br />
                <TextField id="standard-basic" label="" value={date} name="date" type="date" onChange={handleChange} />
                <br />
                <TextField id="standard-basic" label="Details" value={details} name="details" type="text" onChange={handleChange} />
                <br />
                <Button
                    style={{ width: "100px" }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onChange={handleChange}
                >
                    Submit
                </Button>
            </form>
        </div >
    )
}

export default AddNote;