import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [data, setData] = useState({});
    const [alertMessage, setAlertMessage] = useState()
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const handleChange = (event) =>{
        setData({...data, [event.target.name]: event.target.value});
    }
  
    const handleSubmit = (event) => {
        event.preventDefault();
        const config = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }
 
		fetch(process.env.BACKEND_URL + "/api/login", config)
			.then((response) => response.json())
			.catch(error => console.log('error', error))
			.then(response => {
              
                if (response.message == "Email and password are required") {
                    
                    setAlertMessage(
                        <div className="alert alert-warning" role="alert">
                            Email and password are required
                        </div>)
                    
                }if (response.message == "Email and password incorrect") {
                   
                    setAlertMessage(
                        <div className="alert alert-warning" role="alert">
                            Email and password incorrect
                        </div>)
                }if (response.user_id) {
                    
                    localStorage.setItem('token', response.message);
                    console.log(localStorage.getItem('token'))
                    navigate("/private");
                    
                }
                
			});
    }

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                onChange={(e) => handleChange(e)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="exampleInputPassword1"
                onChange={(e) => handleChange(e)}/>
            </div>
           
            {alertMessage}
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    ); 
}