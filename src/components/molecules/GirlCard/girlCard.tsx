import { ROUTES } from '../../../lib/constants/routes';
import { Button } from '../../atoms/Button/button';
import styles from './girlCard.module.scss';
import { countryCodes } from '../../../lib/constants/countryCodes'; 

interface User {
    id_user: number;
    profilePhoto: string | null;
    nationality: string; 
    age: number;
}

interface GirlCardProps {
    user: User;
    name: string;
}

export const GirlCard: React.FC<GirlCardProps> = ({ user, name }) => {
    const { id_user, profilePhoto, nationality, age } = user;

    const onImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = '/assets/default-girl.png';
    };

    const onFlagError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = '/assets/default-flag.png'; 
    };

    const countryCode = countryCodes[nationality] || 'default'; 

    return (
        <article className={styles.girlCard}>
            <img
                onError={onImageError}
                className={styles.girlCard__picture}
                src={profilePhoto || '/assets/default-girl.png'}
                alt={name}
            />
            <div className={styles.girlCard__info}>
                <div className={styles.girlCard__info__nameContainer}>
                    <h3 className={styles.girlCard__name}>{name}</h3>
                    <img
                        onError={onFlagError}
                        src={`https://flagcdn.com/48x36/${countryCode}.png`}
                        alt={`${nationality} flag`}
                        className={styles.girlCard__flag}
                    />
                </div>
                <p className={styles.girlCard__age}>Age {age}</p>
            </div>
            <Button
                className={styles.girlCard__button}
                text="View more"
                url={ROUTES.GIRL.SINGLE_GIRL.replace(':id', id_user?.toString() || '')}
            />
        </article>
    );
};