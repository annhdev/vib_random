import { Outlet } from 'react-router'

const ErrorLayout = () => {
    return (
        <div className={'w-full min-h-screen flex flex-col justify-center items-center'}>
            <Outlet />
        </div>
    )
}

export default ErrorLayout
