import { NextRequest, NextResponse } from 'next/server'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
// import { prisma } from '@/lib/prisma'

// Mock data for demo purposes
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

// GET /api/claims - List claims with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    // In production, you would check authentication here
    // const session = await getServerSession(authOptions)
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    // Return mock data for demo
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
