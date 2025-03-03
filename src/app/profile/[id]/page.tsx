export default function UserProfile({ params }: any) {
    return (
        <div className="p-5  rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800">Profile Section</h1>
            <p className="text-gray-600">
                Profile Name: <span className="font-semibold text-blue-500">{params.id}</span>
            </p>
        </div>
    );
}