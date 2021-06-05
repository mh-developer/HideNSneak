export interface MapSettings {
    id?: string;
    userId?: string;
    latitude: number;
    longitude: number;
    zoom: number;
    radius: number;
    playerRadius: number;
    accuracy?: number;
    address?: string;
}
