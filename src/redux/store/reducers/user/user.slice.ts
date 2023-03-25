import {createSlice} from "@reduxjs/toolkit";

interface IInitState {
    role: string | null

}

const initialState: IInitState = {
    role: null,
}

const userSlice = createSlice({
    name: 'user/',
    initialState,
    reducers: {
        setRole: (state, {payload}) => {
            state.role = payload
        }
    }
})

export const {setRole} = userSlice.actions

export default userSlice.reducer