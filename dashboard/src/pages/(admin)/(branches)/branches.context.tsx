import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../../../providers/AuthenticationContext";
import { apiRequest } from "../../../utilities";

type branchContext = {
    branches: Branch[], loading: boolean
}

const BranchContext = createContext<branchContext | undefined>(undefined);

const BranchesProvider = ({ children }: { children: React.ReactNode }) => {
    const [branches, setBranches] = useState<Branch[]>([]);
    const [loading, setLoading] = useState(true);

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
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchBranches();
        }
    }, [token]);

    return (
        <BranchContext value={{ branches, loading }}>
            {children}
        </BranchContext>
    )
}

const useBranchContext = () => {
    const context = useContext(BranchContext);
    if (!context) {
        throw new Error("useBranchContext must be used within an BranchesProvider");
    }
    return context;
};

export { BranchesProvider, useBranchContext };

