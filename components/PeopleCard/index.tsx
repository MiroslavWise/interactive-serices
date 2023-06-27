import Image from "next/image";

import type { TPeopleCard } from "./types";

import styles from "./styles/style.module.scss";

export const PeopleCard: TPeopleCard = ({
  photo, name, geo, rate, services,
}) => {
  return (
    <li className={styles.container}>
      <section className={styles.wrapperPhotoRate}>
        <Image
          src={photo}
          alt={name}
          width={72}
          height={72}
          className={styles.avatar}
        />
        <div className={styles.rateBadge}>
          <Image
            src="/svg/star.svg"
            alt="star"
            width={12}
            height={12}
          />
          <p>{rate}</p>
        </div>
      </section>
      <section className={styles.wrapperInfo}>
        <div className={styles.nameAndGeo}>
            <h3>{name}</h3>
            <div className={styles.groupGeo}>
              <Image
                src="/svg/geo-marker.svg"
                alt="geo-marker"
                width={16}
                height={16}
              />
              <p>{geo}</p>
            </div>
        </div>
        <ul className={styles.services}>
          {
            services?.map((item, index) => (
              <li key={`${item?.value}_${name}_${index}`}>
                <div className={styles.containerImgService}>
                  <Image
                    src={item?.value === "nails" ? "/mocks/Nail.png" : item?.value === "hair" ? "/mocks/hair.png" : "hair"}
                    alt="pl"
                    width={16}
                    height={16}
                  />
                </div>
                <p>{item?.name}</p>
              </li>
            ))
          }
        </ul>
      </section>
    </li>
  )
}