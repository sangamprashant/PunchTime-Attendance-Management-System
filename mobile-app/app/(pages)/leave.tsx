import { LeaveApply, LeaveHistory, LeaveTab } from '@/components/(page)'
import React, { useState } from 'react'

const LeaveScreen = () => {
    const [tab, setTab] = useState<'apply' | 'history'>('apply')

    return (
        <>
            <LeaveTab tab={tab} setTab={setTab} />
            {tab === 'apply' ? (
                <LeaveApply />
            ) : (
                <LeaveHistory />
            )}
        </>
    )
}

export default LeaveScreen
