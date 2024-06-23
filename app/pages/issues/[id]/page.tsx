import _ from 'lodash';
import { IRouterParams } from '../../../common/interfaces';
import { Issue } from '../_shared/interfaces';
import { issuesService } from '../_shared/service';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import BadgeComponent from '../../../common/library/components/badges/badge';
import HandleBtnModal from './handle-modal';
import { setBadgeClasses } from '../_shared/utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]/route';

const IssueShow = async ({ params }: IRouterParams) => {
    const response: Issue = await issuesService.getItemSSR(params.id);
    const session = await getServerSession(authOptions);

    return (
        <div className="row">
            <div className="col-8 mx-auto">
                <h1>{_.startCase(response.title)}</h1>
                <div className="d-flex justify-content-between">
                    <div>
                        <BadgeComponent
                            label={_.startCase(_.toLower(response.status))}
                            classes={{
                                contextual: setBadgeClasses(response.status),
                            }}
                        />
                        <span className="ms-3">
                            {`${new Date(response.createdAt).toDateString()}`}
                        </span>
                    </div>
                    {session && (
                        <div className='d-flex justify-content-between"'>
                            <Link
                                className="btn btn-secondary btn-sm me-2"
                                href={`/issues/${params.id}/edit`}
                            >
                                Edit Issue
                            </Link>
                            <HandleBtnModal
                                label={'Delete Issue'}
                                eventName={'openModal'}
                                data={response}
                                classes={{ contextual: 'danger', size: 'sm' }}
                            />
                        </div>
                    )}
                </div>
                <div className="card mt-3">
                    <div className="card-body">
                        <ReactMarkdown>{response.description}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueShow;
