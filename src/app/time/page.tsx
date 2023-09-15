import {Times} from '@/components/Times'
import {getAllTEs} from '@/serverCalls/timeEntries'

async function getData() {
    const res = await getAllTEs()
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }
    return res.json()
}

export default async function Page() {
    const data = await getData()
    return (
        <div className="mx-6">
            <h1>Time</h1>
            <Times timeEntries={data}/>
        </div>
    )
}
