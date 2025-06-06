import { ImageResponse } from "next/og"

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          position: "relative",
        }}
      >
        <svg
          width="128"
          height="128"
          viewBox="0 0 128 128"
          style={{
            fill: "none",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: 240,
            width: 240,
            aspectRatio: "1/1",
            zIndex: 50,
          }}
        >
          <path
            d="M116.438 9.96387C113.409 6.80503 109.811 4.29922 105.852 2.58959C101.892 0.879952 97.6484 0 93.3625 0C89.0766 0 84.8327 0.879952 80.8732 2.58959C76.9138 4.29922 73.3163 6.80503 70.2865 9.96387L63.9984 16.5165L57.7104 9.96387C51.5902 3.58623 43.2895 0.00330575 34.6344 0.00330582C25.9792 0.00330589 17.6785 3.58623 11.5584 9.96387C5.43825 16.3415 2 24.9914 2 34.0108C2 43.0301 5.43825 51.6801 11.5584 58.0577L59.5798 108.1C62.0113 110.633 65.9856 110.633 68.4171 108.1L116.438 58.0577C119.47 54.9004 121.874 51.1516 123.515 47.0255C125.156 42.8995 126 38.477 126 34.0108C126 29.5446 125.156 25.1221 123.515 20.9961C121.874 16.87 119.47 13.1212 116.438 9.96387Z"
            fill="url(#paint0_linear_276_15522)"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M52.0315 58.2407V61.2513L52.0284 61.3022C51.9693 62.2604 52.1768 63.216 52.6279 64.0659C53.079 64.9156 53.7562 65.6269 54.5859 66.1236L54.5954 66.1293L54.6048 66.1351C56.5085 67.3084 59.5421 68.0068 63.9376 68.0068C68.129 68.0068 71.1054 67.3667 73.0529 66.2707L73.1095 66.2389L73.1685 66.2113C73.9183 65.8607 74.5512 65.3043 74.9907 64.6076C75.4302 63.9109 75.6577 63.1035 75.6451 62.2818L75.6444 62.2352L75.6463 62.1886C75.6773 61.4357 75.4834 60.6908 75.0894 60.0465C74.6955 59.4022 74.1191 58.8872 73.4326 58.5642L73.4025 58.55L73.373 58.5347C71.5282 57.5786 67.6462 56.6015 61.4475 55.6958L61.4441 55.6953C54.796 54.7108 49.846 53.2242 46.9566 51.0364C45.5696 50.0581 44.4412 48.7665 43.6656 47.2703C42.8858 45.7659 42.4856 44.0988 42.4984 42.4102C42.5007 38.2221 44.6549 34.8891 48.5711 32.4708C52.4566 30.0714 57.5728 28.9718 63.7603 29.0005C70.0068 29.0011 75.1832 30.2117 79.1288 32.8033C83.0902 35.4055 85.2491 38.8939 85.2559 43.2066L85.2559 43.2092V45.3301H74.2455V42.6031L74.2459 42.5847C74.266 41.6759 74.0571 40.7767 73.6383 39.9677C73.2195 39.1588 72.604 38.4657 71.8477 37.9502L71.8244 37.9343L71.8018 37.9178C70.1347 36.6996 67.429 35.9474 63.4098 35.9256C59.3402 35.9035 56.6037 36.4989 54.9521 37.4797L54.897 37.5125L54.8394 37.5411C54.1854 37.8664 53.6372 38.3683 53.259 38.9894C52.8809 39.6106 52.6885 40.3253 52.7049 41.0507L52.7061 41.1019L52.7041 41.1531C52.6769 41.8453 52.849 42.5306 53.1999 43.1297C53.5507 43.7287 54.0658 44.2166 54.6846 44.5378L54.7129 44.5525L54.7406 44.5682C55.4789 44.9867 56.8084 45.4583 58.8646 45.9359C60.8863 46.4055 63.4897 46.8547 66.69 47.2794L66.699 47.2806C72.9781 48.1471 77.8181 49.5897 80.9883 51.7581C82.5465 52.7476 83.8235 54.1109 84.6998 55.7197C85.5793 57.3345 86.0262 59.1432 85.9988 60.975C85.9945 65.3176 83.8819 68.7954 79.9514 71.3179C76.0328 73.8327 70.417 74.9826 63.3458 75L63.3415 75C56.3631 75 50.8163 73.831 46.9574 71.2452C45.0862 70.0691 43.5553 68.4368 42.5125 66.507C41.4688 64.5756 40.9494 62.4116 41.0039 60.2248V58.2655L52.0315 58.2407Z"
            fill="white"
          />
          <ellipse cx="64" cy="121" rx="8" ry="7" fill="url(#paint1_linear_276_15522)" />
          <defs>
            <linearGradient id="paint0_linear_276_15522" x1="9.75" y1="9.625" x2="91.9938" y2="99.2458" gradientUnits="userSpaceOnUse">
              <stop stop-color="#D571F8" />
              <stop offset="1" stop-color="#6B5AE7" />
            </linearGradient>
            <linearGradient id="paint1_linear_276_15522" x1="57" y1="115.225" x2="67.4541" y2="126.774" gradientUnits="userSpaceOnUse">
              <stop stop-color="#D571F8" />
              <stop offset="1" stop-color="#6B5AE7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    ),
    {
      width: 256,
      height: 256,
    },
  )
}
