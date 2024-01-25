import styles from "./styles/style.module.scss"

export function LoadingProfile() {
    return (
        <div className={styles.containerProfile} data-loading-profile>
            <span data-avatar />
            <div>
                <span data-name />
                <span data-geo />
            </div>
        </div>
    )
}

export function LoadingBarters() {
    return (
        <div className={styles.containerBarter}>
            <LoadingProfile />
            <div data-content>
                <span data-category />
                <span data-repeat />
                <span data-category />
            </div>
            <div data-footer>
                <span data-time />
                <span data-circle />
            </div>
        </div>
    )
}

export function ServiceLoading() {
    return (
        <div className={styles.containerService}>
            <div data-header>
                <span data-cirlce />
                <span data-title />
            </div>
            <LoadingProfile />
            <span data-footer />
        </div>
    )
}

export function ThreadLoading() {
    return (
        <div className={styles.container}>
            <LoadingProfile />
            <span data-footer />
        </div>
    )
}

export function LoadingMyOffer() {
    return (
        <div className={styles.containerMyOffer}>
            <div data-header>
                <span data-title />
                <span data-rating />
            </div>
            <div data-want>
                <span data-prefix />
                <span data-p />
            </div>
            <div data-can>
                <span data-prefix />
                <span data-category />
                <span data-category />
            </div>
            <div data-image>
                <span />
                <span />
                <span />
                <span />
            </div>
            <div data-footer>
                <span data-button />
                <span />
            </div>
        </div>
    )
}
