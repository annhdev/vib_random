import clsx from 'clsx'
import { FaGear } from 'react-icons/fa6'
import { Outlet } from 'react-router'

import Drawer from '@/components/Drawer'
import MainFooter from '@/components/MainFooter'
import MainNavbar from '@/components/MainNavbar'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { setButtonMargin, setIconBackgroundColor, setIconGap, setIconWidth, setShowResult, setSlotYAxis, showDrawer } from '@/stores/features/themeSlice.ts'

const MainLayout = () => {
    const dispatch = useAppDispatch()
    const { drawerShowed, iconWidth, slotYAxis, iconGap, buttonMargin, showResult, iconBackgroundColor } = useAppSelector((state) => state.theme)

    const handlerDrawer = () => {
        dispatch(showDrawer(!drawerShowed))
    }

    const handleChangeIconSizeWidth = (e: any) => {
        dispatch(setIconWidth(e.target.value))
    }

    const handleChangeSlotYAxis = (e: any) => {
        dispatch(setSlotYAxis(e.target.value))
    }

    const handleChangeIconGap = (e: any) => {
        dispatch(setIconGap(e.target.value))
    }

    const handleChangeButtonMargin = (e: any) => {
        dispatch(setButtonMargin(e.target.value))
    }

    const handleChangeShowResult = (e: any) => {
        dispatch(setShowResult(e.target.checked))
    }

    const handleChangeIconBackgroundColor = (e: any) => {
        dispatch(setIconBackgroundColor(e.target.value))
    }

    return (
        <div className={clsx('w-full min-h-screen flex flex-col dark:bg-slate-800 dark:text-slate-400')}>
            <MainNavbar />
            <div className={'flex-1 w-full flex flex-col'}>
                <div className={'flex-1 flex flex-row'}>
                    <div className={'flex flex-col'}>
                        <Drawer>
                            <div className='space-y-1 px-2 pb-3 pt-2 text-slate-700 flex flex-col gap-10'>
                                <div className={'flex flex-col gap-5'}>
                                    <label className={'font-medium'}>Slot settings</label>
                                    <div className={'flex flex-row gap-5'}>
                                        <div className='flex items-start mb-5'>
                                            <div className='flex items-center h-5'>
                                                <input
                                                    id='show_result'
                                                    type='checkbox'
                                                    value=''
                                                    className='w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
                                                    required
                                                    checked={showResult}
                                                    onChange={handleChangeShowResult}
                                                    title={'Ẩn/Hiện kết quả'}
                                                />
                                            </div>
                                            <label htmlFor='show_result' className='ms-2 text-sm'>
                                                Hiển thị kết quả
                                            </label>
                                        </div>
                                    </div>
                                    <div className={'flex flex-row gap-5'}>
                                        <div className='relative z-0 w-full mb-5 group'>
                                            <input
                                                type='number'
                                                name='y_axis'
                                                id='y_axis'
                                                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                                placeholder=' '
                                                required
                                                value={slotYAxis}
                                                onChange={handleChangeSlotYAxis}
                                            />
                                            <label
                                                htmlFor='y_axis'
                                                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                                            >
                                                Y Axis
                                            </label>
                                            <label className={'text-slate-500 text-xs'}>Căn chỉnh trục Y của ô giải</label>
                                        </div>
                                        <div className='relative z-0 w-full mb-5 group'>
                                            <input
                                                type='number'
                                                name='button_margin'
                                                id='button_margin'
                                                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                                placeholder=' '
                                                required
                                                value={buttonMargin}
                                                onChange={handleChangeButtonMargin}
                                            />
                                            <label
                                                htmlFor='button_margin'
                                                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                                            >
                                                Button Margin Top
                                            </label>
                                            <label className={'text-slate-500 text-xs'}>Khoảng cách giữa nút quay và ô giải</label>
                                        </div>
                                    </div>
                                </div>
                                <div className={'flex flex-col gap-5'}>
                                    <label className={'font-medium'}>Icon Settings</label>
                                    <div className={'flex flex-row gap-5'}>
                                        <div className='relative z-0 w-full mb-5 group'>
                                            <input
                                                type='number'
                                                name='icon_width'
                                                id='icon_width'
                                                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                                placeholder=' '
                                                required
                                                value={iconWidth}
                                                onChange={handleChangeIconSizeWidth}
                                            />
                                            <label
                                                htmlFor='icon_width'
                                                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                                            >
                                                Width
                                            </label>
                                            <label className={'text-slate-500 text-xs'}>Chiều rộng ô giải, (Chiều cao sẽ tự động scale theo chiều rộng theo tỉ lệ 2:3)</label>
                                        </div>
                                        <div className='relative z-0 w-full mb-5 group'>
                                            <input type='color' name='icon_bg_color' id='icon_bg_color' className='block py-2.5 px-0 w-full h-11 border-0 border-b-2 border-gray-300 peer' placeholder=' ' required value={iconBackgroundColor} onChange={handleChangeIconBackgroundColor} />
                                            <label
                                                htmlFor='icon_bg_color'
                                                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                                            >
                                                Icon Background Color
                                            </label>
                                            <label className={'text-slate-500 text-xs'}>Màu nền của ô giải</label>
                                        </div>
                                    </div>
                                    <div className={'flex flex-row gap-5'}>
                                        <div className='relative z-0 w-full mb-5 group'>
                                            <input
                                                type='number'
                                                name='icon_gap'
                                                id='icon_gap'
                                                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                                                placeholder=' '
                                                required
                                                value={iconGap}
                                                onChange={handleChangeIconGap}
                                            />
                                            <label
                                                htmlFor='icon_gap'
                                                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                                            >
                                                Icons gap
                                            </label>

                                            <label className={'text-slate-500 text-xs'}>Khoảng cách giữa các ô giải</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Drawer>
                    </div>
                    <div className={'flex-1 flex flex-col'}>
                        <Outlet />
                    </div>
                </div>
                <div className={'settings absolute top-40 right-0 w-10 h-10 rounded-s-lg bg-blue-500 flex flex-col justify-center items-center'} onClick={() => handlerDrawer()} title={'Settings'}>
                    <FaGear className={'text-white text-2xl animate-[spin_2s_ease-in-out_infinite]'} />
                </div>
            </div>
            <MainFooter />
        </div>
    )
}

export default MainLayout
