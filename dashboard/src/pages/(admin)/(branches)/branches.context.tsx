import { createContext, useContext } from "react";

type branchContext = {

}

const BranchContext = createContext<branchContext | undefined>(undefined);

const BranchesProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <BranchContext value={{}}>
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
