import { IDiscussionBallon } from "./types/types"

export const discussionBallon = ({
    time,
    title,
    idPlace,
    id,
}: IDiscussionBallon): string => `
    <div class="map-balloon-container map-discussion">
        <header>
            <div></div>
            <p class="map-time">${time}</p>
        </header>
        <div class="map-title">
            <p>${title}</p>
        </div>
        <footer class="map-discussion-footer">
            <div class="map-footer-button-commentaries">
                <span>125 комментариев</span>
                <img src="/svg/chevron-up.svg" alt="chevron-up" />
            </div>
        </footer>
    </div>
`
