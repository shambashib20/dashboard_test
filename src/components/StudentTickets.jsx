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
import { EyeOutlined } from "@ant-design/icons";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { fetchTicketsByStudent, createTicket, fetchTicketDetails } from "../services/ticket.service";

const TicketSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    allowed_email: Yup.string().email("Invalid email").required("Allowed email is required"),
});

export default function StudentTickets() {
    const [open, setOpen] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);

    const [detailsOpen, setDetailsOpen] = useState(false);
    const [ticketDetails, setTicketDetails] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);

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
        _id: t._id,
        title: t.title,
        status: t.status,
        createdAt: new Date(t.createdAt).toLocaleString(),
        updatedAt: new Date(t.updatedAt).toLocaleString(),
    }));

    const openTicketDetails = async (ticketId) => {
        try {
            setDetailsLoading(true);
            setDetailsOpen(true);

            const response = await fetchTicketDetails(ticketId);

            setTicketDetails(response.data);
        } catch (err) {
            message.error("Failed to load ticket details!");
            setDetailsOpen(false);
        } finally {
            setDetailsLoading(false);
        }
    };

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
        { title: "Updated At", dataIndex: "updatedAt" },
        {
            title: "Action",
            render: (_, record) => (
                <Button
                    type="link"
                    icon={<EyeOutlined />}
                    style={{ color: "#032768", fontWeight: "600" }}
                    onClick={() => openTicketDetails(record._id)}
                >

                </Button>
            )
        }
    ];

    // -------------------- Render UI --------------------
    return (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 bg-gray-50">

            {/* Top Bar */}
            <div className="mb-6 flex items-end justify-between">
                <style>
                    {`
            .create-btn {
                background-color: #032768 !important;
                border-radius: 8px;
                padding: 6px 20px;
                color: white;
            }
            .create-btn:hover {
                background-color: #2b6cb0 !important;
            }
        `}
                </style>
                <h2 className="text-3xl font-bold text-[#032768]">Support Center</h2>
                <Button
                    type="primary"
                    className="create-btn"
                    onClick={() => setOpen(true)}
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


            <Modal
                title="Ticket Details"
                open={detailsOpen}
                onCancel={() => setDetailsOpen(false)}
                footer={null}
                width={700}
            >
                {detailsLoading ? (
                    <div className="flex justify-center py-10">
                        <Spin size="large" />
                    </div>
                ) : ticketDetails ? (
                    <div className="space-y-4">

                        {/* Basic Info */}
                        <div className="p-4 bg-gray-100 rounded-lg">
                            <p><strong>Ticket ID:</strong> {ticketDetails.subject}</p>
                            <p><strong>Title:</strong> {ticketDetails.title}</p>
                            <p><strong>Status:</strong>
                                <Tag color={statusColors[ticketDetails.status]}>
                                    {ticketDetails.status.replace("_", " ")}
                                </Tag>
                            </p>
                            <p><strong>Description:</strong> {ticketDetails.description}</p>
                            <p><strong>Allowed Email:</strong> {ticketDetails.allowed_email}</p>
                            <p><strong>Created At:</strong>
                                {new Date(ticketDetails.createdAt).toLocaleString()}
                            </p>
                        </div>

                        {/* Remarks */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Remarks</h3>

                            {ticketDetails.remarks?.length === 0 ? (
                                <p className="text-gray-500">No replies yet.</p>
                            ) : (
                                ticketDetails.remarks.map((r) => (
                                    <div
                                        key={r._id}
                                        className="border rounded-lg p-3 mb-3 bg-white shadow-sm"
                                    >
                                        <p><strong>{r.title}</strong></p>
                                        <p className="text-sm text-gray-600">{r.subject}</p>
                                        <div
                                            className="mt-2 text-gray-700"
                                            dangerouslySetInnerHTML={{ __html: r.description }}
                                        ></div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            {new Date(r.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>

                    </div>
                ) : (
                    <p className="text-gray-600">No data available</p>
                )}
            </Modal>

        </div>
    );
}

