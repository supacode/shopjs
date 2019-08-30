exports.errorPage = (error, req, res, next) => {
    error.errorStatusCode = 500;
    res.redirect(500);
    throw new Error(error);
    // write to error log file
}