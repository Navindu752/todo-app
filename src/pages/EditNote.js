import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleNote, updateNote } from "../redux/actions";
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

const EditNote = () => {
    const { user } = useSelector((state) => state.data);
    console.log(user);

    const classes = useStyles();

    const [state, setState] = useState({
        title: "",
        category: "",
        date: "",
        details: "",
    });
    
    const [value, setValue] = useState(user.category);

    const [error, setError] = useState("");

    let { id } = useParams();

    

    let history = useHistory();
    let dispatch = useDispatch();

    const { title, category, date, details } = state;

    useEffect(() => {
        dispatch(getSingleNote(id))
    }, []);

    useEffect(() => {
        if (user) {
            setState({ ...user });
        }
    }, [user]);


    /* const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })
    }; */

    const handleChange = (event) => {
        console.log(event.target.value)
        let { name, value } = event.target;
        setValue(value);
        setState({ ...state, [name]: value })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !details || !category || !date) {
            setError("Please input all input Field");
        } else {
            dispatch(updateNote(state, id));
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
            <h2>Edit Note</h2>
            {error && <h3 style={{ color: "red" }}>{error}</h3>}
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField id="standard-basic" label="Note Title" value={title || ""} name="title" type="text" onChange={handleChange} />
                <br />
                {/* <TextField id="standard-basic" label="Category" value={email || ""} name="email" type="email" onChange={handleInputChange} /> */}
                <FormControl component="fieldset">
                    <FormLabel component="legend">Note Category</FormLabel>
                    <RadioGroup aria-label="gender" name="category" value={value} onChange={handleChange}>
                        <FormControlLabel value="money" control={<Radio />} label="Money" />
                        <FormControlLabel value="todos" control={<Radio />} label="Todos" />
                        <FormControlLabel value="reminders" control={<Radio />} label="Remindes" />
                        <FormControlLabel value="work" control={<Radio />} label="Work" />
                    </RadioGroup>
                </FormControl>
                {/* <FormControl className={classes.field} >
                    <FormLabel>Note Category</FormLabel>
                    <RadioGroup value={category || ""} onChange={handleInputChange} >
                        <FormControlLabel value="money" control={<Radio />} label="Money" />
                        <FormControlLabel value="todos" control={<Radio />} label="Todos" />
                        <FormControlLabel value="reminders" control={<Radio />} label="Remindes" />
                        <FormControlLabel value="work" control={<Radio />} label="Work" />
                    </RadioGroup>
                </FormControl> */}
                <br />
                <TextField id="standard-basic" label="" value={date || ""} name="date" type="date" onChange={handleChange} />
                <br />
                <TextField id="standard-basic" label="Details" value={details || ""} name="details" type="text" onChange={handleChange} />
                <br />
                <Button
                    style={{ width: "100px" }}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onChange={handleChange}
                >
                    Update
                </Button>
            </form>
        </div >
    )
}

export default EditNote;