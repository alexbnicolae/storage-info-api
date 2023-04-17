import { ObjectId } from "mongoose"
import { FolderContentEnum } from "../../utils/enums/folder-content.enum"

export type WordFileSchemaDto = {
    _id?: string,
    user: ObjectId,
    name: string,
    type: FolderContentEnum,
    parentId: string | null | ObjectId,
    content: {
        word: {
            value: string,
            isRequired: boolean,
            error: boolean
        },
        meaning: {
            value: string,
            isRequired: boolean,
            error: boolean
        },
        partOfSpeech: {
            value: string,
            isRequired: boolean,
            error: boolean
        },
        wordLanguage: {
            value: string,
            isRequired: boolean
        },
        moreDetails: {
            value: string,
            isRequired: boolean
        },
        optionalContent: {
            value: boolean,
            isRequired: boolean
        }
    },
    encrypted?: boolean
    folderPassword?: string
}