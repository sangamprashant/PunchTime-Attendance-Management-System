import { Card, Descriptions, Tag } from 'antd';
import { useAuth } from '../../providers/AuthenticationContext';

const SettingComponent = () => {
  const { user } = useAuth();

  return (
    <div className="mx-auto p-6">
      <Card className='shadow' title="Account Settings">
        <Descriptions title="Profile Info" bordered column={1}>
          <Descriptions.Item label="Name">{user?.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
          <Descriptions.Item label="Role">
            <Tag color={
              user?.role === 'admin' ? 'volcano' :
                user?.role === 'manager' ? 'geekblue' :
                  'green'
            }>
              {user?.role?.toUpperCase()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Shift">{user?.shift}</Descriptions.Item>
          {user?.officeBranch && (
            <Descriptions.Item label="Branch">
              {typeof user.officeBranch === 'string'
                ? user.officeBranch
                : `${user.officeBranch?.name}, ${user.officeBranch?.city}`}
            </Descriptions.Item>
          )}
          <Descriptions.Item label="Password">
            <span className="text-gray-500 italic">Password change is disabled in test mode</span>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <p className="text-xs text-gray-500 mt-4">
        🔒 For testing purposes, password changes are disabled. Please use the default login credentials provided.
      </p>
    </div>
  );
};

export default SettingComponent;
