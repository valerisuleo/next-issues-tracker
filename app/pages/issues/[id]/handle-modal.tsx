/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { Issue } from '../_shared/interfaces';
import Button, {
    IBtn,
} from '../../../common/library/components/buttons/button';
import ModalComponent from '../../../common/library/components/modal/modal';
import { issuesService } from '../_shared/service';
import { IError } from '../../../common/services/http-service/interfaces';
import { useRouter } from 'next/navigation';

interface IEvent {
    eventName: string;
    data: any;
}

type Props = IBtn & IEvent;

const HandleBtnModal = ({ label, data, eventName, classes }: Props) => {
    const router = useRouter();
    const [isOpen, setOpen] = useState(false);
    const [issue, setIssue] = useState<Issue>();
    const [errorServer, setErrors] = useState({} as IError);
    const [isSubmitting, setSubmitting] = useState(false);
    const [modalTxtContent, setTxtContent] = useState('');
    const btns: IBtn[] = [
        {
            label: 'Delete',
            isDisabled: isSubmitting || !!errorServer.statusText,
            isLoading: isSubmitting,
            onEmitEvent: handleDelete,
            classes: {
                contextual: 'danger',
                size: 'md',
            },
        },
        {
            label: 'Close',
            isDisabled: isSubmitting,
            onEmitEvent: handleClose,
            classes: {
                contextual: 'secondary',
                size: 'md',
            },
        },
    ];

    const handleClick = () => {
        if (eventName === 'openModal') {
            setIssue(data);
            setOpen(true);
        }
    };

    function handleClose(): void {
        setOpen(false);
    }

    async function handleDelete(): Promise<void> {
        try {
            setSubmitting(true);
            const response = await issuesService.delete(issue, 'id');
            setTxtContent(response.message);
            setTimeout(() => {
                router.push('/issues');
                router.refresh();
            }, 1000);
        } catch (error) {
            const fetchError = error as IError;
            setErrors(fetchError);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div>
            <Button
                label={label}
                onEmitEvent={handleClick}
                classes={classes}
            />
            <ModalComponent
                title={'Confirm Deletion'}
                btns={btns}
                onClose={handleClose}
                isOpen={isOpen}
            >
                {!Object.keys(errorServer).length ? (
                    <Fragment>
                        {modalTxtContent || (
                            <p>
                                Are you sure you want to delete{' '}
                                <strong>{issue?.title} </strong>? This action
                                cannot be undone.
                            </p>
                        )}
                    </Fragment>
                ) : (
                    <p>{errorServer.statusText}</p>
                )}
            </ModalComponent>
        </div>
    );
};

export default HandleBtnModal;
