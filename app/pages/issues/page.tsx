/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link';
import styles from './page.module.scss';
import { issuesService } from './_shared/service';
import BadgeComponent from '../../common/library/components/badges/badge';
import _ from 'lodash';
import { Issue } from './_shared/interfaces';
import { setBadgeClasses } from './_shared/utils';
export const dynamic = 'force-dynamic';

async function IssuesIndex() {
    const colNames = ['title', 'status', 'createdAt'];
    const issues: Issue[] = await issuesService.getCollectionSSR();

    const cellRender = (col: string, item: Issue) => {
        if (col === 'createdAt') {
            return `${new Date(item[col]).toDateString()}`;
        } else if (col === 'status') {
            return (
                <BadgeComponent
                    label={`${_.startCase(_.toLower(item[col]))}`}
                    classes={{
                        size: 'md',
                        contextual: setBadgeClasses(`${item[col]}`),
                    }}
                />
            );
        } else {
            return (
                <Link className={styles.link} href={`issues/${item.id}`}>
                    {item[col]}
                </Link>
            );
        }
    };

    return (
        <div>
            <h1>Welcome to Issues Index!</h1>

            <Link className="btn btn-primary my-3" href={'/issues/new'}>
                New Issue
            </Link>

            <table className="table mt-3">
                <thead>
                    <tr>
                        {colNames.map((col: string, i) => (
                            <th
                                key={i}
                                scope="col"
                                className={
                                    i > 0 ? 'd-none d-sm-table-cell' : ''
                                }
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {issues.map((item: Issue) => (
                        <tr key={item.id}>
                            {colNames.map((col, i) => (
                                <td
                                    key={i}
                                    className={
                                        i > 0 ? 'd-none d-sm-table-cell' : ''
                                    }
                                >
                                    {cellRender(col, item)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default IssuesIndex;
