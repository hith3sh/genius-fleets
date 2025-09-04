


export function createPageUrl(pageName: string) {
    return '/' + pageName
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '')
        .replace(/ /g, '-');
}