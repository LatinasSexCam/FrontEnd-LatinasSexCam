import { Header } from "../../molecules/Header/header"
import { GET_GIRL_INFO_MOCK as useGetGirlInfoQuery } from "../../../helpers/mocks"
import { Women } from "../../../lib/types/types"
import styles from './girl.module.scss'
import { useEffect, useState } from "react"
import { Button } from "../../atoms/Button/button"
import { GirlInfoItem } from "../../atoms/GirlInfoItem/girlInfoItem"
interface Props {
    girlId: string
}
export const GirlPage = ({ girlId }: Props) => {
    const [girlInfo, setGirlInfo] = useState({} as Women)
    useEffect(() => {
        useGetGirlInfoQuery(girlId).then((girlInfo) => setGirlInfo(girlInfo))
    }, [])

    const photos = girlInfo?.mediaList?.filter(el => el.mediaType === 'PHOTO') ?? []
    const videos = girlInfo?.mediaList?.filter(el => el.mediaType === 'VIDEO') ?? []
    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = '/assets/noGirl.png'
    }
    return girlInfo.name && (
        <div>
            <Header />
            <section className={styles.bigBg}>

                <section className={styles.girlBase}>
                    <div className={styles.girlBase__info}>
                        <h1>{girlInfo?.name}</h1>
                        <p>{girlInfo?.description}</p>
                    </div>
                    <div className={styles.girlBase__nation}>
                        <strong>{girlInfo?.user?.nacionality}</strong>
                    </div>
                </section>
                <section className={styles.girlPicture}>
                    <img onError={handleImageError} src={girlInfo?.user?.profile_photo} alt={girlInfo?.name} />
                </section>



                <div className={styles.girlImages} >
                    <h2>Photos ({photos.length})</h2>
                    <section className={styles.girlImages__container}>
                        {
                            [photos[0], photos[1], photos[2]].map((image) => (
                                <img onError={handleImageError} src={image?.url} alt={girlInfo?.name} />
                            ))
                        }
                    </section>
                    <Button text="View More" className={styles.girlImage__button} />
                </div>

                <div className={styles.girlVideos} >
                    <h2>Videos ({videos.length})</h2>
                    <section className={styles.girlVideos__container}>
                        {
                            [videos[0], videos[1]].map((video) => (
                                <video controls>
                                    <source src={video?.url} type="video/mp4" />
                                </video>
                            ))
                        }
                    </section>
                    <Button text="View More" className={styles.girlVideos__button} />
                </div>

                <section className={styles.girlInformationSection}>
                    <h2 className={styles.girlInformationSection__title}>Information</h2>
                    <section className={styles.girlInformationSection__lists}>
                        <ul className={styles.girlInformationSection__lists__list}>
                            <GirlInfoItem label='Age:' value={`${girlInfo.age}`} />
                            <GirlInfoItem label='Height (cm):' value={`${girlInfo.height}`} />
                            <GirlInfoItem label='Weight (kg):' value={`${girlInfo.weight}`} />
                            <GirlInfoItem label='Hips:' value={`${girlInfo.hips}`} />
                            <GirlInfoItem label='Shoe size:' value={`${girlInfo.shoeSize}`} />
                            <GirlInfoItem label='Hair color:' value={`${girlInfo.colorHair}`} />
                            <GirlInfoItem label='Eye color:' value={`${girlInfo.colorEyes}`} />
                            <GirlInfoItem label='Skin color:' value={`${girlInfo.colorSkin}`} />
                            <GirlInfoItem label='Cup size:' value={`${girlInfo.cupSize}`} />
                        </ul>
                        <ul className={styles.girlInformationSection__lists__list}>
                            <GirlInfoItem label='Shaving:' value={`${girlInfo.shaving}`} />
                            <GirlInfoItem label='Smoker:' value={`${girlInfo.smoker}`} />
                            <GirlInfoItem label='Nationality:' value={`${girlInfo.user.nacionality}`} />
                            <GirlInfoItem label='Piercings:' value={`${girlInfo.piercings}`} />
                            <GirlInfoItem label='Tattoos:' value={`${girlInfo.tattoos}`} />
                        </ul>
                    </section>
                </section>
            </section>
        </div >
    )
}