import { description } from "./description"

export const iconDiscussion = (title: string, date: Date | string, id: string | number) =>
  `
    <div class="relative div-ymaps cursor-pointer" id="place-discussion-${id}">
      <svg width="35" height="41" viewBox="0 0 35 41" fill="none" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <g filter="url(#filter0_d_5279_82932)">
          <path d="M31.6452 15.3226C31.6452 25.2192 22.8831 28.9141 18.3762 35.2995C17.9008 35.973 16.7954 35.9455 16.3415 35.2574C12.1459 28.8978 3 25.1975 3 15.3226C3 7.41244 9.41244 1 17.3226 1C25.2327 1 31.6452 7.41244 31.6452 15.3226Z" fill="white"/>
        </g>
          <path d="M29.3203 15C29.3203 23.43 20.9856 26.5959 17.8754 32.7155C17.6625 33.1343 16.9781 33.1343 16.7652 32.7155C13.655 26.5959 5.32031 23.43 5.32031 15C5.32031 8.37258 10.6929 3 17.3203 3C23.9477 3 29.3203 8.37258 29.3203 15Z" fill="#1075EE"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3203 12.7957C10.3203 10.4233 12.2436 8.5 14.616 8.5C16.9885 8.5 18.9117 10.4233 18.9118 12.7957C18.9118 12.8869 18.9083 12.9773 18.9027 13.0671C18.504 13.1336 18.1149 13.2464 17.7393 13.4052C17.2964 13.5926 16.886 13.8379 16.5133 14.1367V13.975H12.7187V14.888L15.75 14.8881C15.4281 15.2771 15.1659 15.7088 14.9681 16.1765C14.8425 16.4734 14.7459 16.7787 14.6779 17.0905C14.6712 17.0906 14.6645 17.0907 14.6578 17.0909C14.6439 17.0912 14.63 17.0915 14.616 17.0915C13.678 17.0915 12.8104 16.7906 12.1039 16.2804L10.3623 16.7471L10.8615 14.884C10.5169 14.2658 10.3203 13.5537 10.3203 12.7957ZM12.7187 12.3392V13.2522H16.5133V12.3392H12.7187ZM12.7187 10.7034V11.6164H16.5133V10.7034H12.7187ZM19.7567 13.9062C22.1291 13.9062 24.0524 15.8295 24.0524 18.202C24.0524 18.96 23.8558 19.672 23.5112 20.2902L24.0104 22.1533L22.2688 21.6867C21.5623 22.1969 20.6946 22.4977 19.7566 22.4977C17.3842 22.4977 15.4609 20.5744 15.4609 18.202C15.4609 15.8296 17.3842 13.9062 19.7567 13.9062ZM17.8593 19.3813V20.2943H21.6539V19.3813H17.8593ZM17.8593 18.6585H21.6539V17.7455H17.8593V18.6585ZM17.8593 17.0227H21.6539V16.1096H17.8593V17.0227Z" fill="white"/>
        <defs>
          <filter id="filter0_d_5279_82932" x="0" y="0" width="34.6445" height="40.7891" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="2"/>
            <feGaussianBlur stdDeviation="1.5"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5279_82932"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5279_82932" result="shape"/>
          </filter>
        </defs>
      </svg>
      ${description(title, date)}
    </div>
  `
