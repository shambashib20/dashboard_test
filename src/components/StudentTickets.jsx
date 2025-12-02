import { useState, useEffect } from "react";
import {
    Button,
    Modal,
    Input,
    Table,
    Select,
    Spin,
    Tag,
    message,
} from "antd";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { fetchTicketsByStudent, createTicket } from "../services/ticket.service";

const TicketSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    allowed_email: Yup.string().email("Invalid email").required("Allowed email is required"),
});

export default function StudentTickets() {
    const [open, setOpen] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);

    const student = JSON.parse(localStorage.getItem("student"));
    const studentName = student?.name;

    const allowedEmails = [
        "admin@mrgroup.com",
        "support@mrgroup.com",
        "shambashibmajumdar2020@gmail.com",
    ];

    // -------------------- Fetch Tickets --------------------
    const getTickets = async () => {
        if (!studentName) return;

        try {
            setLoading(true);
            const data = await fetchTicketsByStudent(studentName, 1, 10);
            setTickets(data?.tickets || []);
        } catch (err) {
            message.error("Failed to load tickets!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTickets();
    }, []);

    // -------------------- Stats --------------------
    const pendingCount = tickets.filter((t) => t.status === "PENDING").length;
    const replyCount = tickets.filter((t) => t.status === "REPLY_GIVEN").length;
    const closedCount = tickets.filter((t) => t.status === "CLOSED").length;
    const totalCount = tickets.length;

    const statusColors = {
        PENDING: "orange",
        REPLY_GIVEN: "blue",
        CLOSED: "green",
    };

    const StatCard = ({ title, value, color }) => (
        <div className="p-4 rounded-xl shadow-sm border bg-white flex flex-col">
            <span className="text-sm font-medium text-gray-600">{title}</span>
            <span className="text-2xl font-bold mt-2" style={{ color }}>
                {value}
            </span>
        </div>
    );

    // -------------------- Table Rows --------------------
    const ticketRows = tickets.map((t) => ({
        id: t.subject,
        title: t.title,
        status: t.status,
        createdAt: new Date(t.createdAt).toLocaleString(),
    }));

    const columns = [
        { title: "Ticket ID", dataIndex: "id" },
        { title: "Title", dataIndex: "title" },
        {
            title: "Status",
            dataIndex: "status",
            render: (status) => (
                <Tag color={statusColors[status] || "default"}>
                    {status.replace("_", " ")}
                </Tag>
            ),
        },
        { title: "Created At", dataIndex: "createdAt" },
    ];

    // -------------------- Render UI --------------------
    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 bg-gray-50">

            {/* Top Bar */}
            <div className="mb-6 flex items-end justify-between">
                <h2 className="text-3xl font-bold text-[#032768]">Support Center</h2>
                <Button
                    type="primary"
                    onClick={() => setOpen(true)}
                    style={{
                        backgroundColor: "#032768",
                        borderRadius: "8px",
                        padding: "6px 20px",
                    }}
                >
                    Create New
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard title="Pending Tickets" value={pendingCount} color="orange" />
                <StatCard title="Reply Given" value={replyCount} color="#032768" />
                <StatCard title="Closed Tickets" value={closedCount} color="green" />
                <StatCard title="Total Tickets" value={totalCount} color="#374151" />
            </div>

            {/* Ticket Table */}
            {loading ? (
                <div className="flex justify-center py-10">
                    <Spin size="large" />
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={ticketRows}
                    rowKey="id"
                    pagination={false}
                    className="rounded-xl bg-white"
                />
            )}

            {/* -------------------- Modal -------------------- */}
            <Modal
                title="Create New Ticket"
                open={open}
                onCancel={() => setOpen(false)}
                footer={null}
                destroyOnHidden
                forceRender
            >
                <Formik
                    initialValues={{
                        student_name: studentName,
                        title: "",
                        description: "",
                        allowed_email: "",
                    }}
                    validationSchema={TicketSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        console.log("SUBMIT FIRED ✔ (PRODUCTION + LOCAL)");

                        try {
                            await createTicket(values);
                            message.success("Ticket created successfully!");

                            resetForm();
                            setOpen(false);
                            getTickets();
                        } catch (err) {
                            message.error("Failed to create ticket!");
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting, errors, touched, setFieldValue, handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Student Name */}
                            <div>
                                <label className="font-medium">Student Name</label>
                                <Input value={studentName} disabled />
                            </div>

                            {/* Title */}
                            <div>
                                <label className="font-medium">Title</label>
                                <Field name="title">
                                    {({ field }) => (
                                        <Input {...field} placeholder="Enter title" />
                                    )}
                                </Field>
                                {errors.title && touched.title && (
                                    <p className="text-red-500">{errors.title}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="font-medium">Description</label>
                                <Field name="description">
                                    {({ field }) => (
                                        <Input.TextArea
                                            {...field}
                                            rows={4}
                                            placeholder="Describe your issue"
                                        />
                                    )}
                                </Field>
                                {errors.description && touched.description && (
                                    <p className="text-red-500">{errors.description}</p>
                                )}
                            </div>

                            {/* Allowed Email */}
                            <div>
                                <label className="font-medium">Allowed Email</label>
                                <Select
                                    placeholder="Select email"
                                    onChange={(value) => setFieldValue("allowed_email", value)}
                                    style={{ width: "100%" }}
                                >
                                    {allowedEmails.map((email) => (
                                        <Select.Option key={email} value={email}>
                                            {email}
                                        </Select.Option>
                                    ))}
                                </Select>

                                {errors.allowed_email && touched.allowed_email && (
                                    <p className="text-red-500">{errors.allowed_email}</p>
                                )}
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex justify-end gap-3 mt-6">
                                <Button onClick={() => setOpen(false)}>Cancel</Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Ticket"}
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
}
