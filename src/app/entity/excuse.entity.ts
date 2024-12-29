import { ApiEntity } from "./api.entity";

export interface ExcuseEntity extends ApiEntity {
    text_en: string;
    text_fr: string;
    text_it: string;
}