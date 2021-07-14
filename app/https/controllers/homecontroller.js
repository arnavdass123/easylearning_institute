function homecontroller() {
    return {
        index(req, res) {       
            return res.render('home')

            // item.find().then(function (zips) {
            //     console.log(zips)
            //     res.render('home', { zips: zips })
            // })   
        },
    }
}
module.exports = homecontroller