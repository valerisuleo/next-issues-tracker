/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ErrorMessageComponent from '../validation/error-msg';
import { InputGroup } from './interface';

const InputGroupComponent = ({
    type,
    ctrl,
    errors,
    errorServer,
    register,
    defaultValue
}: InputGroup) => {
    return (
        <div className="input-group mb-3">
            <input
                type={type}
                className={`form-control ${
                    (errors[ctrl] || Object.keys(errorServer).length) &&
                    'is-invalid'
                }`}
                placeholder="Title"
                {...register(ctrl)}
                defaultValue={defaultValue}
            />
            <ErrorMessageComponent
                errors={errors}
                errorServer={errorServer}
                ctrl={ctrl}
            />
        </div>
    );
};

export default InputGroupComponent;
