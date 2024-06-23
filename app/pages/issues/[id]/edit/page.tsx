import React from 'react';
// import IssueForm from '../../_shared/components/form/issue-form';
import { IRouterParams } from '../../../../common/interfaces';
import { issuesService } from '../../_shared/service';
import { Issue } from '../../_shared/interfaces';
import dynamic from 'next/dynamic';

const IssueEdit = async ({ params }: IRouterParams) => {
    const IssueForm = dynamic(
        () => import('../../_shared/components/form/issue-form'),
        {
            ssr: false,
        }
    );
    const issue: Issue = await issuesService.getItemSSR(params.id);

    return (
        <div>
            <IssueForm issue={issue} />
        </div>
    );
};

export default IssueEdit;
