import { NextRequest, NextResponse } from 'next/server'

const mockClaims = [
  {
    id: '1',
    claimNumber: 'CLM-001847',
    title: 'Auto Accident Claim',
    claimantName: 'Sarah Johnson',
    claimantEmail: 'sarah.johnson@email.com',
    incidentType: 'AUTO_ACCIDENT',
    claimAmount: 12450,
    status: 'UNDER_REVIEW',
    priority: 'HIGH',
    createdAt: new Date('2024-01-15T10:30:00Z'),
    assignee: { id: '1', name: 'John Smith', email: 'john@example.com' },
    creator: { id: '2', name: 'Admin User', email: 'admin@example.com' },
    _count: { documents: 3, activities: 5, notes: 2 }
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    return NextResponse.json({
      claims: mockClaims,
      pagination: {
        page,
        limit,
        total: mockClaims.length,
        pages: Math.ceil(mockClaims.length / limit)
      }
    })

  } catch (error) {
    console.error('Error fetching claims:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}

// POST /api/claims - Create new claim
export async function POST(request: NextRequest) {
  try {
    // In production, you would check authentication here
    // const session = await getServerSession(authOptions)
    // if (!session?.user?.id) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await request.json()
    
    // Generate claim number
    const claimNumber = `CLM-${Date.now().toString().slice(-6)}`

    // Mock response for demo
    const newClaim = {
      id: Date.now().toString(),
      claimNumber,
      ...body,
      createdAt: new Date(),
      status: 'SUBMITTED'
    }

    return NextResponse.json(newClaim, { status: 201 })

  } catch (error) {
    console.error('Error creating claim:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
