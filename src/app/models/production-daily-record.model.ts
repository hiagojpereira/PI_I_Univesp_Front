export interface ProductionDailyRecord {
    id: number;
    author: string;
    production_leader: string;
    date: any;
    created_at: any;
    updated_at: any;
}

export interface ProductionDailyRecordComplete {
    id: number;
    author: any;
    production_leader: any;
    date: any;
    created_at: any;
    updated_at: any;
}


export interface AutorDetail {
    id: any,
    name: any,
}

export interface ProductionLeaderDetail {
    id: any,
    name: any,
}

export interface ProductionDailyRecordDetail {
    id?: any,
    author_id: any,
    production_leader_id: any,
    date: any,
    finished_pastas: any,
    in_progress_pastas: any,
    pasta_machine_usages: any,
    cooked_pastas: any,
    pasta_stuffings: any
}
