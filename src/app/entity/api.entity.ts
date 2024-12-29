export enum ApiAction {
    EXCUSE = "excuse"
}
export enum API {
    BASE_URL = "https://excuses.cacko.net/api",
    LOCAL_BASE_URL = "http://192.168.0.10:36546/api"

}

export interface ApiEntity {
    id: number;
}