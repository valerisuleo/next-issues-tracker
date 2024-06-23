import React, { ReactNode } from 'react';
import styles from './modal.module.scss';
import Button, { IBtn } from '../buttons/button';

interface IModal {
    title: string;
    children: ReactNode;
    btns: IBtn[];
    isOpen: boolean;
    onClose: () => void;
}

const ModalComponent = ({
    children,
    title,
    btns,
    isOpen = false,
    onClose,
}: IModal) => {
    return (
        <div
            className={`modal ${styles.fade}`}
            style={{ display: isOpen ? 'block' : 'none' }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        {/* <Button
                            label={''}
                            classes={{ contextual: 'close' }}
                            onEmitEvent={onClose}
                        /> */}
                    </div>
                    <div className="modal-body">{children}</div>
                    <div className="modal-footer">
                        <div>
                            {btns.map((item, i) => (
                                <Button
                                    key={i}
                                    label={item.label}
                                    classes={{
                                        contextual: item.classes.contextual,
                                        custom: 'ms-2',
                                    }}
                                    onEmitEvent={item.onEmitEvent}
                                    isDisabled={item.isDisabled}
                                    isLoading={item.isLoading}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalComponent;
