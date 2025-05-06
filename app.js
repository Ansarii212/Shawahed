
// Firebase config - replace with actual keys if needed
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

document.getElementById('evidenceForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.teacherName.value;
  const id = e.target.teacherID.value;
  const school = e.target.school.value;
  const office = e.target.office.value;
  const file = document.getElementById('fileUpload').files[0];

  if (!file || file.type !== "application/pdf") {
    alert("يرجى رفع ملف PDF فقط.");
    return;
  }

  const storageRef = storage.ref(`evidences/${id}-${file.name}`);
  await storageRef.put(file);
  const fileURL = await storageRef.getDownloadURL();

  await db.collection("evidences").add({
    teacherName: name,
    teacherID: id,
    school: school,
    office: office,
    fileURL: fileURL,
    timestamp: new Date()
  });

  document.getElementById('status').innerText = "تم الإرسال بنجاح!";
  e.target.reset();
});
