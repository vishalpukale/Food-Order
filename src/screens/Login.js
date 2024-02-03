import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {

  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5001/api/loginuser", {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password,
                })
            });
            console.log(credentials);

            const json = await response.json();
            console.log(json);

            if (!json.success) {
                alert("Enter valid credentials");
            }

            if(json.success) {
                localStorage.setItem("userEmail", credentials.email);
                localStorage.setItem("authToken", json.authToken);
                console.log(localStorage.getItem("authToken"));
                navigate("/");
            }

        } catch (error) {
            console.error("Error:", error.message);
        }
    }

    const onChange = (event) => {
        setcredentials({...credentials, [event.target.name]:event.target.value})
    }

    

  return (
    <div>
        <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" autoComplete="email"  name='email' value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" autoComplete="current-password"  id="exampleInputPassword1"  name='password' value={credentials.password} onChange={onChange}/>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to='/creatuser' className='m-3 btn btn-danger'>Don't have an account? Sign-Up</Link>
                </form>
        </div>
    </div>
  )
}
