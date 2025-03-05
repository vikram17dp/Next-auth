"use client";
import axios from 'axios'
import  { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
export default function ProfilePage() {
   
    const router = useRouter()
    const [user,setUser] = useState<{email:string,name:string} | null>(null);
    const handleLogout = async () => {
       try {
             await axios.get('/api/users/logout')
             toast.success("logout succesfully!")
             router.push('/login')
       } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("logout failed:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "logout failed");
          } else {
            console.error("Unexpected error:", error);
            toast.error("An unexpected error occurred");
          }
       }
    };
    const getUserDetails = async ()=>{
       try {
        const res = await axios.get('/api/users/me')
        setUser(res.data.data)

       } catch (error) {
        console.error("Failed to fetch user details:", error);
        toast.error("Failed to fetch user details");
       }
    }
    useEffect(()=>{
        getUserDetails()
    },[])
    return (
        <div className="flex justify-center items-center h-screen bg-gray-500">
        <div className="w-96 p-5 rounded-lg shadow-lg bg-white text-gray-900">
            <h1 className="text-2xl font-bold text-center">Profile Page</h1>
            <hr className="my-3 border-gray-300" />
            {user ? (
                    <div className="mb-4">
                        <p className="text-lg">Name: {user.name}</p>
                        <p className="text-lg mb-2">Email: {user.email}</p>
                    </div>
                ) : (
                    <p className="text-center text-gray-600">Loading user details...</p>
                )}
            <button 
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition w-full"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    </div>
    );
}
