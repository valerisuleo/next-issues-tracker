'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { z } from 'zod';
import InputGroupComponent from '../../../../../common/library/components/forms/input-group/input';
import ErrorMessageComponent from '../../../../../common/library/components/forms/validation/error-msg';
import { IError } from '../../../../../common/services/http-service/interfaces';
import issueSchema from '../../../../../validation-schemas/issue/schema';
import { issuesService } from '../../service';
import { useRouter } from 'next/navigation';
import 'easymde/dist/easymde.min.css';
import SimpleMDE from 'react-simplemde-editor';
import { Issue } from '../../interfaces';

// export interface IFormIssueData {
//     title: string;
//     description: string;
// }

export type IFormIssueData = z.infer<typeof issueSchema>;

interface Props {
    issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormIssueData>({
        resolver: zodResolver(issueSchema),
    });
    const [errorServer, setErrors] = useState({} as IError);
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit: SubmitHandler<IFormIssueData> = async (data) => {
        if (issue) {
            await updateIssue(data);
        } else {
            await createIssue(data);
        }
        router.push('/issues');
        router.refresh();
    };

    const updateIssue = async (payload: IFormIssueData) => {
        try {
            setSubmitting(true);

            const data = {
                ...issue,
                title: payload.title,
                description: payload.description,
            };

            await issuesService.put(data, 'id');
        } catch (error) {
            const fetchError = error as IError;
            setErrors(fetchError);
        } finally {
            setSubmitting(false);
        }
    };
    const createIssue = async (payload: IFormIssueData) => {
        try {
            setSubmitting(true);
            await issuesService.post(payload);
        } catch (error) {
            const fetchError = error as IError;
            setErrors(fetchError);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="row">
            <div className="col-9 mx-auto">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="needs-validation was-not-validated"
                >
                    <InputGroupComponent
                        type="text"
                        ctrl="title"
                        errors={errors}
                        errorServer={errorServer}
                        register={register}
                        defaultValue={issue?.title}
                    />
                    <div className="input-group mb-3">
                        <div
                            className={`form-control ${
                                errors.description && 'is-invalid'
                            }`}
                        >
                            <Controller
                                name="description"
                                control={control}
                                defaultValue={issue?.description}
                                render={({ field }) => <SimpleMDE {...field} />}
                            />
                        </div>

                        <ErrorMessageComponent
                            errors={errors}
                            ctrl={'description'}
                        ></ErrorMessageComponent>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                    >
                        {isSubmitting && (
                            <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        )}
                        {`Submit ${issue ? 'Updated' : 'New'} Issue`}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default IssueForm;
