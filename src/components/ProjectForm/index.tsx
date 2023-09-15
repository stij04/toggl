import {Project} from '@/types/project'
import React, {useState} from 'react'
import {Input} from '@/components/Input'

type Props = {
    initialValues: Project
    onSave: (project: Project) => void
    onCancel: () => void
}

export const ProjectForm = ({initialValues, onSave, onCancel}: Props) => {
    const [project, setProject] = useState(initialValues)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setProject({...project, [name]: value})
    }

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        onSave(project)
    }

    return (
        <form onSubmit={handleSave}>
            <Input label="Name" name="name" value={project.name} onChange={handleChange}/>
            <div className="modal-action">
                <button className="btn btn-primary" onClick={handleSave}>Save</button>
                <button className="btn btn-neutral" onClick={onCancel}>Close</button>
            </div>
        </form>
    )
}
