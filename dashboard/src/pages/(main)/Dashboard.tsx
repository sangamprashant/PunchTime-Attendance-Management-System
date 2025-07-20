import { useAuth } from "../../providers/AuthenticationContext";
import Stats from "./dashboard/Stats";

const Dashboard = () => {
    const { user } = useAuth()

    if (!user || !user.role) return null

    return (
        <div className="p-4">

            <Stats
                role={user?.role}
                data={{
                    totalEmployees: 120,
                    presentToday: 100,
                    absentToday: 15,
                    lateToday: 5,
                    totalBranches: 3,
                }}
            />

            <Stats
                role="manager"
                data={{
                    totalEmployees: 120,
                    presentToday: 100,
                    absentToday: 15,
                    lateToday: 5,
                    totalBranches: 3,
                }}
            />

        </div>
    );
};

export default Dashboard;
