


export function createPageUrl(pageName: string) {
    return '/' + pageName;
}

// Safely format currency amounts
export function formatCurrency(amount: any, decimals: number = 2): string {
    const numAmount = Number(amount || 0);
    if (isNaN(numAmount)) return '0.00';
    return numAmount.toFixed(decimals);
}