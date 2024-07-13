class AppError extends Error {
    constructor(){
        super()
    }
    create(message, statusCode, satutsText){
        this.message = message
        this.statusCode = statusCode
        this.satutsText = satutsText
        return this
    }
}

module.exports = new AppError()