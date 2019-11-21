let nawazish = {
    anthony: ['hey hey'],

}

let user = 'anthony';

console.log(nawazish);

if(nawazish[user] === undefined){
    nawazish[user] = [];
    nawazish[user].push('hello');
    console.log(nawazish);
}else{
    nawazish[user].push('dayyy')
    console.log(nawazish);
}



// router.get('/m', function(req, res, next) {
//     users.findOne({username: req.session.passport.user})
//           .then(function(user){
//             // console.log(user)
//             // if(user['message'] === undefined){
//             //   user.messages = {}
//             // }
  
//             let u = 'javed';
//             console.log(user.messages[u]);
//             if(user.messages[u] === undefined){
//               user.messages[u] = [ ];
//               user.messages[u].push('hi hi');
//             }else{
//               user.messages[u].push('hello');
//             }
//             user.markModified('message');
//             user.save().then(function(updatedmessage){
//               console.log(updatedmessage);
//               res.end();
//             })
//           })
//           .catch(err => {
//             console.log(err);
//           })
//   });
  