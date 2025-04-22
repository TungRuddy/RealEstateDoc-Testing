export const DATE = {
    format: {
        date: 'dd/MM/yyyy',
        datetime: 'dd/MM/yyyy HH:mm',
        DMHm: 'dd/MM HH:mm',
        MDHm: 'MM/dd HH:mm',
        time: 'HH:mm'
    }
};


export interface QueryList {
    filters: {
        limit?: number,
        q?: string,
        page?: number,
        order?: string,
    }
}