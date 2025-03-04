"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
 
  });
  const [buttonDisabled,setButtonDisabled] = React.useState(false)
  const [loading,setLoading] = React.useState(false);
  const router = useRouter()

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
        user,
        {
          withCredentials: true, 
        }
      );
      toast.success("Signup successfully");
      router.push("/login");
      console.log(response);
      
    } catch (error: any) {
      console.error("Signup failed:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(()=>{
    if(user.email.length > 0 && user.name.length > 0 && user.password.length > 0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <p className="text-xl text-pink-500">{loading ? "loading" :""}</p>
        <h1 className="text-2xl font-semibold text-center text-gray-800">Sign Up</h1>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              id="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Signup Button */}
          <button
            onClick={onSignup}
            className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none cursor-pointer"
          >
            {buttonDisabled?"signup":"Sign Up"}
          </button>

          {/* Login Link */}
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
