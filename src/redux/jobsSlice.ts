import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { supabase } from "@/lib/supabaseClient"
import { JobEntryType } from "@/components/jobentry"

interface JobsState {
    jobEntries: JobEntryType[]
    hasChanges: boolean
    loading: boolean
    error: string | null
}

const initialState: JobsState = {
    jobEntries: [],
    hasChanges: false,
    loading: false,
    error: null
}

export const fetchJobEntries = createAsyncThunk<
    JobEntryType[],
    string | null,
    { rejectValue: string}
>(
    "jobs/fetchJobEntries",
    async (userId: string | null) => {
        const { data: jobEntries, error } = await supabase
            .from("work_experience")
            .select("work_experience_id, job_title, employer, start_date, end_date, description, current_position")
            .eq("user_id", userId)

        if (error) {
            throw new Error("failed to fetch job entries")
        }

        return jobEntries.map((entry) => {
            const [startMonth, startYear] = entry.start_date ? entry.start_date.split(" ") : ["", ""];
            const [endMonth, endYear] = entry.end_date ? entry.end_date.split(" ") : ["", ""];

            return {
                id: entry.work_experience_id,
                title: entry.job_title,
                employer: entry.employer,
                startMonth: startMonth,
                startYear: startYear,
                endMonth: endMonth,
                endYear: endYear,
                details: entry.description,
                currentPosition: entry.current_position,
                expanded: false
            }
        })
    }
)

const jobsSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        addJobEntry(state) {
            const newEntry: JobEntryType = {
                id: Date.now(),
                title: "",
                employer: "",
                startMonth: "",
                startYear: "",
                endMonth: "",
                endYear: "",
                details: "",
                currentPosition: false, 
                expanded: true
            }
            state.jobEntries.push(newEntry)
            state.hasChanges = true
        },
        removeJobEntry(state, action: PayloadAction<number>) {
            state.jobEntries = state.jobEntries.filter((_, i) => i !== action.payload)
            state.hasChanges = true
        },
        handleJobEntryChange(state, action: PayloadAction<JobEntryType>) {
            const index = state.jobEntries.findIndex((entry) => entry.id === action.payload.id)
            if (index !== -1) {
                state.jobEntries[index] = action.payload
                state.hasChanges = true
            }
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchJobEntries.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchJobEntries.fulfilled, (state, action) => {
            state.jobEntries = action.payload
            state.hasChanges = false
            state.loading = false
        })
        .addCase(fetchJobEntries.rejected, (state, action) => {
            state.error = action.error.message || null
            state.loading = false
        })
    }
})

export default jobsSlice.reducer
