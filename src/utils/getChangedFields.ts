export const getChangedFields = <T extends Record<string, any>>(
    initialState: T,
    currentState: T
): Partial<T> => {
    const changedFields: Partial<T> = {};

    Object.keys(currentState).forEach((key) => {
        const typedKey = key as keyof T;
        if (currentState[typedKey] !== initialState[typedKey]) {
            changedFields[typedKey] = currentState[typedKey];
        }
    });

    return changedFields;
};