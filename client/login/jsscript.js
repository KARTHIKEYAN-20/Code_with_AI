const signUpLink = document.querySelector('.signup-link');
const signInLink = document.querySelector('.signin-link');
const wrapper = document.querySelector('.wrapper');

signUpLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

signInLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase , set , ref , update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBduN6XPKqN97gwG9XVTWXeuGaW1VmsGHw",
  authDomain: "cherrycode-login.firebaseapp.com",
  databaseURL: "https://cherrycode-login-default-rtdb.firebaseio.com",
  projectId: "cherrycode-login",
  storageBucket: "cherrycode-login.appspot.com",
  messagingSenderId: "279596299425",
  appId: "1:279596299425:web:ba762511d1a536e5822ce0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

signup.addEventListener('click', (e) => {

    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        set(ref(database, 'users/' + user.uid),{
            username : username,
            email : email
        })
        document.getElementById("formsignup").reset();
        wrapper.classList.toggle('active');
        alert('Account registered successfully!');
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (error.code === "auth/email-already-in-use") {
            // Handle email already in use error
            alert("This email is already registered");
        } else { 
            alert('errorMessage');
        }
        // ..
    });
})

signin.addEventListener('click', (e)=>{

var email = document.getElementById('emailsignin').value;
var password = document.getElementById('passwordsignin').value;

const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const dt = new Date();
        update(ref(database, 'users/' + user.uid),{
            last_login : dt,
        })
        document.getElementById("formsignin").reset();
        window.location.replace("../index.html");
        alert('Log in successful!');
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (error.code === "auth/user-not-found") {
            // Handle user not found error
            alert("This email is not registered");
        } else if (error.code === "auth/wrong-password") {
            // Handle wrong password error
            alert("Incorrect password");
        } else {
            alert('errorMessage');
        }
    });
})

// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// const firebaseConfig = {
//     apiKey: "AIzaSyBduN6XPKqN97gwG9XVTWXeuGaW1VmsGHw",
//     authDomain: "cherrycode-login.firebaseapp.com",
//     projectId: "cherrycode-login",
//     storageBucket: "cherrycode-login.appspot.com",
//     messagingSenderId: "279596299425",
//     appId: "1:279596299425:web:ba762511d1a536e5822ce0"
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const database = firebase.database();

// function register(){
//     username = document.getElementById('username').value;
//     email = document.getElementById('email').value;
//     password = document.getElementById('password').value;

//     if(validate_email(email) == false || validate_password(password) == false)
//     {
//         alert('Enter correct email or password!');
//         return;
//     }

//     createUserWithEmailAndPassword(email, password)
//     .then(function() {
//         let user = userCrendential.user;
//         let database_ref = database.ref();
//         let user_data = {
//             username : username,
//             email : email,
//             last_login: Date.now()
//         }

//         database_ref.child('users/' + user.uid).set(user_data);

//         alert('user created!');
//     })
//     .catch(function(error) {
//         let error_code = error.code;
//         let error_message = error.message;
//         alert(error_message);
//     })
// }

// function validate_email(email) {
//     expression = /^[^@]+@\w+(\.\w+)+\w$/
//     if(expression.test(email)==true)
//     {
//         return true;
//     } else {
//         return false;
//     }
// }

// function validate_password(password) {
//     if(password.length < 6)
//     {
//         return false;
//     } else {
//         return true;
//     }
// }