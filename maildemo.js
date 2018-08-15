var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({  
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'nexweb1@gmail.com',
        pass: 'satan2794'
    }
});

var mailOptions = {  
    from: 'nexweb1@gmail.com',
    to: 'nexweb1@gmail.com',
    subject: 'Nodemailer 테스트',
    text: '평문 보내기 테스트 '
};

smtpTransport.sendMail(mailOptions, function(error, response){

    if (error){
        console.log(error);
    } else {
        console.log("Message sent : " + response.message);
    }
    smtpTransport.close();
});
