import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import AppServices from '../services';

import logo from '../assets/images/logo.png';
import '../assets/scss/login.scss';

function Signup() {
    const [firstNname, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value);
    };
    const onChangeLastName = (e) => {
        setLastName(e.target.value);
    };
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePhone = (e) => {
        setPhone(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (submitted) return;
        setSubmitted(true);

        try {
            const response = await AppServices.signup({
                firstName:firstNname,
                lastName,
                email,
                phoneNumber: phone,
                password,
            });

            if (response.data.success) {
                toast.success('Signup successful');
                navigate('/login');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }

        setSubmitted(false);
    };

    return (
        <div className="bg-primary min-h-screen py-4  flex justify-center">
            <div className="form bg-main flex max-w-md w-screen h-max justify-center p-8 m-auto">
                <form className="text-center" onSubmit={handleSignup}>
                    <img src={logo} className="mb-9 mx-auto h-[23vh]" alt="logo" />
                    <div className="title mb-8">
                        Welcome to Binary SuperMarket
                        <br />
                        <div className="small">Enjoy the best online experience</div>
                    </div>
                    <div className="input-container mb-8">
                        <input
                            onChange={onChangeFirstName}
                            className="bg"
                            placeholder="First Name"
                            type="text"
                            name="firstName"
                            id="firstName"
                            required
                        />
                    </div>

                    <div className="input-container mb-8">
                        <input
                            onChange={onChangeLastName}
                            className="bg"
                            placeholder="Last Name"
                            type="text"
                            name="lastName"
                            id="lastName"
                            required
                        />
                    </div>

                    <div className="input-container mb-8">
                        <input
                            onChange={onChangeEmail}
                            className="bg"
                            placeholder="email"
                            type="email"
                            name="email"
                            id="email"
                            required
                        />
                    </div>
                    <div className="input-container mb-8">
                        <input
                            onChange={onChangePhone}
                            className="bg"
                            placeholder="phone"
                            type="text"
                            name="phone"
                            id="phone"
                            required
                        />
                    </div>
                    <div className="input-container mb-8">
                        <input
                            onChange={onChangePassword}
                            className="bg"
                            placeholder="password"
                            type="password"
                            name="pwd"
                            id="pwd"
                            required
                        />
                    </div>
                    <div className="input-container mb-8">
                        <input
                            className="submit bg-primary text-main cursor-pointer rounded-md"
                            type="submit"
                            value="signup"
                        />
                    </div>

                    <div>
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
