import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
    selectedCategory: string | null
    userQuestion: string
    isLoading: boolean
    currentPrediction: string
}

const initialState: AppState = {
    selectedCategory: null,
    userQuestion: '',
    isLoading: false,
    currentPrediction: ''
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSelectedCategory: (state, action: PayloadAction<string>) => {
            state.selectedCategory = action.payload
        },
        setUserQuestion: (state, action: PayloadAction<string>) => {
            state.userQuestion = action.payload
        },
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setCurrentPrediction: (state, action: PayloadAction<string>) => {
            state.currentPrediction = action.payload
        },
        resetState: (state) => {
            state.selectedCategory = null
            state.userQuestion = ''
            state.isLoading = false
            state.currentPrediction = ''
        }
    }
})

export const {
    setSelectedCategory,
    setUserQuestion,
    setIsLoading,
    setCurrentPrediction,
    resetState
} = appSlice.actions

export const store = configureStore({
    reducer: {
        app: appSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch