/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import styles from './navbar.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ListGroupComponent from '../library/components/list-group/list-group';
import { IListGroup } from '../library/components/list-group/interfaces';
import { useSession } from 'next-auth/react';

function NavbarComponent() {
    const currentPath = usePathname();
    const router = useRouter();
    const { data: session, status } = useSession();

    const [isOpen, setOpen] = useState(false);
    const [reset, setReset] = useState(false);
    const [label, setLabel] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        handleLinks();
    }, [status]);

    const handleLinks = () => {
        if (status === 'unauthenticated') {
            setLabel('Auth');
        } else {
            setLabel(session?.user.name);
            setAvatar(session?.user.image);
        }
    };

    const links = [
        {
            label: 'Dashboard',
            path: '/',
        },
        {
            label: 'Issues',
            path: '/issues',
        },
    ];

    const auth = [
        {
            label: 'Sign in',
            path: '/api/auth/signin',
            key: 'login',
        },
        {
            label: 'Sign up',
            path: '',
            key: 'register',
        },
        {
            label: 'Sign Out',
            path: '/api/auth/signout',
            key: 'signout',
        },
    ];

    const props: IListGroup = {
        collection:
            status === 'unauthenticated'
                ? auth.filter((item) => item.key !== 'signout')
                : auth.filter((item) => item.key === 'signout'),
        itemKey: 'key',
        text: 'label',
        onEmitEvent: handleNavigation,
        reset,
    };

    function handleNavigation(current) {
        setOpen(false);
        setReset(true);
        router.push(current.path);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">
                    <AiFillBug></AiFillBug>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarTogglerDemo02"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {links.map((item, i) => (
                            <li className="nav-item" key={i}>
                                <Link
                                    className={`nav-link ${
                                        item.path === currentPath &&
                                        styles.active
                                    }`}
                                    aria-current="page"
                                    href={item.path}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className="d-flex">
                        {avatar && (
                            <div
                                className={styles.avatar}
                                style={{ backgroundImage: `url(${avatar})` }}
                                onClick={() => setOpen((prev) => !prev)}
                            ></div>
                        )}
                        <div className="dropdown">
                            <button
                                className={`btn btn-link dropdown-toggle ${styles.link}`}
                                type="button"
                                data-bs-toggle="dropdown"
                                onClick={() => setOpen((prev) => !prev)}
                            >
                                {label}
                            </button>
                            <ul
                                className={`dropdown-menu ${
                                    isOpen && `show ${styles['menu-position']}`
                                }`}
                            >
                                <ListGroupComponent {...props} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavbarComponent;
