
function Admin(req, res, next) {
//   console.log(req.cookies.value);
    const save = req.cookies.value
    if(save.role === 'Admin'){
        console.log('You are is Admin');
        next()
    }else{
        console.log('You not a Admin, not permission');
        // res.redirect('/auth');
    }

}

export default Admin;