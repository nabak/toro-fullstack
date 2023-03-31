import { UserPositionData } from "../types/UserPositionDataType";

export const fetchPositions = async (
    userId: number
): Promise<UserPositionData> => {
    const response = await fetch(
        `http://localhost:5000/users/${userId}/positions`
    );
    const data = await response.json();
    return data;
};
