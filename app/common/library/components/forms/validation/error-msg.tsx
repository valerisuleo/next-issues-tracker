import { IErrorMessage } from './interface';

const ErrorMessageComponent = ({
    errors,
    ctrl,
    errorServer,
}: IErrorMessage) => {
    return (
        <div className="invalid-feedback">
            {errors[ctrl] && <span>{errors[ctrl].message}</span>}
            {errorServer && (
                <span>{errorServer.error?.errors[ctrl]._errors[0]}</span>
            )}
        </div>
    );
};

export default ErrorMessageComponent;
