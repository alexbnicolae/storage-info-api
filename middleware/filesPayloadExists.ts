const filesPayloadExists = (req: any, res: any, next: any) => {
    if (!req.files) return res.status(400).json({ status: "error", message: "Missing files" })

    next()
}

module.exports = filesPayloadExists