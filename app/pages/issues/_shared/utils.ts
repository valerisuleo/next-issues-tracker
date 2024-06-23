export function setBadgeClasses(status: string) {
    switch (status) {
        case 'OPEN':
            return 'danger';
        case 'CLOSED':
            return 'success';
        case 'IN_PROGRESS':
            return 'warning';
    }
}
