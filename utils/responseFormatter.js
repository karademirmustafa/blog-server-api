module.exports = {
    createSuccessResponse: (message="", data=null) => ({
        status: true,
        message,
        data
    })
}
