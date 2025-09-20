// firebase-auth.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9FFmqxNbTcKe6lzYbQVOTuaMBeYhtaIY",
  authDomain: "iotproject-1a161.firebaseapp.com",
  projectId: "iotproject-1a161",
  storageBucket: "iotproject-1a161.appspot.com",
  messagingSenderId: "231906985874",
  appId: "1:231906985874:web:0450fc017515f82c99a34b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Handle Admin Signup form submission
const adminSignupForm = document.getElementById("adminSignupForm");

if (adminSignupForm) {
  adminSignupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get values from form inputs
    const name = adminSignupForm.querySelector('input[type="text"]').value;
    const email = adminSignupForm.querySelector('input[type="email"]').value;
    const password = adminSignupForm.querySelector('input[type="password"]').value;

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional admin info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        role: "admin"
      });

      alert("Admin registered successfully!");
      // Redirect to admin login or dashboard page
      window.location.href = "admin-login.html";

    } catch (error) {
      alert("Error: " + error.message);
    }
  });
}
