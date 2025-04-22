import { FILE } from "./file.model";

export interface ITEM {
    id?: string;
    name: string;
    type?: string;
    itemcategory?: string;
    price?: number;
    created?: string | Date;
    sku?: string;
    onhand?: number;
    files?: FILE[],
}