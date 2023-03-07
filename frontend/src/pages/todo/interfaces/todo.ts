export enum Status {
    Pending,
    Done,
    Deleted
}

export interface Todo {
    id: string,
    description: string,
    status: Status
};