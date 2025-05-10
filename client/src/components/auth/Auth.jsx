import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import { AUTH_ENDPOINTS } from '../../config/apiConfig';
import { useToast } from '../common/Toast';

const Auth = () => {
    const [isActive, setIsActive] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registerData, setRegisterData] = useState({ 
        firstName: '',
        lastName: '',
        username: '', 
        email: '', 
        password: '',
        role: 'BEGINNER'
    });
    const navigate = useNavigate();
    const { addToast } = useToast();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    "email": loginData.email,
                    "password": loginData.password
                }),
            });

            let data;
            try {
                data = await response.json();
            } catch (error) {
                // If the response is not JSON, create a fallback error object
                data = { message: `Error: ${response.status} ${response.statusText}` };
            }

            if (response.ok) {
                localStorage.setItem('token', data.token);
                addToast('Login successful!', 'success');
                navigate('/');
            } else {
                addToast(data.message || 'Login failed. Please check your credentials.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            addToast('An error occurred during login. Please try again.', 'error');
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(AUTH_ENDPOINTS.REGISTER, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(registerData),
            });

            let data;
            try {
                data = await response.json();
            } catch (error) {
                // If the response is not JSON, create a fallback error object
                data = { message: `Error: ${response.status} ${response.statusText}` };
            }

            if (response.ok) {
                addToast('Registration successful! Please login.', 'success');
                setIsActive(false); // Switch back to login form
            } else {
                addToast(data.message || 'Registration failed. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            addToast('An error occurred during registration. Please try again.', 'error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
                {/* Header */}
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        {isActive ? 'Create your account' : 'Sign in to your account'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {isActive ? 'Already have an account?' : "Don't have an account?"}{' '}
                        <button
                            onClick={() => setIsActive(!isActive)}
                            className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                        >
                            {isActive ? 'Sign in' : 'Sign up'}
                        </button>
                    </p>
                </div>

                {/* Login Form */}
                {!isActive && (
                    <form className="mt-8 space-y-6" onSubmit={handleLoginSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">Email address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className='bx bxs-envelope text-gray-400'></i>
                                    </div>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={loginData.email}
                                        onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                                        className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                                        placeholder="Email address"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className='bx bxs-lock-alt text-gray-400'></i>
                                    </div>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                                        className="appearance-none rounded-none relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <i className='bx bxs-lock-alt text-indigo-500 group-hover:text-indigo-400'></i>
                                </span>
                                Sign in
                            </button>
                        </div>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-4 gap-3">
                                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <i className='bx bxl-google text-xl'></i>
                                </a>
                                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <i className='bx bxl-facebook text-xl'></i>
                                </a>
                                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <i className='bx bxl-github text-xl'></i>
                                </a>
                                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <i className='bx bxl-linkedin text-xl'></i>
                                </a>
                            </div>
                        </div>
                    </form>
                )}

                {/* Register Form */}
                {isActive && (
                    <form className="mt-8 space-y-6" onSubmit={handleRegisterSubmit}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            {/* First and Last Name (side by side) */}
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label htmlFor="first-name" className="sr-only">First Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i className='bx bx-user text-gray-400'></i>
                                        </div>
                                        <input
                                            id="first-name"
                                            name="firstName"
                                            type="text"
                                            value={registerData.firstName}
                                            onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                                            className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                                            placeholder="First Name"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="sr-only">Last Name</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <i className='bx bx-user text-gray-400'></i>
                                        </div>
                                        <input
                                            id="last-name"
                                            name="lastName"
                                            type="text"
                                            value={registerData.lastName}
                                            onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                                            className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Username */}
                            <div className="mb-3">
                                <label htmlFor="username" className="sr-only">Username</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className='bx bx-at text-gray-400'></i>
                                    </div>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        value={registerData.username}
                                        onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                                        className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                                        placeholder="Username"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-3">
                                <label htmlFor="register-email" className="sr-only">Email</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className='bx bxs-envelope text-gray-400'></i>
                                    </div>
                                    <input
                                        id="register-email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={registerData.email}
                                        onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                                        className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                                        placeholder="Email address"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="register-password" className="sr-only">Password</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className='bx bxs-lock-alt text-gray-400'></i>
                                    </div>
                                    <input
                                        id="register-password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={registerData.password}
                                        onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                                        className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <i className='bx bx-user-plus text-indigo-500 group-hover:text-indigo-400'></i>
                                </span>
                                Sign up
                            </button>
                        </div>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-4 gap-3">
                                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <i className='bx bxl-google text-xl'></i>
                                </a>
                                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <i className='bx bxl-facebook text-xl'></i>
                                </a>
                                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <i className='bx bxl-github text-xl'></i>
                                </a>
                                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                    <i className='bx bxl-linkedin text-xl'></i>
                                </a>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Auth;
