import path from "path";

const fileExtLimiter = (allowedExtArray: any[]) => {
    return (req: any, res: any, next: any) => {
        const files = req.files

        const fileExtensions: any[] = []
        Object.keys(files).forEach(key => {
            fileExtensions.push(path.extname(files[key].name))
        })

        // Are the file extension allowed? 
        const allowed = fileExtensions.every(ext => allowedExtArray.includes(ext))

        if (!allowed) {
            const message = `Upload failed. Only ${allowedExtArray.toString()} files allowed.`.replace(",", ", ");

            return res.status(422).json({ status: "error", message });
        }

        next()
    }
}

module.exports = fileExtLimiter;