import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';




const Form = () => {

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
