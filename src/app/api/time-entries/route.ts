import {createTE, getAllTEs, updateTE, deleteTE} from '@/serverCalls/timeEntries'
import {revalidatePath} from 'next/cache'
import {generateUrl} from '@/helpers/generate_url'
import {NextResponse} from 'next/server'

export async function GET() {
    return await getAllTEs()
}

export async function POST(request: Request) {
    const json = await request.json()
    const res = await createTE(json)
    if (res.ok) {
        revalidatePath(generateUrl('/time-entries'))
    }

    const data = await res.json()
    return NextResponse.json({data})
}

export async function PUT(request: Request) {
    const json = await request.json()
    const res = await updateTE(json)
    if (res.ok) {
        revalidatePath(generateUrl('/time-entries'))
    }

    const data = await res.json()
    return NextResponse.json({data})
}

export async function DELETE(request: Request) {
    const json = await request.json()
    const res = await deleteTE(json.id, json.user_name)
    if (res.ok) {
        revalidatePath(generateUrl('/time-entries'))
    }

    const data = await res.json()
    return NextResponse.json({data})
}
