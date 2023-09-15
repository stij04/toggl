import {TimeEntry} from "@/types/timeEntry";

type Props = {
    timeEntries: TimeEntry[]
    onSelect: (id: number) => () => void
    onDelete: (id: number, user_name: string) => () => void
}

export const TimeList = ({timeEntries, onSelect, onDelete}: Props) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                <tr>
                    <th/>
                    <th>Task</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Project ID</th>
                    <th>Project name</th>
                </tr>
                </thead>
                <tbody>{
                    timeEntries.map((timeEntry) => (
                            <tr key={timeEntry.id}>
                                <th>{timeEntry.id}</th>
                                <td>{timeEntry.task}</td>
                                <td>{timeEntry.start}</td>
                                <td>{timeEntry.end}</td>
                                <td>{timeEntry.project_id}</td>
                                <td>{timeEntry.project_name}</td>
                                <th>
                                    <button className="btn btn-neutral btn-sm mr-4"
                                            onClick={onSelect(timeEntry.id!)}
                                    >Edit
                                    </button>
                                    <button className="btn btn-secondary btn-sm mr-4"
                                            onClick={onDelete(timeEntry.id!, process.env.NEXT_PUBLIC_USERNAME!)}
                                    >Delete
                                    </button>
                                </th>
                            </tr>
                        )
                    )
                }</tbody>
            </table>
        </div>
    )
}
