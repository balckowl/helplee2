import Link from "next/link"
import styles from './Card.module.css'

interface cardProps{
    name: string;
    link: string;
    imgUrl: string;
}

const Card = ({ name, link, imgUrl }: cardProps) => {
    return (
        <div className="col-lg-4 col-sm-6">
            <div className={`bg-white ${styles.card_body}`}>
                <Link href={link}>
                    <div className={`${styles.card_icon_box}`}>
                        <img src={imgUrl} alt="" />
                    </div>
                    <div className={`${styles.card_text_box}`}>
                        <h4>{name}</h4>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Card