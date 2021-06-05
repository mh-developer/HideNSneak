export interface MapSettings {
    id?: string;
    userId?: string;
    latitude: number;
    longitude: number;
    zoom: number;
    radius: number;
    color?: { ['key']: string; ['value']: string };
    playerRadius?: number;
    accuracy?: number;
    address?: string;
}
