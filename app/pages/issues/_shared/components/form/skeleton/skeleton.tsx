import React from 'react';
import styles from './skeleton.module.scss';

const FormSkeleton = () => {
    return (
        <div className="mt-5">
            <div className={styles['loading-skeleton']}>
                <div className={styles['skeleton-title']}></div>
                <div className={styles['skeleton-textarea']}></div>
                <div className={styles['skeleton-button']}></div>
            </div>
        </div>
    );
};

export default FormSkeleton;
