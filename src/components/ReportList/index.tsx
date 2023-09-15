import {useMemo, useState} from "react";
import {TimeEntry} from "@/types/timeEntry";

type Props = {
    timeEntries: TimeEntry[]
}

export const ReportList = ({timeEntries}: Props) => {

    // @ts-ignore
    const uniqueProjectNames = [...new Set(timeEntries.map(te => te.project_name))]

    const [selectedReport, setSelectedReport] = useState<string | undefined>(uniqueProjectNames[0]);

    const filteredTimeEntries = useMemo(() => {
        return selectedReport
            ? timeEntries.filter((te) => te.project_name === selectedReport)
            : timeEntries;
    }, [selectedReport, timeEntries]);

    const groupBy = (array: TimeEntry[], key: keyof TimeEntry) => {
        return array.reduce((result, currentValue) => {
            const dateKey = new Date(currentValue[key]!).toISOString().split('T')[0];
            (result[dateKey] = result[dateKey] || []).push(currentValue);
            return result;
        }, {} as Record<string, TimeEntry[]>);
    };

    const groupedTimeEntries = useMemo(() => groupBy(filteredTimeEntries, "start"), [filteredTimeEntries]);

    const calculateSumTime = (timeEntries: TimeEntry[]) => {
        return timeEntries.reduce((acc, curr) => {
            const startTime = new Date(curr.start).getTime();
            const endTime = new Date(curr.end).getTime();
            return acc + Math.round((endTime - startTime) / (1000 * 60));
        }, 0);
    };

    return (
        <div className="overflow-x-auto">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Select project</span>
                </label>
                <select onChange={(e) => setSelectedReport(e.target.value)}
                        className="select select-bordered">
                    {uniqueProjectNames.map((projectName) => (
                        <option key={projectName} value={projectName}>{projectName}</option>
                    ))}
                </select>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>Project ID</th>
                    <th>Project name</th>
                    <th>Date</th>
                    <th>Total time spent in minutes</th>
                </tr>
                </thead>
                <tbody>
                {
                    Object.entries(groupedTimeEntries).map(([date, timeEntries]) => (
                        <tr key={date}>
                            <td>{timeEntries[0].project_id}</td>
                            <td>{timeEntries[0].project_name}</td>
                            <td>{date}</td>
                            <td>{calculateSumTime(timeEntries)}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}
