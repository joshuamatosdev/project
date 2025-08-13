import React, {useState} from "react";
import CustomInput from "../common/CustomInput";
import Button from "../common/Button";

const Register = () => {
    const [email, setEmail] = useState("");
    const [emailConfirm, setEmailConfirm] = useState("");
    const [username, setUsername] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [password, setPassword] = useState("");

    const handleChangePass = e => {
        setPassword(e.currentTarget.value )
    };
    const handleChangePassConfirm = e => {
        setPasswordConfirm(e.currentTarget.value )
    };
    const handleChangeEmail = e => {
        setEmail(e.currentTarget.value )
    };
    const handleChangeEmailConfirm = e => {
        setEmailConfirm(e.currentTarget.value )
    };
    const handleChangeUsername = e => {
        setUsername(e.currentTarget.value )
    };

    return (
        <div className="App">
            <form className="form">
                <CustomInput
                    labelText="Username"
                    id="email"
                    formControlProps={{
                        fullWidth: true
                    }}
                    handleChange={handleChangeUsername}
                    type="text"
                />
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
                    labelText="Confirm Email"
                    id="email"
                    formControlProps={{
                        fullWidth: true
                    }}
                    handleChange={handleChangeEmailConfirm}
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
                <CustomInput
                    labelText="Confirm Password"
                    id="password"
                    formControlProps={{
                        fullWidth: true
                    }}
                    handleChange={handleChangePassConfirm}
                    type="password"
                />
                <Button type="button" color="primary" className="form__custom-button">
                    Log in
                </Button>
            </form>
        </div>
    );

}
export default Register