
let loginUser = {}


loginUser.emailClheck = (req,res)=>{
    res.send('email pass')

    let query = `call forgetPassword("${data.email}")`;
    connection.query(query, (err, result) => {
if(err){
res.end({'resultCode':'0','result':err})
}else{
    res.end({'resultCode':'1','result':result})

}
    })
}

loginUser.login = (req, res) => {

    upload(req, res, err => {

        // console.log(req.files,erro,'====');
        if (err instanceof multer.MulterError) {
            return res.send(err)
        } else if (err) {
            console.log(err, 'ccc');
            return res.send(err)
        } else {
            console.log('working finm')
        }




    })

}



module.exports = loginUser;
