import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


const Forms = (props) => {

    //Creating a state variable for DRYer code.
    const emptyData = {
        name: "",
        email: "",
        password: "",
        role: "",
        terms: ""
    }

    //Creating initial state for forms. 
    const [form, setForm] = useState(emptyData)

    //Creating initial state for errors. Uses String to state errors.
    const [errors, setErrors] = useState(emptyData)

    //Creating temporary state to display API POST response on the DOM.
    const [post, setPost] = useState([])

    //Creating state for server error. Uses String.
    const [serverError, setServerError] = useState("")

    //Creating button state to disable if input does not meet requirements/is not validated
    const [button, setButton] = useState(true);


    //Creating form schema using Yup
    const formSchema = yup.object().shape({

        name: yup.string().required("Full name is required"),
        email: yup.string().email("Must be a valid email").required("Email address is required"),
        password: yup.string().min(6, "Passwords must be at least 6 characters long").required("Password is required"),
        role: yup.string().oneOf(["Full Stack Web Developer", "Data Scientist", "Web Designer", "Mobile Developer"], "Please pick a role"),
        terms: yup.boolean().oneOf([true], "Please agree to the Terms and Conditions")

    })

    //Creating validations using Yup
    const validateChange = (e) => {

        yup
        .reach(formSchema, e.target.name)
        .validate(e.target.name === "terms" ? e.target.checked : e.target.value)
        .then(valid => {
            setErrors({
                ...errors,
                [e.target.name]: ""
            })
            
        })
        .catch(err => {
            console.log(err)
            setErrors({
                ...errors,
                [e.target.name] : err.errors[0]
            })
        })
    }

    //Creating POST request using Axios when form is submitted using formSubmit function
    const formSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted!")

        axios
            .post("https://reqres.in/api/users", form)
            .then(response => {
                console.log("POST is successful!", response.data)
                setPost(response.data)
                setServerError(null)
                setForm(emptyData)
            })
            .catch(err => {
                setServerError("API POST request failed!")
            })
        props.addNewUser(form); 
    }

    //Creating onChange function to hook up state with new input 
    const inputChange = (e) => {
        e.persist()
        console.log("new input here!", e.target.value)
        const newData = {
            ...form,
            [e.target.name] : e.target.type === "checkbox" ? e.target.checked : e.target.value
        }
        validateChange(e)
        setForm(newData)
    }

    //If everything checks, then button is enabled
    useEffect(() => {
        formSchema.isValid(form)
        .then(isValid => {
            setButton(!isValid)
        })
    }, [form])

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (

        <Form onSubmit = {formSubmit} >
            {serverError ? <p>{serverError}</p> : null}

            <FormGroup>
            <Label htmlFor="name">
                Full Name
                <Input
                    id = "name"
                    type = "text"
                    name = "name"
                    data-cy = "name"
                    placeholder = "Your full name goes here"
                    value = {form.name}
                    onChange = {inputChange}
                    />
                {errors.name.length > 0 ? <p>{errors.name}</p> : null}
            </Label>
            </FormGroup>

            <FormGroup>
            <Label htmlFor="email">
                Email
                <Input 
                    id = "email"
                    type = "email"
                    name = "email"
                    data-cy = "email"
                    placeholder = "Your email address goes here"
                    value = {form.email}
                    onChange = {inputChange}
                    />
                {errors.email.length > 0 ? <p>{errors.email}</p> : null}
            </Label>
            </FormGroup>

            <FormGroup>
            <Label htmlFor = "password">
                Password
                <Input
                    id = "password"
                    type = "password"
                    name = "password"
                    data-cy = "password"
                    placeholder = "Create your password"
                    value = {form.password}
                    onChange = {inputChange}
                    />
                {errors.password.length > 0 ? <p>{errors.password}</p> : null}

            </Label>
            </FormGroup>

            <FormGroup>
            <Label htmlFor = "role">
                What is your role? 
                <select
                    id = "role"
                    name = "role"
                    data-cy = "role"
                    value = {form.role}
                    onChange = {inputChange}>
                        <option>Pick a role</option>
                        <option value = "Full Stack Web Developer">Full Stack Web Developer</option>
                        <option value = "Data Scientist">Data Scientist</option>
                        <option value = "Web Designer">Web Designer</option>
                        <option value = "Mobile Developer">Mobile Developer</option>
                        </select>
                {errors.role.length > 0 ? <p>{errors.role}</p> : null}
            
            </Label>
            </FormGroup>

            <FormGroup>
            <Label htmlFor = "terms">
                <Input
                    id = "terms"
                    type = "checkbox"
                    name = "terms"
                    data-cy = "terms"
                    checked = {form.terms}
                    onChange = {inputChange}
                    />
                     I agree to the Terms and Conditions.
                {errors.terms.length > 0 ? <p>{errors.terms}</p> : null}

            </Label>
            </FormGroup>


            <Button type = "submit" data-cy = "submit" disabled = {button}>
                Submit
            </Button>

            {/* To display POST data on the DOM */}
            {/* <pre>{JSON.stringify(post, null, 2)}</pre>  */}

        </Form>
      
    );
}


export default Forms;
