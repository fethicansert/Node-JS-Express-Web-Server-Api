//nodemon restart app when we change something and save CTLR+S
// package.json gitignore a koyulmaz cunku git clone yapipi npm i yaptgimizda package.json okunup ona gore packetler kurulur indirilir
const { format, longFormatters }  = require('date-fns');
const { v4 } = require('uuid');


const user = {
    id: v4(),
    name: 'BOB MARLEY'
}


console.log(user);
console.log(format(new Date(), 'yyyyMMdd\tHH:mm:sss'));


// "dependencies" = {
//     "date-fns": "~3.3.1",  //~ only update patch version
//     "uuid": "^9.0.1" //version numaralarinin ilki major numarasi 9 bir sonraki minor 0 ve son patch numarasi 1
//   }                  //en ondeki ^ isaret minor updatele ama major degistirme demektir onu degismemiz update sonrasi sorunlara yok acabilirs

//   //npm install uuid@8.9.0 dowloading specific version

//npm rm - uninstall for delete depenedencies
//We should use -D if devDependecies or -g to globel package