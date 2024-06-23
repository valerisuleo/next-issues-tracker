export interface IClasses {
    custom?: string;
    size?: 'lg' | 'sm' | 'md';
    contextual:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'warning'
        | 'danger'
        | 'close'
        | 'light'
        | 'dark';
}

export interface IRouterParams {
    params: { id: string };
}
