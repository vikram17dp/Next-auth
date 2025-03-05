"use client";
import axios from 'axios'
import  { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
export default function ProfilePage() {
    const user = {
        email: "user@example.com",
        username: "JohnDoe"
    };
    const router = useRouter()
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

    return (
        <div className="flex justify-center items-center h-screen bg-gray-500">
        <div className="w-96 p-5 rounded-lg shadow-lg bg-white text-gray-900">
            <h1 className="text-2xl font-bold text-center">Profile Page</h1>
            <hr className="my-3 border-gray-300" />
            <div className="mb-4 ">
                <p className="text-lg mb-2">Email: {user.email}</p>
                <p className="text-lg">Username: {user.username}</p>
            </div>
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
