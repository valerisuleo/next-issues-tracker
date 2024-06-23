import { IErrorMessage } from '../validation/interface';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister } from 'react-hook-form';

interface Input {
    type: string;
    ctrl: string;
    defaultValue?: string;
    register: UseFormRegister<any>;
}

export type InputGroup = Input & IErrorMessage;
