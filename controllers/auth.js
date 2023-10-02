
const register = async (req, res, next) => {
    try { 
        res.json("ok")
    } catch (err) { next(err) }
}
module.exports = {
register
}