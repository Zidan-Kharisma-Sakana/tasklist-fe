export type ITaskStatus = 1 | 2 |3

export interface ITask {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    status: ITaskStatus;
}
