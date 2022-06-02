import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4500;

const habdleListening = () => 
    console.log(`✅ Server listening on port http://localhost:${PORT}`);

app.listen(PORT, habdleListening);