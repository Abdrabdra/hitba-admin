import {createSlice} from "@reduxjs/toolkit";

interface IInitState {
    isShowPrevButton: boolean,
    isOneUserMessage: boolean,
    culpritId: number | null,
    firstName: string,
    secondName: string,
    middleName: string,
    date: string | null,
    phone: number | null
    complaintId: number | null
    complaintStatus: string,
    messageText: string | null,
    isBlocked:boolean
    reporter: {
        firstName: string | null
        middleName: string | null
        secondName: string | null

    },
    comment: string | null


}

const initialState: IInitState = {
    isShowPrevButton: false,
    isOneUserMessage: false,
    culpritId: null,
    firstName: '',
    secondName: '',
    middleName: '',
    isBlocked:false,
    date: null,
    phone: null,
    complaintId: null,
    complaintStatus: '',
    messageText: null,
    reporter: {
        firstName: null,
        middleName: null,
        secondName: null,
    },
    comment: null

}

const complaintSlice = createSlice({
    name: 'complaint/',
    initialState,
    reducers: {

        setButtonVisibility: (state, {payload}) => {
            state.isShowPrevButton = payload
        },
        setOneUserMessageVisibility: (state, {payload}) => {
            state.isOneUserMessage = payload
        },
        setComplainedUserData: (state, {payload}) => {
            state.reporter.firstName = null
            state.reporter.secondName = null
            state.reporter.middleName = null
            state.messageText = null
            state.comment = null
            if (payload.culprit?.id) {
                state.culpritId = payload.culprit.id
            }
            if (payload.culprit?.user) {
                state.phone = payload.culprit?.user.phone
            }
            if (payload.culprit?.firstName) {
                state.firstName = payload.culprit.firstName
            }
            if (payload.culprit?.secondName) {
                state.secondName = payload.culprit.secondName
            }
            if (payload.culprit?.middleName) {
                state.middleName = payload.culprit.middleName
            }
            if (payload.culprit?.date) {
                state.date = payload.culprit.date
            }
            if (payload.culprit?.block) {
                state.isBlocked = payload?.culprit?.block.block
            }
            if (payload.message?.text) {
                state.messageText = payload.message.text
            }
            if (payload.reporter) {
                state.reporter.firstName = payload.reporter?.firstName
            }
            if (payload.reporter) {
                state.reporter.middleName = payload.reporter?.middleName
            }
            if (payload.reporter) {
                state.reporter.secondName = payload.reporter?.secondName
            }
            if (payload.text) {
                state.comment = payload.text
            }


            state.complaintId = payload.id
            state.complaintStatus = payload.status

        },
        setAdditionalUserData: (state, {payload}) => {
            if (payload.phone) {
                state.phone = payload.phone
            }

        },
        setComplainedStatus: (state, {payload}) => {

            state.complaintStatus = payload


        }


    }
})

export const {
    setButtonVisibility,
    setOneUserMessageVisibility,
    setComplainedUserData,
    setAdditionalUserData,
    setComplainedStatus
} = complaintSlice.actions

export default complaintSlice.reducer