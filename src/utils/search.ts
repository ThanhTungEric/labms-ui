export function includesSearch(data: string | string[] | null | undefined, searchTerm: string): boolean {
    if (data === null || data === undefined) {
        return false;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    if (typeof data === 'string') {
        return data.toLowerCase().includes(lowerCaseSearchTerm);
    }
    if (Array.isArray(data)) {
        return data.some(item => item.toLowerCase().includes(lowerCaseSearchTerm));
    }
    return false;
}