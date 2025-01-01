import StatCard from '@/components/StatCard'
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {columns, Payment} from '@/components/table/columns'
import { DataTable } from '@/components/table/DataTable'



const AdminPage = async () => {
    const appointments = await getRecentAppointmentList()
  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
        <header className='admin-header'>
            <Link href='/' className='cursor-pointer'>
                <Image
                    src="/assets/icons/logo-full.png"
                    height={32}
                    width={162}
                    alt='logo'
                    className='h-8 w-fit'
                />
            </Link>
            <p className='text-16-semibold'>Admin Dashboard</p>
        </header>

        <main className='admin-main'>
            <section className='w-full space-y-4'>
                <h1 className='header'>Welcome👋</h1>
                <p className='text-dark-700'>Manage your appointments.</p>
            </section>

            <section className='admin-stat'>
                <StatCard
                    type='appointments'
                    // count={appointments.scheduledCount}
                    count={3}
                    label='Scheduled Appointments'
                    iconSrc='/assets/icons/appointments.svg'
                />
                <StatCard
                    type='pending'
                    // count={appointments.pendingCount}
                    count={2}
                    label='Pending Appointments'
                    iconSrc='/assets/icons/pending.svg'
                />
                <StatCard
                    type='cancelled'
                    // count={appointments.cancelledCount}
                    count={1}
                    label='Cancelled Appointments'
                    iconSrc='/assets/icons/cancelled.svg'
                />
            </section>

            <DataTable columns={columns} data={appointments.documents}/>
            {/* <DataTable columns={columns} data={data}/> */}
        </main>
    </div>
  )
}

export default AdminPage