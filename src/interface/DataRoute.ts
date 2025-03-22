export interface IDataRoute {
    name?: string,
    description?: string,
    path: string,
    component: () => string;
}