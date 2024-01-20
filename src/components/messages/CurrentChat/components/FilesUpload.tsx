import { TFilesUpload } from "./types/types"

import { ImageStatic } from "@/components/common"

import styles from "./styles/files-upload.module.scss"

export const FilesUpload: TFilesUpload = ({ deleteFile, strings }) => {
    return strings.length ? (
        <div className={styles.container}>
            <ul>
                {strings.map((item, index) => (
                    <li key={`${item}-${index}`}>
                        <ImageStatic
                            src={item}
                            alt="offer-image"
                            width={400}
                            height={400}
                            onClick={() => {
                                deleteFile(index)
                            }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    ) : null
}
