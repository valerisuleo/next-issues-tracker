import { IClasses } from '../../../interfaces';

export interface IBtn {
    label: string;
    classes: IClasses;
    type?: 'button' | 'submit' | 'reset';
    onEmitEvent?: () => void;
    isDisabled?: boolean;
    isLoading?: boolean;
}

const Button = ({
    label,
    onEmitEvent,
    classes,
    type,
    isDisabled,
    isLoading,
}: IBtn) => {
    return (
        <button
            className={`btn btn-${classes.contextual} btn-${classes.size} ${classes?.custom}`}
            onClick={onEmitEvent}
            type={type || 'button'}
            disabled={isDisabled}
        >
            {isLoading && (
                <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                ></span>
            )}
            {label}
        </button>
    );
};

export default Button;
