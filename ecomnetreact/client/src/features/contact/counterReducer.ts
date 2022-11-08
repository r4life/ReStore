export interface CounterState {
    data: number;
    title: string;
    anotherData: string;
}

const initialState: CounterState = {
    data: 42,
    title: 'YARC (yet another redux counter)',
    anotherData: 'Another data'
}

export default function counterReducer(state = initialState, action: any){
    return state;
}