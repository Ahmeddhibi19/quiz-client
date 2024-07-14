"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { registerUser } from '../redux/AuthSlice';
import { motion } from 'framer-motion';
import ProgressBar from './progressBar';
import { namaVerification, emailVerification,passwordVerification } from '@/utils/validation';
import { User } from '../redux/AuthSlice';
import Spinner from './spinner';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';

interface PersonalInfoProps {
  handleClick: () => void;
}

const Register: React.FC<PersonalInfoProps> = ({ handleClick }) => {
  const [isClient, setIsClient] = useState(false);
  const [firstname, setFirstName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [lastname, setLastName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [civil_status, setCivil_Status] = useState<"married" | "single">("single");
  const [age, setAge] = useState<number>(18);
  const [sex, setSex] = useState<"male" | "female">("male");
  const [Function, setFunction] = useState<string>('');
  const [formError, setFormError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!namaVerification(firstname)) {
      setFormError(true);
      setErrorMessage('First Name must contain only letters');
    } else if (!emailVerification(email)) {
      setFormError(true);
      setErrorMessage('Email is not valid');
    } else if (!namaVerification(lastname)) {
      setFormError(true);
      setErrorMessage('Last Name must contain only letters');
    } else if (age < 18) {
      setFormError(true);
      setErrorMessage('Age must be greater than 18');
    }else if(!passwordVerification(password)){
      setFormError(true);
      setErrorMessage('password require a minimum length of 8 characters and at least one  special characters (# & @ %).');
  } else {
      setFormError(false);
      setErrorMessage('');
    }
  }, [firstname, email, lastname, age,password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formError) {
      const user: User = { firstname, lastname, Function, age, email, civil_status, password, sex, address };
      setShowOverlay(true);  // Show overlay when form is submitted
      dispatch(registerUser(user)).then(() => {
        setShowOverlay(true);  // Hide overlay after registration attempt
      });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (!isClient) {
    return null;
  }

  if (isAuthenticated) {
    handleClick();
    return null;
  }

  return (
    <div className="relative flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {showOverlay && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <Spinner />
          {error && (
            <div className="absolute text-red-600 text-center mt-4">{error}</div>
          )}
        </div>
      )}
      <div className="lg:w-1/3 w-full gradient-background flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-white text-center"
        >
          <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
          <p className="text-lg">Please fill out the form to register.</p>
        </motion.div>
      </div>
      <div className="lg:w-2/3 w-full flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <ProgressBar step={0} />
          <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <h1 className="text-3xl font-bold mb-4">Personal Info</h1>
            {formError && (
              <div>
                <p className='text-red-600'>{errorMessage}</p>
              </div>
            )}
            <div>
              <label htmlFor="firstname" className="block text-gray-700 font-semibold">First Name</label>
              <input
                id="firstname"
                type="text"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-gray-700 font-semibold">Last Name</label>
              <input
                id="lastname"
                type="text"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 font-semibold">Password</label>
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm"
                required
              />
              <span 
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-12 transform -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <div>
              <label htmlFor="age" className="block text-gray-700 font-semibold">Age</label>
              <input
                id="age"
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
                className="w-full p-3 border rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-700 font-semibold">Address</label>
              <input
                id="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm"
                required
              />
            </div>
            <div>
              <label htmlFor="sex" className="block text-gray-700 font-semibold">Sex</label>
              <select
                id="sex"
                name="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value as 'male' | 'female')}
                className="w-full p-3 border rounded-lg shadow-sm"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label htmlFor="civil_status" className="block text-gray-700 font-semibold">Civil Status</label>
              <select
                name="civil_status"
                id="civil_status"
                onChange={(e) => setCivil_Status(e.target.value as 'married' | 'single')}
                className="w-full p-3 border rounded-lg shadow-sm"
              >
                <option value="married">Married</option>
                <option value="single">Single</option>
              </select>
            </div>
            <div>
              <label htmlFor="Function" className="block text-gray-700 font-semibold">Function</label>
              <input
                id="Function"
                type="text"
                value={Function}
                onChange={(e) => setFunction(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </motion.form>
          <div className="flex justify-center mt-4">
            Already have an account? <Link href={"/login"} className='text-blue-500 underline ml-2'> Login</Link>
    </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
