'use client'
import {useRouter} from 'next/navigation'
import {TimeEntry} from '@/types/timeEntry'
import React, {useEffect, useState} from 'react'
import {Input} from '@/components/Input'
import {formatDate} from '@/helpers/formatDate'
import {createTE, updateTE, deleteTE} from '@/clientCalls/timeEntries'
import {ProjectSelector} from '@/components/ProjectSelector'
import {TimeList} from "@/components/TimeList";
import {Dialog} from "@/components/Dialog";
import {TimeForm} from "../TimeForm";

const initValue: TimeEntry = {
    end: '',
    start: '',
    task: '',
    project_id: 4,
    user_name: process.env.NEXT_PUBLIC_USERNAME!
}

type Props = {
    timeEntries: TimeEntry[]
}

export const Times = ({timeEntries}: Props) => {
    const [timeEntry, setTimeEntry] = useState<TimeEntry>(initValue)
    const [editingTimeEntry, setEditingTimeEntry] = useState<TimeEntry | undefined>(undefined)
    const router = useRouter()

    useEffect(() => {
        if (timeEntry.start && timeEntry.end && timeEntry.task) {
            createTE(timeEntry)
                .then(() => {
                    setTimeEntry(initValue)
                    router.refresh()
                })
        }
    }, [router, timeEntry])

    const selectTime = (id: number) => () => {
        setEditingTimeEntry(timeEntries.find((t) => t.id === id))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setTimeEntry({...timeEntry, [name]: value})
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target
        setTimeEntry({...timeEntry, [name]: value})
    }

    const saveTime = async (timeEntry: TimeEntry) => {
        timeEntry.user_name = process.env.NEXT_PUBLIC_USERNAME!
        const res = await updateTE(timeEntry)
        if (res.ok) {
            router.refresh()
            setEditingTimeEntry(undefined)
        }
    }

    const deleteTime = (id: number, user_name: string) => async () => {
        const res = await deleteTE(id, user_name)
        if (res.ok || res.status === 500) {
            router.refresh()
        }
    }

    return (
        <>
            <Dialog open={editingTimeEntry !== undefined} close={() => setEditingTimeEntry(undefined)}>
                {editingTimeEntry !== undefined &&
                    <TimeForm initialValues={editingTimeEntry} onSave={saveTime}
                              onCancel={() => setEditingTimeEntry(undefined)}/>}
            </Dialog>
            <form className="flex flex-wrap items-end">
                <Input label="Task" name="task" value={timeEntry.task} onChange={handleChange}/>
                <Input label="Start" name="start" value={timeEntry.start} onChange={handleChange}
                       type="datetime-local"/>
                <Input label="End" name="end" value={timeEntry.end} onChange={handleChange} type="datetime-local"/>
                <ProjectSelector name="project_id" value={timeEntry.project_id} handleChange={handleSelectChange}/>
                {timeEntry.start && (
                    <button
                        className="btn btn-neutral"
                        disabled={timeEntry.end !== ''}
                        onClick={() => {
                            setTimeEntry({...timeEntry, end: formatDate(new Date())})
                        }}
                    >Stop</button>
                )}
                {!timeEntry.start && (
                    <button
                        className="btn btn-neutral"
                        onClick={() => {
                            setTimeEntry({...timeEntry, start: formatDate(new Date())})
                        }}
                    >Start</button>
                )}

            </form>
            <TimeList timeEntries={timeEntries} onSelect={selectTime} onDelete={deleteTime}/>
        </>
    )
}
