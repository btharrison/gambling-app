const Login = () => {

    // const handleLogin = async (username, password) => {
    // try {
    //     const response = await fetch('http://localhost:5000/login', {   // making api call to check db for user
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password }),
    //     });

    //     const data = await response.json();
    //     if (response.ok) {
    //     console.log('Login success:', data);
    //     // Store user info or token in state/localStorage
    //     } else {
    //     console.error('Login failed:', data.error);
    //     }
    // } catch (err) {
    //     console.error('Error logging in:', err);
    // }
    // };

    return (
        <div class="box">
            <form class="signupBox">
                <label>Username</label>
                <br/>
                <input
                    type="text" 
                    placeholder="Enter Username"   
                />
                <br/>

                <input 
                    type="email"
                    placeholder="Enter Email"
                /> 
                <br/>

                <input
                    type="password"
                    placeholder="Enter Password"
                />
                <br/>

                <input
                    type="password"
                    placeholder="Confirm Password"
                />
                <br/>
            </form>
        </div>
    );
}
export default Login;