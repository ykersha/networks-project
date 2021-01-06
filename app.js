var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: "Your secret key",
                  resave: false,
                  saveUninitialized: true
}));


app.get('/', function(req, res){
  if(req.session.user){
     res.render('home')
  }else{
    res.redirect('/login')
  }
});

app.get('/registration', function(req, res){
  res.render('registration', {errorMsg: ""})
});

app.get('/novel', function(req, res){
  if(req.session.user){
    res.render('novel', {})
  }else{
    res.redirect('/login')
  }
  
});

app.get('/poetry', function(req, res){
  if(req.session.user){
    res.render('poetry', {})
  }else{
    res.redirect('/login')
  }
});

app.get('/fiction', function(req, res){
  if(req.session.user){
    res.render('fiction', {})
  }else{
    res.redirect('/login')
  }
});
app.get('/flies', function(req, res){
  if(req.session.user){
    res.render('flies', {errorMsg:"", successMsg:""});
  }else{
    res.redirect('/login')
  }
});

app.post('/flies', function(req,res){
  let data = fromjson();
  let user = req.session.user;
  let i = indexOfUser(user, data);
  
  if(i != -1){
    if(data[i].read.indexOf('Lord of the Flies') != -1){
      res.render('flies', {errorMsg:"Book is already in Want to Read List",successMsg:""});
    }else{
      user.read.push('Lord of the Flies');   
      req.session.user = user; 
      data[i].read.push('Lord of the Flies');
      tojson(data);
      res.render('flies', {errorMsg:"", successMsg:"Added to Want to Read List"});
    }
  }
});

app.get('/dune', function(req, res){
  if(req.session.user){
    res.render('dune',  {errorMsg:"", successMsg:""})
  }else{
    res.redirect('/login')
  }
});

app.post('/dune', function(req,res){
  let data = fromjson();
  let user = req.session.user;
  let i = indexOfUser(user, data);
  
  if(i != -1){
    if(data[i].read.indexOf('Dune') != -1){
      res.render('dune', {errorMsg:"Book is already in Want to Read List",successMsg:""});
    }else{
      user.read.push('Dune');   
      req.session.user = user; 
      data[i].read.push('Dune');
      tojson(data);
      res.render('dune', {errorMsg:"", successMsg:"Added to Want to Read List"});
    }
  }
});


app.get('/grapes', function(req, res){
  if(req.session.user){
    res.render('grapes',  {errorMsg:"", successMsg:""})
  }else{
    res.redirect('/login')
  }
});

app.post('/grapes', function(req,res){
  let data = fromjson();
  let user = req.session.user;
  let i = indexOfUser(user, data);
  
  if(i != -1){
    if(data[i].read.indexOf('The Grapes Of Wrath') != -1){
      res.render('grapes', {errorMsg:"Book is already in Want to Read List",successMsg:""});
    }else{
      user.read.push('The Grapes Of Wrath');   
      req.session.user = user; 
      data[i].read.push('The Grapes Of Wrath');
      tojson(data);
      res.render('grapes', {errorMsg:"", successMsg:"Added to Want to Read List"});
    }
  }
});

app.get('/leaves', function(req, res){
  if(req.session.user){
    res.render('leaves', {errorMsg:"", successMsg:""})
  }else{
    res.redirect('/login')
  }
});
app.post('/leaves', function(req,res){
  let data = fromjson();
  let user = req.session.user;
  let i = indexOfUser(user, data);
  
  if(i != -1){
    if(data[i].read.indexOf('Leaves of Grass') != -1){
      res.render('leaves', {errorMsg:"Book is already in Want to Read List",successMsg:""});
    }else{
      user.read.push('Leaves of Grass');   
      req.session.user = user; 
      data[i].read.push('Leaves of Grass');
      tojson(data);
      res.render('leaves', {errorMsg:"", successMsg:"Added to Want to Read List"});
    }
  }
});

app.get('/mockingbird', function(req, res){
  if(req.session.user){
    res.render('mockingbird', {errorMsg:"", successMsg:""})
  }else{
    res.redirect('/login')
  }
});
app.post('/mockingbird', function(req,res){
  let data = fromjson();
  let user = req.session.user;
  let i = indexOfUser(user, data);
  
  if(i != -1){
    if(data[i].read.indexOf('To Kill a Mockingbird') != -1){
      res.render('mockingbird', {errorMsg:"Book is already in Want to Read List",successMsg:""});
    }else{
      user.read.push('To Kill a Mockingbird');   
      req.session.user = user; 
      data[i].read.push('To Kill a Mockingbird');
      tojson(data);
      res.render('mockingbird', {errorMsg:"", successMsg:"Added to Want to Read List"});
    }
  }
});

app.get('/readlist', function(req, res){
  if(req.session.user){
    res.render('readlist', {read:req.session.user.read})
  }else{
    res.redirect('/login')
  }
});

app.get('/sun', function(req, res){
  if(req.session.user){
    res.render('sun', {errorMsg:"", successMsg:""})
  }else{
    res.redirect('/login')
  }
});
app.post('/sun', function(req,res){
  let data = fromjson();
  let user = req.session.user;
  let i = indexOfUser(user, data);
  
  if(i != -1){
    if(data[i].read.indexOf('The Sun and Her Flowers') != -1){
      res.render('sun', {errorMsg:"Book is already in Want to Read List",successMsg:""});
    }else{
      user.read.push('The Sun and Her Flowers');   
      req.session.user = user; 
      data[i].read.push('The Sun and Her Flowers');
      tojson(data);
      res.render('sun', {errorMsg:"", successMsg:"Added to Want to Read List"});
    }
  }
});


app.get('/login', function(req, res){
  if(req.session.user){
    res.redirect('/')
 }else{
   res.render('login', {errorMsg:''})
 }
});


app.post('/login', function(req, res){
  let username = req.body.username;
  let pass = req.body.password;

  if(username == "" || pass == ""){
    res.render('login', {errorMsg: "You must enter a Username and a Password"});
  }else{
  
  let data = fromjson();
  let err = true;


  data.forEach(function (arrayItem) {
    if(username == arrayItem.user && pass == arrayItem.pass){
      req.session.user = arrayItem;
      err = false;
    }
  });

  if(err){
    res.render('login', {errorMsg: "Incorrect Username or Password"});
  }
  else {
    res.redirect('/');
  }

}});

app.get('/register', function(req, res){
  if(req.session.user){
    res.redirect('/')
 }else{
   res.render('registration', {errorMsg:''})
 }
});


app.post('/register', function(req, res){
  let user = req.body.username;
  let pass = req.body.password;

  if(user == "" || pass == ""){
    res.render('registration', {errorMsg: "You must choose a Username and a Password"});
  }else{
  
  let data = fromjson();
  let err = false;

  data.forEach(function (arrayItem) {
    if(user == arrayItem.user){
       err = true;
    }
  });

  if(err){
    console.log("error");
    res.render('registration', {errorMsg: "Username already taken"});
  }
  else{
    let newUser = {"user": user, "pass": pass, "read": []};
    data.push(newUser);
    tojson(data);
   
    req.session.user = newUser;
    res.redirect('/');
  }
}
 
});







function indexOfUser(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
      if (list[i].user == obj.user && list[i].pass == obj.pass) {
          return i;
      }
  }

  return -1;
}


function fromjson(){
  let x = fs.readFileSync("users.json");
  if(x == ""){
    return [];
  }
  let data = JSON.parse(x);
  return data;
}

function tojson(users){
  let x = JSON.stringify(users);
  fs.writeFileSync("users.json", x);
}

app.post('/search',function(req,res){
  let books = ["Lord of the Flies","The Grapes Of Wrath","Leaves of Grass","The Sun and Her Flowers","Dune","To Kill a Mockingbird"];
  let search = req.body.Search;
  let data = [];
  books.forEach(function(currentbook){
     if(currentbook.toLowerCase().includes(search.toLowerCase()))
       data.push(currentbook);
  });
  let i = data.length;
  res.render('searchresults',{data : data,result: i + " books matched your search result"});
})

app.get('/search',function(req,res){
  let data=[]
  let i = 0;
  if(req.session.user){
    res.render('searchresults',{data : data,result: i + " books matched your search result"});
  }else{
    res.redirect('/login')
  }
})


if(process.env.PORT){ 
  app.listen(process.env.PORT, function() {console.log('Server started')}); 
}
else {
  app.listen(3000, function() {console.log('Server started on port 3000')}); 
}

