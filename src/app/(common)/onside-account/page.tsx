"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import onsideImg from "@/assets/onsideImg.jpg"
import { Alert, AlertDescription, Button } from '@/components/ui'
import Icon from '@/icon'
import { ArrowRight } from 'lucide-react'
import Modal from '@/components/reuseable/modal'
import OnSideAccount from '@/components/common/onslide/account-create'
import PaymentBox from '@/components/common/payment-box'



export default function OnSidePage() {
    const [isPayment, setIsPayment] = useState(false)
    const [isAccount, setIsAccount] = useState(false)
    
    return (
        <div className='max-w-6xl m-auto'>
            <div  className="relative h-48 md:h-64">
                <Image
                    src={onsideImg}
                    alt="Cover image"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl"
                />
                <div className='absolute bottom-3 left-3'>
                    <h1 className='text-white font-medium text-xl md:text-2xl'>Get Discovered Locally: Sign Up Your Business on MyTSV.com</h1>
                </div>
            </div>
            <div className="w-full max-w-4xl mx-auto text-center py-12 px-4 space-y-1 md:px-6 ">
                <h2 className="text-xl font-medium text-blacks">Grow Your Business with Real Video Exposure</h2>
                <p className="text-base text-blacks">
                    Our representatives are visiting local businesses like yours to offer an exclusive opportunity to join
                    &quot;MyTSV.com&quot;—the video-first platform connecting local services with real local customers.
                </p>
            </div>
            <Alert className="bg-white w-fit mx-auto border-none rounded-full">
                <AlertDescription className='text-blacks flex items-center gap-2 text-base font-normal'>
                    <Icon name="alertRed" width={20} className='rotate-2' />
                    This service is currently available in select locations. Please contact us to confirm availability before signing up
                </AlertDescription>
            </Alert>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 pt-10'>
                <div className="relative onside-get p-8 rounded-4xl shadow-lg text-white flex flex-col items-start">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-body p-2 rounded-full">
                        <Icon name="get" />
                    </div>
                    <h3 className="text-[22px] font-semibold mt-8 mb-4 w-full text-center">What You Get</h3>
                    <ul className="list-disc space-y-3 text-lg px-3">
                        <li>A professionally recorded and uploaded video profile of your business</li>
                        <li>Instant visibility in your category (Plumber, Dentist, Spa, etc.)</li>
                        <li>Access to customer engagement tools - likes, comments, shares, reviews</li>
                        <li>Boosted SEO to help customers &quot;find you fast&quot;</li>
                        <li>Appear in &quot;Near Me&quot; search results in your area</li>
                        <li>Full customer support and optimization assistance</li>
                    </ul>
                </div>
                <div className="relative onside-for p-8 rounded-4xl shadow-lg text-white flex flex-col items-start">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-body p-2 rounded-full">
                        <Icon name="fors" />
                    </div>
                    <h3 className="text-[22px] font-semibold mt-8 mb-4 w-full text-center">Who Is This For?</h3>
                    <ul className="list-disc space-y-3 text-lg px-3">
                        <li>Local service providers (50+ categories)</li>
                        <li>New businesses seeking more exposure</li>
                        <li>Established businesses wanting modern marketing</li>
                        <li>Professionals offering in-person or mobile services</li>
                    </ul>
                </div>
                {/* Pricing Card Section */}
                <div className="col-span-1 md:col-span-2">
                    <div className="relative onside-free p-8 rounded-4xl shadow-lg text-white flex flex-col items-start">
                        <div className="absolute -left-8 top-1/2 -translate-y-1/2 bg-body p-2 rounded-full">
                            <Icon name="phoned" />
                        </div>
                        <div className='mx-auto'>
                            <h3 className="text-[22px] font-semibold mb-5 w-full text-center">One-Time Sign-Up Fee: $99.99</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-lg">
                                <ul className="list-none space-y-3">
                                    <li>🎥 Video recording on-site</li>
                                    <li>🔍 Local SEO Optimization</li>
                                </ul>
                                <ul className="list-none space-y-3">
                                    <li>📲 Upload + Profile Setup</li>
                                    <li>📢 Promotion across MyTSV.com channels</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ready to Get Started? */}
            <div className="w-full max-w-6xl px-4 md:px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="md:w-2/3 text-center md:text-left">
                    <h2 className="text-[22px] font-medium mb-2">Ready to Get Started?</h2>
                    <p className="text-blacks">
                        Our representative will assist you on-site. You can pay below and they&apos;ll handle the rest - including
                        filming, uploading, and account setup. You&apos;re not just advertising. You&apos;re being &quot;seen in
                        action&quot; by real potential clients in your area.
                    </p>
                </div>
                <div className="md:w-1/3 flex justify-center md:justify-end">
                    <Button onClick={() => setIsAccount(true)} variant={"primary"} size={"lg"} className='rounded-full gap-3' >
                        Pay & register now <ArrowRight className="h-6 w-6 font-bold -rotate-45" />
                    </Button>
                </div>
            </div>
            {/* is Account */}
            <Modal open={isAccount} title='Onsite account creation' setIsOpen={setIsAccount} titleStyle='text-center' className='sm:max-w-3xl'>
                <OnSideAccount setIsAccount={setIsAccount} setIsPayment={setIsPayment} />
            </Modal>
            {/*  Pay to MyTSV */}
            <Modal title="Pay to MyTSV" open={isPayment} setIsOpen={setIsPayment} titleStyle='text-center' className='sm:max-w-3xl'>
                <PaymentBox setIsPayment={setIsPayment} />
            </Modal>
        </div>
    )
} 
