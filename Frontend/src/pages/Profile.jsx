import React, { useState } from "react";

const Profile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState(""); // New state for new password
    const [profilePicture, setProfilePicture] = useState(null);
    const [passwordUpdateMessage, setPasswordUpdateMessage] = useState(""); // State for feedback message

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Profile Updated:", { name, email, phone, password, newPassword, profilePicture });
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(URL.createObjectURL(file));
        }
    };

    const handleChangePassword = async () => {
        if (!password || !newPassword) {
            setPasswordUpdateMessage("Please fill in both current and new passwords.");
            return;
        }

        try {
            // Simulate backend API call
            await fetch("/api/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword: password, newPassword }),
            });
            setPasswordUpdateMessage("Password updated successfully!");
        } catch (error) {
            setPasswordUpdateMessage("Failed to update password. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white dark:bg-[#2a2a2a] rounded-xl shadow-lg p-8">
                <h2 className="text-center text-2xl font-bold text-[#441752] dark:text-[#A888B5] mb-6">
                    Repobot
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                                {profilePicture ? (
                                    <img
                                        src={profilePicture}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-500 dark:text-gray-400 flex items-center justify-center h-full">
                                        No Image
                                    </span>
                                )}
                            </div>
                            <label
                                htmlFor="profilePicture"
                                className="mt-4 text-sm font-medium text-[#441752] dark:text-[#A888B5] cursor-pointer"
                            >
                                Upload Profile Picture
                            </label>
                            <input
                                id="profilePicture"
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                className="hidden"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-[#441752] focus:ring focus:ring-[#441752]/50 dark:bg-gray-700 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-[#441752] focus:ring focus:ring-[#441752]/50 dark:bg-gray-700 dark:text-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Phone
                            </label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-[#441752] focus:ring focus:ring-[#441752]/50 dark:bg-gray-700 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-[#441752] focus:ring focus:ring-[#441752]/50 dark:bg-gray-700 dark:text-white"
                                required
                            />
                        </div>

                    </div>
                    <div className="mt-6 space-y-4">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#441752] hover:bg-[#5C2D6E] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#441752]"
                        >
                            Update Profile
                        </button>
                        <button
                            type="button"
                            onClick={handleChangePassword}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5C2D6E] hover:bg-[#441752] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5C2D6E]"
                        >
                            Change Password
                        </button>
                        {passwordUpdateMessage && (
                            <p className="text-center text-sm mt-2 text-gray-700 dark:text-gray-300">
                                {passwordUpdateMessage}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
