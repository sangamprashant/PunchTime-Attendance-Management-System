import { Alert, Spin, Table } from 'antd';
import { useEffect, useState } from 'react';
import { PageHeader } from '../../../components';
import { apiRequest, errorMessage } from '../../../utilities';
import { useAuth } from '../../../providers/AuthenticationContext';

const ViewBranches = () => {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const { token } = useAuth()

    const fetchBranches = async () => {
        setLoading(true);
        try {
            const res = await apiRequest("/branches", {
                method: "GET",
                token: token as string
            });
            setBranches(res);
        } catch (err) {
            setError(errorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Pincode',
            dataIndex: 'pincode',
            key: 'pincode',
        },
    ];

    return (
        <>
            <PageHeader title="All Office Branches" />
            <div className="p-6">
                {loading ? (
                    <Spin tip="Loading branches..." size="large" />
                ) : error ? (
                    <Alert message="Error" description={error} type="error" showIcon />
                ) : (
                    <Table
                        columns={columns}
                        dataSource={branches}
                        rowKey="_id"
                        bordered
                        pagination={{ pageSize: 10 }}
                    />
                )}
            </div>
        </>
    );
};

export default ViewBranches;
