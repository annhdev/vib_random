import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Loading from '@/components/Loading'
import { persistor, store } from '@/stores'

export const StoreProvider = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>
)
