import React, {useEffect, useState} from 'react'
import {getAllProjects} from '@/clientCalls/projects'
import {FetchedProjects, Project} from "@/types/project";

type Props = {
    name: string
    value: number
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const ProjectSelector = ({name, value, handleChange}: Props) => {
    const [projects, setProjects] = useState<Project[]>([])
    useEffect(() => {
        getAllProjects()
            .then((response) => response.json())
            .then((data: FetchedProjects) => setProjects(data.data.filter((item) => item.active)))
    }, [])

    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">Project</span>
            </label>
            <select name={name} value={value} onChange={handleChange}
                    className="select select-bordered"
            >
                {projects.map((p) => (
                    <option key={p.id!} value={p.id!}>{p.name}</option>
                ))}
            </select>
        </div>
    )
}
