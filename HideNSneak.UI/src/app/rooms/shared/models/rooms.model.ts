export interface Room {
    _id: string;
    id: string;
    name: string;
    owner: string;
    maxPlayers: string;
    joinCode: string;
    currentPlayers: string[];
}
