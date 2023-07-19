import Image from "next/image"

import { ButtonFill, ButtonsCircle } from "@/components/common/Buttons"
import { BlockOther } from "./components/BlockOther"

import { ACHIEVEMENTS, SOCIAL_MEDIA } from "./constants"
import { PEOPLES } from "@/mocks/components/profile/constants"

import styles from "./styles/style.module.scss"

export const MainInfo = () => {

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.avatar}>
          <Image
            className={styles.photo}
            src="/mocks/elena.png"
            alt='profile'
            width={94}
            height={94}
          />
          <Image
            className={styles.verified}
            src="/svg/verified-tick.svg"
            alt='tick'
            width={32}
            height={32}
          />
        </div>
        <div className={styles.information}>
          <div className={styles.titleAndButtons}>
            <div className={styles.nameAndGeo}>
              <h3>Jenny Wilson</h3>
              <div className={styles.geo}>
                <Image
                  src="/svg/geo-marker.svg"
                  alt="geo"
                  width={20}
                  height={20}
                />
                <p>Inglewood, Maine</p>
              </div>
            </div>
            <section className={styles.buttons}>
              <ButtonFill
                label="Добавить в друзья"
                small
                shadow
              />
              <ButtonsCircle
                src="/svg/message-dots-circle.svg"
                type="primary"
              />
              <ButtonsCircle
                src="/svg/repeat-01.svg"
                type="primary"
              />
            </section>
          </div>
          <div className={styles.descriptionAndOther}>
            <p className={styles.description}>Я Дженни Уилсон, любознательный и полный энтузиазма человек с интересом к жизни и жаждой знаний. Вырос в динамичном и мультикультурном городе.</p>
            <BlockOther
              label="Достижения"
              classNames={[styles.achievements]}
            >
              {
                ACHIEVEMENTS.map(item => (
                  <Image
                    key={item.assignment}
                    src={item.src}
                    alt={item.assignment}
                    width={36}
                    height={36}
                  />
                ))
              }
            </BlockOther>
            <BlockOther
              label="Социальные медиа"
              classNames={[styles.social]}
            >
              {
                SOCIAL_MEDIA.map(item => (
                  <Image
                    key={item.assignment}
                    src={item.src}
                    alt={item.assignment}
                    width={28}
                    height={28}
                    className="cursor-pointer"
                  />
                ))
              }
            </BlockOther>
            <BlockOther
              label="Круг общения"
              classNames={[styles.peoples]}
            >
              {
                PEOPLES.map(item => (
                  <div key={item.assignment} className={styles.people}>
                    <Image
                      className={styles.img}
                      src={item.src}
                      alt={item.assignment}
                      width={33}
                      height={33}
                    />
                  </div>
                ))
              }
              <div className={styles.more}>
                <p>12+</p>
              </div>
            </BlockOther>
          </div>


        </div>
        <div className={styles.statusActive}>
          <p>Active 1 day ago</p>
          <div className={styles.dividers} />
          <p>Joined on February 2017</p>
        </div>
      </div>
    </div>
  )
}