import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";



export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }    
}

  //Sign in handle button

  export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const { displayName, photoURL, email } = result.user;
        const signedInUser = {
          isSigneddIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success:true
        };
        return signedInUser;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        console.log(errorCode, errorMessage, email);
      });
  };

    //Signout handle button
    export const handleSignout = () => {
        return firebase.auth().signOut()
          .then(res =>{
            const signedOutuser ={
              isSigneddIn: false,
              name:'',
              photo:'',
              email:'',
    
            }
            return signedOutuser;
          })
      };
    

      export const createUserWithemailandpassord = (name,email,password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res =>{
          const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          updateUserName(name);
          return newUserInfo;
  
        })
        .catch((error) => {
          const newUserInfo = {}
          newUserInfo.error = error.message;
          newUserInfo.success= false;
          return newUserInfo;
  
        });
      }

      export const signInwithEmailandPassword = (email,password) => {
        return firebase.auth().signInWithEmailAndPassword(email,password)
        .then(res => {
          const newUserInfo = res.user;
          newUserInfo.error = '';
          newUserInfo.success = true;
          return newUserInfo;
        })
        .catch(function(error) {
          const newUserInfo = {};
          newUserInfo.error = error.message;
          newUserInfo.success = false;  
          return newUserInfo;
        })
      }

      const updateUserName = (name) => {
        var user = firebase.auth().currentUser;
    
        user.updateProfile({
          displayName: name
        }).then(function() {
          console.log('User name updated successfully');
    
        }).catch(function(error){
          console.log(error);
    
        });
      }