import './style.scss'

import ReelPrize from '../../components/ReelPrize'

const HomePage = () => {
    return (
        <div className={'w-full min-h-screen flex bg-white text-white'}>
            <div className={'w-full flex flex-col'}>
                <ReelPrize />
            </div>
        </div>
    )
}

export default HomePage
