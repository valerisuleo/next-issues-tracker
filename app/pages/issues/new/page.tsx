import React from 'react';
import dynamic from 'next/dynamic';

const IssueNewPage = () => {
    const IssueForm = dynamic(() => import('../_shared/components/form/issue-form'), {
        ssr: false,
    });
    return <IssueForm />;
};

export default IssueNewPage;
