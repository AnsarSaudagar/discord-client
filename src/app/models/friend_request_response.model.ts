export interface FriendRequestResponse{
    id: number;
    user_id1: number;
    user_id2: number;
    status : string;
    createdAt: Date | string;
    updatedAt: Date | string;
}