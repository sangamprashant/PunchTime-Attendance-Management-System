import { useEffect, useState } from 'react';
import { Table, Tag, Spin, Tabs } from 'antd';
import { toast } from 'react-toastify';
import { PageHeader } from '../../../components';
import { useAuth } from '../../../providers/AuthenticationContext';
import { apiRequest, errorMessage } from '../../../utilities';

const EmployeeView = () => {
    const [role, setRole] = useState<Role>('manager');
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await apiRequest(`/admin/role-user?role=${role}`, {
                method: 'GET',
                token: token as string,
            });
            setUsers(res);
        } catch (err) {
            toast.error(errorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [role]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <strong>{text}</strong>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Shift',
            dataIndex: 'shift',
            key: 'shift',
            render: (shift: string) => {
                const color =
                    shift === 'Morning Shift'
                        ? 'geekblue'
                        : shift === 'Evening Shift'
                            ? 'volcano'
                            : 'purple';
                return <Tag color={color}>{shift}</Tag>;
            },
        },
        {
            title: 'Branch',
            dataIndex: 'officeBranch',
            key: 'officeBranch',
            render: (branch: any) =>
                typeof branch === 'string'
                    ? branch
                    : `${branch?.name}, ${branch?.city}`,
        },
    ];

    return (
        <>
            <PageHeader title="View Employees & Managers" />
            <div className='p-6'>
                <Tabs
                    activeKey={role}
                    onChange={(key) => setRole(key as Role)}
                    items={[
                        { key: 'manager', label: 'Managers' },
                        { key: 'employee', label: 'Employees' },
                    ]}
                    className="mb-4"
                />

                <Spin spinning={loading}>
                    <Table
                        dataSource={users}
                        columns={columns}
                        rowKey={(record) => record._id || ''}
                        bordered
                        pagination={{ pageSize: 6 }}
                    />
                </Spin>
            </div>
        </>
    );
};

export default EmployeeView;
