import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';




const Form = () => {

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
        .reach()



    }




//      // inline validation, validating one key/value pair at a time
//   const validateChange = (e) => {
//     // get the rules out of schema with reach at key "e.target.name" --> "formSchema[e.target.name]"

//     yup
//       .reach(formSchema, e.target.name)
//       .validate(e.target.name === "terms" ? e.target.checked : e.target.value) // compare with real value. does it break the rule?
//       .then((valid) => {
//         // if valid param is true, then erase any errors in error state at that key/value in errors
//         setErrors({
//           ...errors,
//           [e.target.name]: ""
//         });
//       })
//       .catch((err) => {
//         console.log(err);

//         // if failing validation, set error in state
//         setErrors({
//           ...errors,
//           [e.target.name]: err.errors[0]
//         });
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
