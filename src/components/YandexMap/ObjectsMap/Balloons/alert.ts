import { IAlertBalloon } from "./types/types"

export const alertBallon = ({
    time,
    title,
    idPlace,
}: IAlertBalloon): string => `
    <div class="map-balloon-container map-alert">
        <header>
            <div class="map-alert-button-help"><span>Могу помочь!</span></div>
            <p class="map-time">${time}</p>
        </header>
        <div class="map-title">
            <p>${title}</p>
        </div>
        <footer class="map-alert-footer">
            <div class="map-footer-button-commentaries">
                <span>125 комментариев</span>
                <img src="/svg/chevron-up.svg" alt="chevron-up" />
            </div>
        </footer>
    </div>
`
