import { Button, Dialog, DialogBackdrop, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import { FaXmark } from 'react-icons/fa6'

import logo from '@/assets/logo.svg'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { showDrawer } from '@/stores/features/themeSlice.ts'

const Drawer = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch()
    const theme = useAppSelector((state) => state.theme)
    const { drawerShowed } = theme

    const handlerDrawer = (isOpen: boolean) => {
        dispatch(showDrawer(isOpen))
    }

    return (
        <Transition show={drawerShowed} as={Fragment}>
            <Dialog unmount={false} onClose={() => handlerDrawer(false)} className='fixed z-[99999] inset-0 overflow-y-auto overflow-x-auto'>
                <div className='relative flex w-full h-screen overflow-clip'>
                    <TransitionChild as={Fragment} enter='transition-opacity ease-in duration-300' enterFrom='opacity-0' enterTo='opacity-30' leave='transition-opacity ease-out duration-300' leaveFrom='opacity-30' leaveTo='opacity-0'>
                        <DialogBackdrop onClick={() => handlerDrawer(false)} className='z-40 fixed inset-0 bg-black opacity-30' />
                    </TransitionChild>
                    <TransitionChild as={Fragment} enter='transition ease-in-out duration-300 transform' enterFrom='translate-x-100' enterTo='translate-x-0' leave='transition ease-in-out duration-300 transform' leaveFrom='translate-x-0' leaveTo='translate-x-100'>
                        <div
                            className={`absolute right-0 flex flex-col justify-between bg-primary z-50
                          w-full min-h-screen max-w-sm p-6 overflow-hidden text-left
                          align-middle shadow-xl rounded-s-2xl bg-white`}
                        >
                            <div className={'flex flex-col gap-5'}>
                                <div className='flex flex-row justify-between items-center text-white'>
                                    <a href='/' className={'flex flex-row justify-center items-center'}>
                                        <img className='w-12' src={logo} alt='' />
                                    </a>
                                    <Button onClick={() => handlerDrawer(false)} className={'bg-black/10 hover:bg-black/15 p-2 rounded-full'}>
                                        <FaXmark />
                                    </Button>
                                </div>
                                <hr className={'border-white/50'} />
                                {children}
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Drawer
