import {Project} from '@/types/project'
import {useState} from "react";

type Props = {
    projects: Project[]
    onSelect: (id: number) => () => void
    onToggle: (id: number) => () => void
}

export const ProjectList = ({projects, onSelect, onToggle}: Props) => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);

    // @ts-ignore
    const uniqueUserNames = [...new Set(projects.map(project => project.user_name))];

    const filteredProjects = selectedUser
        ? projects.filter((project) => project.user_name === selectedUser)
        : projects;

    return (
        <div className="overflow-x-auto">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Filter by owner</span>
                </label>
                <select onChange={(e) => setSelectedUser(e.target.value)}
                        className="select select-bordered">
                    <option value="">All</option>
                    {uniqueUserNames.map((userName, index) => (
                        <option key={index} value={userName}>{userName}</option>
                    ))}
                </select>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th/>
                    <th>Name</th>
                    <th>Owner</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>{
                    filteredProjects.map((project) => (
                            <tr key={project.id} className={project.active ? undefined : 'line-through'}>
                                <th>{project.id}</th>
                                <td>{project.name}</td>
                                <td>{project.user_name}</td>
                                <th>
                                    <button className="btn btn-neutral btn-sm mr-4"
                                            onClick={onSelect(project.id!)}
                                    >edit
                                    </button>
                                    <button className="btn btn-primary btn-sm"
                                            onClick={onToggle(project.id!)}
                                    >toggle
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
