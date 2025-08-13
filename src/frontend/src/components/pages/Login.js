import React, {useState} from "react";
import CustomInput from "../common/CustomInput";
import Button from "../common/Button";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

    const handleChangePass = e => {
        setPassword(e.currentTarget.value )
    };
    const handleChangeEmail = e => {
        setEmail(e.currentTarget.value )
    };

        return (
            <div className="App">
                <form className="form">
                    <CustomInput
                        labelText="Email"
                        id="email"
                        formControlProps={{
                            fullWidth: true
                        }}
                        handleChange={handleChangeEmail}
                        type="text"
                    />
                    <CustomInput
                        labelText="Password"
                        id="password"
                        formControlProps={{
                            fullWidth: true
                        }}
                        handleChange={handleChangePass}
                        type="password"
                    />

                    <Button type="button" color="primary" className="form__custom-button">
                        Log in
                    </Button>
                </form>
            </div>
        );

}
export default Login