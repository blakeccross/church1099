export const ChangeBackgroundColor = (backgroundColor) => {
    return {
        type: 'CHANGE_BACKGROUND_COLOR',
        payload: backgroundColor
    };
};
export const GetUser = (user) => {
    return {
        type: 'user',
        payload: user
    };
};