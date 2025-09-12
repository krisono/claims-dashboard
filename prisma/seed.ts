import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const claimTypes = [
  'AUTO_ACCIDENT',
  'PROPERTY_DAMAGE', 
  'MEDICAL',
  'THEFT',
  'FIRE',
  'FLOOD',
  'LIABILITY',
  'WORKERS_COMP'
]

const claimStatuses = [
  'SUBMITTED',
  'UNDER_REVIEW',
  'PENDING_DOCUMENTS',
  'INVESTIGATION',
  'APPROVED',
  'REJECTED',
  'SETTLED'
]

const priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']

const claimants = [
  { name: 'Sarah Johnson', email: 'sarah.johnson@email.com', phone: '(555) 123-4567' },
  { name: 'Michael Chen', email: 'michael.chen@email.com', phone: '(555) 234-5678' },
  { name: 'Emily Rodriguez', email: 'emily.rodriguez@email.com', phone: '(555) 345-6789' },
  { name: 'David Wilson', email: 'david.wilson@email.com', phone: '(555) 456-7890' },
  { name: 'Jennifer Davis', email: 'jennifer.davis@email.com', phone: '(555) 567-8901' },
  { name: 'Robert Garcia', email: 'robert.garcia@email.com', phone: '(555) 678-9012' },
  { name: 'Lisa Anderson', email: 'lisa.anderson@email.com', phone: '(555) 789-0123' },
  { name: 'James Miller', email: 'james.miller@email.com', phone: '(555) 890-1234' },
  { name: 'Maria Thompson', email: 'maria.thompson@email.com', phone: '(555) 901-2345' },
  { name: 'Christopher Lee', email: 'christopher.lee@email.com', phone: '(555) 012-3456' }
]

const incidentDescriptions = {
  AUTO_ACCIDENT: [
    'Rear-end collision at intersection during rush hour traffic',
    'Side-impact collision while turning left at traffic light',
    'Single-vehicle accident due to road conditions',
    'Multi-vehicle pile-up on highway during fog'
  ],
  PROPERTY_DAMAGE: [
    'Storm damage to roof and windows',
    'Water damage from burst pipe',
    'Vandalism to storefront windows',
    'Tree fell on house during windstorm'
  ],
  MEDICAL: [
    'Slip and fall accident in grocery store',
    'Work-related injury while operating machinery',
    'Sports injury during company softball game',
    'Allergic reaction to medication'
  ],
  THEFT: [
    'Burglary of electronics and jewelry from residence',
    'Vehicle theft from parking garage',
    'Shoplifting incident at retail store',
    'Identity theft resulting in financial loss'
  ],
  FIRE: [
    'Kitchen fire caused by unattended cooking',
    'Electrical fire due to faulty wiring',
    'Wildfire damage to property',
    'Arson damage to commercial building'
  ],
  FLOOD: [
    'Basement flooding due to heavy rainfall',
    'Sewage backup causing water damage',
    'River overflow affecting multiple properties',
    'Sprinkler system malfunction flooding office'
  ],
  LIABILITY: [
    'Customer injured on business premises',
    'Product liability claim for defective item',
    'Professional negligence allegation',
    'Wrongful termination lawsuit'
  ],
  WORKERS_COMP: [
    'Back injury from lifting heavy objects',
    'Repetitive stress injury from computer work',
    'Cut injury from machinery accident',
    'Exposure to harmful chemicals at workplace'
  ]
}

function getRandomElement<T>(array: T[]): T {
  if (array.length === 0) {
    throw new Error('Array cannot be empty')
  }
  return array[Math.floor(Math.random() * array.length)]!
}

function getRandomAmount(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRandomDate(daysAgo: number): Date {
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo))
  return date
}

async function main() {
  console.log('🌱 Seeding database with demo data...')

  // Create demo users
  const demoUsers = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@demo.com' },
      update: {},
      create: {
        id: 'demo-admin',
        name: 'Admin User',
        email: 'admin@demo.com',
        role: 'ADMIN'
      }
    }),
    prisma.user.upsert({
      where: { email: 'manager@demo.com' },
      update: {},
      create: {
        id: 'demo-manager',
        name: 'Claims Manager',
        email: 'manager@demo.com',
        role: 'MANAGER'
      }
    }),
    prisma.user.upsert({
      where: { email: 'adjuster@demo.com' },
      update: {},
      create: {
        id: 'demo-adjuster',
        name: 'Claims Adjuster',
        email: 'adjuster@demo.com',
        role: 'ADJUSTER'
      }
    }),
    prisma.user.upsert({
      where: { email: 'investigator@demo.com' },
      update: {},
      create: {
        id: 'demo-investigator',
        name: 'Investigator',
        email: 'investigator@demo.com',
        role: 'INVESTIGATOR'
      }
    })
  ])

  console.log('✅ Created demo users')

  // Create demo claims
  const claims = []
  for (let i = 0; i < 50; i++) {
    const claimType = getRandomElement(claimTypes)
    const claimant = getRandomElement(claimants)
    const incidentDate = getRandomDate(30)
    const createdDate = new Date(incidentDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000)
    
    const claim = await prisma.claim.create({
      data: {
        claimNumber: `CLM-${String(100000 + i).slice(-6)}`,
        title: `${claimType.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())} Claim`,
        description: `Insurance claim for ${claimType.replace('_', ' ').toLowerCase()}`,
        claimantName: claimant.name,
        claimantEmail: claimant.email,
        claimantPhone: claimant.phone,
        claimantAddress: `${getRandomAmount(100, 9999)} ${getRandomElement(['Main St', 'Oak Ave', 'Pine Rd', 'Cedar Ln', 'Elm Dr'])}, ${getRandomElement(['Springfield', 'Riverside', 'Franklin', 'Georgetown', 'Madison'])}, ${getRandomElement(['CA', 'NY', 'TX', 'FL', 'IL'])} ${getRandomAmount(10000, 99999)}`,
        incidentDate,
        incidentType: claimType as any,
        incidentDescription: getRandomElement(incidentDescriptions[claimType as keyof typeof incidentDescriptions]),
        claimAmount: getRandomAmount(1000, 100000),
        estimatedValue: getRandomAmount(500, 80000),
        status: getRandomElement(claimStatuses) as any,
        priority: getRandomElement(priorities) as any,
        fraudScore: Math.random() * 100,
        fraudFlags: Math.random() > 0.8 ? ['HIGH_AMOUNT', 'SUSPICIOUS_TIMING'] : [],
        createdBy: getRandomElement(demoUsers).id,
        assignedTo: Math.random() > 0.3 ? getRandomElement(demoUsers.slice(1)).id : null,
        createdAt: createdDate,
        submittedAt: createdDate
      }
    })

    claims.push(claim)

    // Create some activities for each claim
    const activityCount = getRandomAmount(1, 5)
    for (let j = 0; j < activityCount; j++) {
      const activityDate = new Date(createdDate.getTime() + j * 24 * 60 * 60 * 1000)
      const activityTypes = ['CREATED', 'UPDATED', 'STATUS_CHANGED', 'DOCUMENT_UPLOADED', 'NOTE_ADDED']
      
      await prisma.activity.create({
        data: {
          type: getRandomElement(activityTypes) as any,
          title: `Claim ${getRandomElement(activityTypes).replace('_', ' ').toLowerCase()}`,
          description: `System activity for claim ${claim.claimNumber}`,
          claimId: claim.id,
          userId: getRandomElement(demoUsers).id,
          createdAt: activityDate
        }
      })
    }

    // Create some notes for random claims
    if (Math.random() > 0.6) {
      await prisma.note.create({
        data: {
          content: `${getRandomElement([
            'Initial assessment completed. All documentation appears to be in order.',
            'Contacted claimant for additional information regarding the incident.',
            'Reviewing police report and medical records for consistency.',
            'Fraud indicators detected - requires further investigation.',
            'Settlement amount approved by supervisor.',
            'Case closed after successful resolution.'
          ])}`,
          isInternal: Math.random() > 0.5,
          claimId: claim.id,
          authorId: getRandomElement(demoUsers).id
        }
      })
    }
  }

  console.log('✅ Created 50 demo claims with activities and notes')
  console.log('🎉 Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
