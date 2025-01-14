import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import checkValidate from "../constants/checkValidate";
import { addUser } from "../redux/utils/appSlice";
import wimg from "../img/wimg.jpg.jpg"

const Auth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const [errorMessage, setErrorMessage] = useState(null);
    const [isItSignIn, setIsItSignIn] = useState(true);

    const handleSignin = () => setIsItSignIn(!isItSignIn);

    const handleClicks = async () => {
        const message = checkValidate(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return;

        try {
            if (!isItSignIn) {
                const userCredential = await createUserWithEmailAndPassword(auth, email.current.value, password.current.value);
                const user = userCredential.user;

                await updateProfile(user, {
                    displayName: name.current?.value || "",
                    photoURL: "https://catastic.pet/wp-content/uploads/2023/04/white-british-cat-are-wear-sunglass-shirt-concept-summer-yellow-background-1.jpg"
                });

                dispatch(addUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: name.current?.value || "",
                    photoURL: user.photoURL
                }));
                navigate("/tasklinput");
            } else {
                await signInWithEmailAndPassword(auth, email.current.value, password.current.value);
                navigate("/tasklinput");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    return (
        <div>
            <div className='absolute'>
                <img className=' h-screen object-cover md:h-auto no-scrollbar ' src={wimg}
                    alt='netflix-bg' />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="py-6 px-4 sm:py-8 sm:px-6 rounded-lg w-full sm:w-10/12 md:w-3/12 bg-gradient-to-b from-blue-500 to-blue-700 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white shadow-lg"
            >
                <h1 className="font-bold text-2xl sm:text-3xl py-3 sm:py-4 text-center">
                    {isItSignIn ? "Sign in" : "Sign up"}
                </h1>
                {!isItSignIn && (
                    <input
                        ref={name}
                        type="text"
                        placeholder="Your name"
                        className="my-2 sm:my-3 p-3 sm:p-4 w-full bg-blue-200 text-blue-900 rounded-lg shadow-inner placeholder-blue-600"
                    />
                )}
                <input
                    ref={email}
                    type="text"
                    placeholder="Email or username"
                    className="my-2 sm:my-3 p-3 sm:p-4 w-full bg-blue-200 text-blue-900 rounded-lg shadow-inner placeholder-blue-600"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="my-2 sm:my-3 p-3 sm:p-4 w-full bg-blue-200 text-blue-900 rounded-lg shadow-inner placeholder-blue-600"
                />
                <p className="text-red-600 font-semibold text-xs sm:text-sm py-2">{errorMessage}</p>
                <button
                    className="my-2 sm:my-3 p-3 sm:p-4 w-full bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold rounded-lg shadow-md transition-all"
                    onClick={handleClicks}
                >
                    {isItSignIn ? "Sign in" : "Sign up"}
                </button>
                <p
                    onClick={handleSignin}
                    className="cursor-pointer text-center text-blue-100 hover:text-yellow-300 mt-3 sm:mt-4"
                >
                    {isItSignIn ? "New? Sign up here" : "Already have an account? Sign in here"}
                </p>
            </form>


        </div>
    )
}

export default Auth;
