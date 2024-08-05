const errorHandler = (req, res, error, next) =>{
    const statusCode = res.statusCode ? res.statusCode : 500;

    return res.status(statusCode).json({message: error.message})
}

module.exports = {
    errorHandler,
};