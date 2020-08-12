import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';


const Form = () => {

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
                setForm(emptyData)
            })
            .catch(err => {
                setServerError
            })



    }


//         // if successful request, clear any server errors
//         setServerError(null); // see step 7 in notion notes

//         // clear state, could also use a predetermined initial state variable here
//         setFormState({
//           name: "",
//           email: "",
//           motivation: "",
//           positons: "",
//           terms: true
//         });
//       })
//       .catch((err) => {
//         // this is where we could create a server error in the form! if API request fails, say for authentication (that user doesn't exist in our DB),
//         // set serverError
//         setServerError("oops! something happened!");
//       });
//   };


    return (

        <form >

            <label htmlFor="name">
                <input
                    id = "name"
                    type = "text"
                    name = "name"
                    placeholder = "Your full name goes here"
                    />
            </label>

            <label htmlFor="email">
                <input 
                    id = "email"
                    type = "email"
                    name = "email"
                    placeholder = "Your email address goes here"
                    />
            </label>

            <label htmlFor = "password">
                <input
                    id = "password"
                    type = "password"
                    name = "password"
                    placeholder = "Create your password"
                    />

            </label>

            <label htmlFor = "role">
                What is your role?
                <select
                    id = "role"
                    name = "role">
                        <option> Pick a role </option>
                        <option value = "Full Stack Web Developer">Full Stack Web Developer</option>
                        <option value = "Data Scientist">Data Scientist</option>
                        <option value = "Web Designer">Web Designer</option>
                        <option value = "Mobile Developer">Mobile Developer</option>

                    </select>
            </label>

            <label htmlFor = "terms">
                <input
                    id = "terms"
                    type = "checkbox"
                    name = "terms"
                    />
                     I agree to the Terms and Conditions.

            </label>

            <button type = "submit">
                Submit
            </button>

        </form>
      
    );
}


export default Form;
