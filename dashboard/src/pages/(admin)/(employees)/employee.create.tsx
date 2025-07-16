import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PageHeader } from "../../../components";
import { useAuth } from "../../../providers/AuthenticationContext";
import { apiRequest, errorMessage } from "../../../utilities";

const { Option } = Select;

const AddEmployeeForm: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [branches, setBranches] = useState<Branch[]>([]);
    const { token } = useAuth()

    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await apiRequest("/admin/create-user", {
                method: "POST",
                body: values,
                token: token as string
            });
            toast.success("Employee created successfully")
            form.resetFields();
        } catch (error: any) {
            toast.error(errorMessage(error))
        } finally {
            setLoading(false);
        }
    };


    const fetchBranches = async () => {
        setLoading(true);
        try {
            const res = await apiRequest("/branches", {
                method: "GET",
                token: token as string
            });
            setBranches(res);
        } catch (err) {
            toast.error(errorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    return (
        <>
            <PageHeader title="Add New Employee/Manager" />
            <div className="mx-auto p-6 bg-white">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ role: "employee", shift: "Morning Shift" }}
                >
                    <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[{ required: true, message: "Please enter name" }]}
                    >
                        <Input placeholder="Employee Name" autoComplete="false" />
                    </Form.Item>

                    <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[
                            { required: true, message: "Please enter email" },
                            { type: "email", message: "Invalid email format" },
                        ]}
                    >
                        <Input placeholder="Email" autoComplete="false" />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Please enter password" }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-2">
                        <Form.Item
                            label="Role"
                            name="role"
                            rules={[{ required: true, message: "Please select role" }]}
                        >
                            <Select>
                                <Option value="employee">Employee</Option>
                                <Option value="manager">Manager</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Office Branch"
                            name="officeBranch"
                            rules={[{ required: true, message: "Please select role" }]}
                        >
                            <Select>
                                <Option value="">Select a Branch</Option>
                                {branches.map((b, i) => (<Option value={b._id} key={i}>{b.pincode}, {b.name}, {b.city}</Option>))}
                            </Select>
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Shift"
                        name="shift"
                        rules={[{ required: true, message: "Please select shift" }]}
                    >
                        <Select>
                            <Option value="Morning Shift">Morning Shift</Option>
                            <Option value="Evening Shift">Evening Shift</Option>
                            <Option value="Night Shift">Night Shift</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Create
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default AddEmployeeForm;
