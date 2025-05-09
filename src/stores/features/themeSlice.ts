import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ThemeState = {
    drawerShowed: boolean
    slotYAxis: number
    iconBackgroundColor: string
    iconWidth: number
    iconGap: number
    buttonMargin: number
    showResult: boolean
}

const initialState = { drawerShowed: false, slotYAxis: 200, iconBackgroundColor: '#ffffff', iconWidth: 300, iconGap: 50, buttonMargin: 200, showResult: true } as ThemeState

export const theme = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        reset: () => initialState,
        showDrawer: (state, action: PayloadAction<boolean>) => {
            state.drawerShowed = action.payload
        },
        setIconWidth: (state, action: PayloadAction<number>) => {
            state.iconWidth = action.payload
        },
        setSlotYAxis: (state, action: PayloadAction<number>) => {
            state.slotYAxis = action.payload
        },
        setIconGap: (state, action: PayloadAction<number>) => {
            state.iconGap = action.payload
        },
        setButtonMargin: (state, action: PayloadAction<number>) => {
            state.buttonMargin = action.payload
        },

        setShowResult: (state, action: PayloadAction<boolean>) => {
            state.showResult = action.payload
        },

        setIconBackgroundColor: (state, action: PayloadAction<string>) => {
            state.iconBackgroundColor = action.payload
        },
    },
})

export const { showDrawer, setIconWidth, setSlotYAxis, setIconGap, setButtonMargin, setShowResult, setIconBackgroundColor } = theme.actions
export default theme.reducer
