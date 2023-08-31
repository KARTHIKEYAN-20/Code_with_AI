
// Initialize Firebase
firebase.initializeApp({
      apiKey: "AIzaSyBduN6XPKqN97gwG9XVTWXeuGaW1VmsGHw",
      authDomain: "cherrycode-login.firebaseapp.com",
      databaseURL: "https://cherrycode-login-default-rtdb.firebaseio.com",
      projectId: "cherrycode-login",
      storageBucket: "cherrycode-login.appspot.com",
      messagingSenderId: "279596299425",
      appId: "1:279596299425:web:ba762511d1a536e5822ce0"
});


firebase.auth().onAuthStateChanged(function(user) {
    if (!user) {
        // User is not signed in.
        // Redirect to login page
        window.location.replace("./login/login.html");
    }
    else {
        console.log(user);
    }
});

var lastActivity = new Date().getTime();

setInterval(function() {
    var currentTime = new Date().getTime();
    if (currentTime > (lastActivity + 300000)) { // 5 minutes in milliseconds
        firebase.auth().signOut();
    }
}, 60000);

document.onmousemove = function() {
    lastActivity = new Date().getTime();
};

