import { createSlice } from "@reduxjs/toolkit";

interface Assignment {
  _id: string;
  course: string;
  title: string;
  description: string;
  points: number;
  dueDate?: Date;
  availableDate?: Date;
  untilDate?: Date;
}

interface AssignmentState {
  assignments: Assignment[];
  assignment: Assignment;
}

const  initialState: AssignmentState = {
  assignments: [],
  assignment: { _id:"A123", title: "New assignment 123", course: "RS101",  description: "This is the assignment description", points: 100,}
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {    
    setDefaultAssignment: (state) => {
      state.assignment = { _id:"A123", title: "New assignment 123", course: "RS101",  description: "This is the assignment description", points: 100,}
    },

    addAssignment: (state, action) => {
      state.assignments = [
        { ...action.payload, _id: new Date().getTime().toString() },
          ...state.assignments,
      ];
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment._id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((assignment) => {
        if (assignment._id === action.payload._id) {
            return action.payload;
          } else {
            return assignment;
          }
        });
      },
      setAssignment: (state, action) => {
        state.assignment = action.payload;
      },
      setAssignments: (state, action) => {
        state.assignments = action.payload;
      },
    },
  });
  
  
  export const {setDefaultAssignment, addAssignment, deleteAssignment,
    updateAssignment, setAssignment, setAssignments } = assignmentsSlice.actions;
  export default assignmentsSlice.reducer;