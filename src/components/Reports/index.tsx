'use client'
import {TimeEntry} from "@/types/timeEntry";
import {ReportList} from "@/components/ReportList";

type Props = {
    timeEntries: TimeEntry[]
}

export const Reports = ({timeEntries}: Props) => {
    return (
        <ReportList timeEntries={timeEntries}/>
    )
}
