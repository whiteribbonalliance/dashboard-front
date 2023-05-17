const apiUrl = process.env.NEXT_PUBLIC_WRA_DASHBOARD_API_URL
const headers = { 'Content-Type': 'application/json' }

/**
 * Get data
 */
export async function getData() {
    const response = await fetch(`${apiUrl}/todos/1`, {
        method: 'GET',
        headers: headers,
    })

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    const data: object = response.json()

    return data
}
