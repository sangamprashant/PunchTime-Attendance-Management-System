import { Table } from 'antd';
import { PageHeader } from '../../../components';
import { useBranchContext } from './branches.context';

const ViewBranches = () => {
    const { branches, loading } = useBranchContext()
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
                <Table
                    columns={columns}
                    dataSource={branches}
                    rowKey="_id"
                    bordered
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                />
            </div>
        </>
    );
};

export default ViewBranches;
