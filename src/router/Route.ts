import { IDataRoute } from "../interface/DataRoute";

export default class Route implements IDataRoute {
    public name: string;
    public path: string;
    public description: string;
    public component: () => string;

    constructor(data?: Partial<IDataRoute>) {
        this.name = data?.name || ""; 
        this.path = data?.path || ""; 
        this.description = data?.description || ""; 
        this.component = data?.component || (() => ""); 
    }
}
