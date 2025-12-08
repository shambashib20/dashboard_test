import { useEffect, useState } from "react";
import { Input, Button, message } from "antd";

import { authService } from "../services/auth.service";
import GlobalLoader from "../components/GlobalLoader";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const student = JSON.parse(localStorage.getItem("student"));



    // Fetch user details
    const fetchProfile = async () => {
        try {
            setLoading(true);

            const res = await authService.student_profile({
                student_name: student?.name,
            });

            // API returns: { status, message, data }
            setUser(res.data);
            setEmail(res.data.email || "");
            setLoading(false);
        } catch (err) {
            message.error(err.message || "Failed to load profile");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (student?.name) fetchProfile();
    }, []);

    // Save updated email
    const handleSaveEmail = async () => {
        try {
            setLoading(true);

            const res = await authService.update_student_email({
                student_name: student?.name,
                email,
            });


            message.success(res.message);


            fetchProfile();
        } catch (err) {
            message.error(err.message || "Failed to update email");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <GlobalLoader />
        );
    }

    return (
        <section className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="mb-8">

                <h1 className="text-3xl font-bold text-[#032768]">
                    My Profile
                </h1>
                <p className="text-gray-600 mt-2 mb-6">
                    Intermediate profile details
                </p>

                <div className="bg-white p-6 rounded-xl shadow  space-y-6">

                    {/* Name */}
                    <div>
                        <label className="font-medium text-gray-700">Full Name</label>
                        <Input value={user.name} disabled />
                        <p className="text-xs text-gray-500 mt-1">(Not editable)</p>
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="font-medium text-gray-700">Mobile Number</label>
                        <Input value={user.phone_number} disabled />
                        <p className="text-xs text-gray-500 mt-1">(Not editable)</p>
                    </div>

                    {/* Editable Email */}
                    <div>
                        <label className="font-medium text-gray-700">Email Address</label>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                    </div>

                    <div className="text-right">
                        <Button
                            type="primary"
                            style={{
                                background: "#032768",
                                borderRadius: "8px",
                                padding: "6px 20px"
                            }}
                            loading={loading}
                            onClick={handleSaveEmail}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </section>

    );
}
