import { ObjectId } from "mongoose"
import { FolderContentEnum } from "../../utils/enums/folder-content.enum"

export type ContentSchemaDto = {
    _id?: string;
    user: ObjectId,
    name: string,
    type: FolderContentEnum,
    parentId: string | null | ObjectId,
    content?: {},
    encrypted?: boolean
    folderPassword?: string
}