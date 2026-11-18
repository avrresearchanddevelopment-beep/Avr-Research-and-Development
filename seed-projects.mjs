// Sample projects (8 per domain) so every domain page has content.
// Safe to re-run: existing projects (matched by slug) are NOT overwritten,
// so anything you edit in the admin panel stays as you set it.
// Prices are left empty (= "Pending") for admin to fill in.
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const slugify = (n) => n.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const data = {
  "front-end-web-development": [
    ["Responsive Portfolio Builder", "React, Tailwind CSS, Vite", "a drag-and-drop portfolio builder with live preview and theme switching"],
    ["E-Commerce Storefront UI", "React, Redux, Stripe", "a fast product catalogue with cart, filters and checkout flow"],
    ["Real-Time Weather Dashboard", "JavaScript, Chart.js, REST API", "a dashboard visualising live weather data with interactive charts"],
    ["Online Quiz Platform", "React, Firebase", "a timed quiz application with instant scoring and leaderboards"],
    ["Kanban Task Board", "React, DnD Kit, Node.js", "a collaborative task board with drag-and-drop columns"],
    ["Recipe Finder App", "Next.js, Spotify-style UI, API", "a recipe search app with ingredient filters and saved favourites"],
    ["Movie Discovery Portal", "React, TMDB API", "a movie browser with search, genres and watch-list features"],
    ["Expense Tracker Web App", "TypeScript, React, Chart.js", "a personal finance tracker with category-wise spending charts"],
  ],
  "back-end-web-development": [
    ["Student Management System", "Django, PostgreSQL, REST", "a role-based system managing students, courses and attendance"],
    ["Online Bookstore API", "Node.js, Express, MongoDB", "a REST API for catalogue, orders and user reviews"],
    ["Library Management Portal", "Java, Spring Boot, MySQL", "a portal to issue, return and track books with fine calculation"],
    ["Hospital Appointment Booking", "Django, Celery, Redis", "an appointment scheduler with email reminders for patients"],
    ["Blog Platform with JWT Auth", "Node.js, JWT, PostgreSQL", "a multi-author blogging backend with secure token authentication"],
    ["Inventory Tracking Service", "FastAPI, SQLAlchemy", "a stock-management service with low-inventory alerts"],
    ["Online Voting System", "Spring Boot, MySQL", "a secure voting backend with one-vote-per-user enforcement"],
    ["Job Portal Backend", "Express, MongoDB, Redis", "a job listing and application service with caching"],
  ],
  "artificial-intelligence-and-machine-learning": [
    ["Customer Churn Prediction", "Python, scikit-learn, XGBoost", "a model that predicts which customers are likely to leave"],
    ["Credit Card Fraud Detection", "Python, Random Forest, SMOTE", "a classifier detecting fraudulent transactions on imbalanced data"],
    ["House Price Prediction", "Python, Regression, Pandas", "a regression model estimating property prices from features"],
    ["Movie Recommendation Engine", "Python, Collaborative Filtering", "a recommender suggesting movies based on user behaviour"],
    ["Loan Approval Predictor", "Python, Logistic Regression", "a decision-support model for loan eligibility"],
    ["Sentiment Analysis of Reviews", "Python, NLTK, SVM", "a classifier labelling product reviews as positive or negative"],
    ["Diabetes Risk Prediction", "Python, KNN, Flask", "a web app predicting diabetes risk from patient parameters"],
    ["Stock Trend Forecasting", "Python, LSTM, Keras", "a time-series model forecasting short-term stock movement"],
  ],
  "data-science-and-data-analytics": [
    ["Retail Sales Analysis Dashboard", "Python, Pandas, Power BI", "an interactive dashboard exposing sales trends and top products"],
    ["COVID-19 Data Visualisation", "Python, Plotly, Tableau", "visual analytics of infection and vaccination trends"],
    ["Customer Segmentation using K-Means", "Python, K-Means, Matplotlib", "grouping customers by purchasing behaviour for targeted marketing"],
    ["IPL Match Data Analysis", "Python, Seaborn, SQL", "exploratory analysis of match outcomes and player statistics"],
    ["HR Attrition Analytics", "Python, Pandas, Tableau", "identifying drivers of employee attrition with visual insights"],
    ["Social Media Trend Analysis", "Python, Tweepy, Pandas", "tracking trending topics and engagement patterns"],
    ["Air Quality Index Analytics", "Python, Pandas, Folium", "mapping and analysing pollutant levels across cities"],
    ["Banking Customer Insights", "SQL, Power BI, Excel", "a BI report highlighting deposit, loan and churn patterns"],
  ],
  "ml": [
    ["Heart Disease Prediction System", "Python, Random Forest, Flask", "a model predicting heart disease risk from clinical attributes"],
    ["Spam Email Classifier", "Python, Naive Bayes, TF-IDF", "a text classifier separating spam from genuine email"],
    ["Crop Yield Prediction", "Python, Gradient Boosting", "predicting crop yield from soil, rainfall and temperature data"],
    ["Fake News Detection", "Python, SVM, NLP", "a classifier flagging misleading news articles"],
    ["Used Car Price Estimator", "Python, XGBoost, Streamlit", "estimating resale price using vehicle specifications"],
    ["Student Performance Prediction", "Python, Decision Tree", "forecasting student results from academic and behavioural data"],
    ["Network Intrusion Detection using ML", "Python, Random Forest, KDD", "detecting malicious network traffic with supervised learning"],
    ["Anomaly Detection in Sensor Data", "Python, Isolation Forest", "spotting abnormal readings in industrial sensor streams"],
  ],
  "ai": [
    ["AI Chatbot for College Enquiries", "Python, Rasa, NLP", "a chatbot answering admission and course queries automatically"],
    ["Intelligent Tutoring Assistant", "Python, Transformers", "an assistant that explains concepts and quizzes learners"],
    ["AI Resume Screening System", "Python, spaCy, ML", "ranking resumes against a job description automatically"],
    ["Smart Traffic Signal Control", "Python, Reinforcement Learning", "adaptive signal timing that reduces junction waiting time"],
    ["Voice Assistant for Desktop", "Python, SpeechRecognition, pyttsx3", "a voice-controlled assistant that automates daily tasks"],
    ["Medical Diagnosis Expert System", "Python, Rule-based AI", "a symptom-based expert system suggesting probable conditions"],
    ["Tic-Tac-Toe and Chess AI Agents", "Python, Minimax, Alpha-Beta", "game-playing agents using adversarial search"],
    ["AI Based Interview Evaluator", "Python, OpenCV, NLP", "scoring interview answers and confidence cues"],
  ],
  "dl": [
    ["Handwritten Digit Recognition CNN", "Python, TensorFlow, MNIST", "a CNN classifying handwritten digits with high accuracy"],
    ["Pneumonia Detection from X-Rays", "Python, CNN, Keras", "detecting pneumonia in chest X-ray images with deep learning"],
    ["Plant Disease Detection", "Python, ResNet, PyTorch", "identifying leaf diseases from photographs"],
    ["Image Caption Generator", "Python, CNN-LSTM", "generating natural-language captions for images"],
    ["Deepfake Video Detection", "Python, CNN, OpenCV", "classifying real versus manipulated face videos"],
    ["Music Genre Classification", "Python, CNN, Librosa", "classifying songs by genre from spectrograms"],
    ["Stock Price Prediction using LSTM", "Python, LSTM, Keras", "a recurrent network forecasting closing prices"],
    ["Face Mask Detection System", "Python, MobileNet, OpenCV", "real-time mask detection from a webcam stream"],
  ],
  "nlp": [
    ["Sentiment Analysis on Tweets", "Python, BERT, Transformers", "classifying tweet sentiment using a fine-tuned language model"],
    ["Text Summarisation System", "Python, T5, Hugging Face", "producing short summaries of long articles"],
    ["Named Entity Recognition for Resumes", "Python, spaCy", "extracting names, skills and organisations from resumes"],
    ["Question Answering over Documents", "Python, BERT, FAISS", "answering natural-language questions from PDF documents"],
    ["Language Translation Tool", "Python, Seq2Seq, Attention", "translating text between languages with neural models"],
    ["Hate Speech Detection", "Python, LSTM, NLP", "flagging abusive content in social media text"],
    ["Customer Support Ticket Classifier", "Python, scikit-learn, TF-IDF", "routing support tickets to the right team automatically"],
    ["Plagiarism Checker", "Python, Cosine Similarity, NLTK", "detecting textual similarity between submitted documents"],
  ],
  "cybersecurity": [
    ["Network Intrusion Detection System", "Python, Scapy, ML", "monitoring traffic and alerting on suspicious patterns"],
    ["Phishing URL Detection", "Python, Random Forest", "classifying URLs as phishing or legitimate"],
    ["Secure File Sharing with Encryption", "Python, AES, RSA", "end-to-end encrypted file transfer with key management"],
    ["Password Strength and Breach Checker", "Python, Hashing, API", "evaluating password strength and known-breach exposure"],
    ["Keylogger Detection Tool", "Python, Process Monitoring", "detecting hidden keylogging software on a host"],
    ["Web Application Vulnerability Scanner", "Python, OWASP, Requests", "scanning sites for common issues such as XSS and SQLi"],
    ["Steganography Tool for Images", "Python, LSB, OpenCV", "hiding and extracting secret messages inside images"],
    ["Two-Factor Authentication System", "Node.js, TOTP, MongoDB", "adding time-based OTP login security to web apps"],
  ],
  "cloud-computing": [
    ["Deploying a Scalable Web App on AWS", "AWS EC2, ELB, Auto Scaling", "a load-balanced, auto-scaling deployment architecture"],
    ["Serverless Image Processing Pipeline", "AWS Lambda, S3, API Gateway", "resizing and tagging uploaded images with serverless functions"],
    ["Cloud-Based File Storage System", "Python, AWS S3, Flask", "a Drive-like storage service with sharing links"],
    ["CI/CD Pipeline with Docker and Jenkins", "Docker, Jenkins, GitHub", "automated build, test and deploy workflow"],
    ["Kubernetes Microservices Deployment", "Kubernetes, Docker, Helm", "orchestrating a multi-service application on a cluster"],
    ["Cloud Cost Monitoring Dashboard", "Python, AWS Cost Explorer", "tracking and visualising cloud spend per service"],
    ["Multi-Cloud Backup Solution", "Python, Azure, AWS", "automated backups replicated across cloud providers"],
    ["IoT Data Lake on Cloud", "AWS IoT Core, S3, Athena", "ingesting and querying sensor data at scale"],
  ],
  "blockchain": [
    ["Blockchain Based Voting System", "Solidity, Ethereum, Web3.js", "tamper-proof electronic voting using smart contracts"],
    ["Certificate Verification on Blockchain", "Solidity, IPFS, React", "issuing and verifying academic certificates on-chain"],
    ["Supply Chain Tracking DApp", "Hyperledger, Node.js", "end-to-end product traceability across suppliers"],
    ["Decentralised Crowdfunding Platform", "Solidity, Hardhat, React", "milestone-based fundraising governed by smart contracts"],
    ["Healthcare Records on Blockchain", "Ethereum, IPFS, Solidity", "secure, patient-controlled medical record sharing"],
    ["NFT Marketplace", "Solidity, ERC-721, Next.js", "minting, listing and trading digital collectibles"],
    ["Land Registry using Blockchain", "Solidity, Ethereum", "transparent property ownership records"],
    ["Cryptocurrency Wallet", "JavaScript, Web3, Ethers.js", "a wallet for sending and tracking tokens securely"],
  ],
  "iot": [
    ["Smart Home Automation System", "ESP32, MQTT, Mobile App", "controlling lights and appliances remotely with sensor feedback"],
    ["IoT Based Smart Agriculture", "Arduino, Soil Sensor, GSM", "automatic irrigation based on soil moisture readings"],
    ["Air Quality Monitoring System", "ESP8266, MQ135, ThingSpeak", "live pollutant monitoring with cloud dashboards"],
    ["Smart Parking System", "Arduino, IR Sensors, Firebase", "detecting free slots and showing availability in an app"],
    ["IoT Health Monitoring Wearable", "ESP32, MAX30100, Blynk", "tracking heart rate and SpO2 with alerts"],
    ["Smart Energy Meter", "ESP32, ACS712, MQTT", "real-time electricity usage monitoring and billing"],
    ["Industrial Machine Condition Monitoring", "Raspberry Pi, Vibration Sensor", "predicting machine faults from vibration data"],
    ["Vehicle Tracking using GPS and GSM", "Arduino, GPS, GSM", "real-time vehicle location sharing"],
  ],
  "embedded-systems": [
    ["Digital Door Lock with Keypad", "8051, Keypad, Embedded C", "a password-based locking system on a microcontroller"],
    ["Automatic Street Light Controller", "Arduino, LDR, Relay", "switching lights on and off based on ambient light"],
    ["RFID Attendance System", "STM32, RFID, LCD", "automated attendance logging with RFID cards"],
    ["Temperature Controlled Fan", "PIC16F877A, LM35", "fan speed regulated by measured temperature"],
    ["Line Following Robot", "Arduino, IR Sensors, Motor Driver", "a robot that tracks a line autonomously"],
    ["Obstacle Avoiding Robot", "Arduino, Ultrasonic Sensor", "navigation while avoiding obstacles"],
    ["Patient Monitoring Embedded System", "STM32, Sensors, LCD", "displaying vital signs with threshold alarms"],
    ["Bluetooth Controlled Car", "Arduino, HC-05, Android", "driving a vehicle from a smartphone app"],
  ],
  "vlsi": [
    ["8-bit ALU Design in Verilog", "Verilog, Xilinx Vivado", "an arithmetic and logic unit simulated and synthesised on FPGA"],
    ["Low Power Full Adder Design", "Cadence, 45nm CMOS", "an adder optimised for power and delay"],
    ["UART Transceiver Design", "Verilog, FPGA", "a serial communication module with baud-rate control"],
    ["FIR Filter Implementation on FPGA", "VHDL, Xilinx", "a digital filter implemented for real-time signal processing"],
    ["Traffic Light Controller using FSM", "Verilog, ModelSim", "a state-machine based junction controller"],
    ["SRAM Cell Design", "Cadence Virtuoso, CMOS", "a 6T SRAM cell analysed for stability and power"],
    ["Booth Multiplier Design", "Verilog, Vivado", "an efficient signed multiplier using Booth recoding"],
    ["Vedic Multiplier for High Speed", "Verilog, FPGA", "a fast multiplier based on Vedic mathematics"],
  ],
  "image-processing": [
    ["Face Recognition Attendance System", "Python, OpenCV, LBPH", "recognising faces to mark attendance automatically"],
    ["Brain Tumour Detection from MRI", "Python, Segmentation, CNN", "locating tumour regions in MRI scans"],
    ["Vehicle Number Plate Recognition", "Python, OpenCV, Tesseract", "reading number plates from images and video"],
    ["Image Denoising using Filters", "MATLAB, Wavelets", "removing noise while preserving image details"],
    ["Fingerprint Recognition System", "MATLAB, Minutiae Extraction", "matching fingerprints for authentication"],
    ["Satellite Image Classification", "Python, CNN, Remote Sensing", "classifying land cover from satellite imagery"],
    ["Lane Detection for Autonomous Vehicles", "Python, OpenCV, Hough Transform", "detecting road lanes in video frames"],
    ["Medical Image Enhancement", "MATLAB, CLAHE", "improving contrast of X-ray and CT images"],
  ],
  "ai-and-iot": [
    ["AI Powered Smart Home Security", "ESP32-CAM, OpenCV, MQTT", "face-aware door monitoring with instant mobile alerts"],
    ["Smart Irrigation with ML Prediction", "Raspberry Pi, Sensors, ML", "predicting water need from weather and soil data"],
    ["Predictive Maintenance for Machines", "IoT Sensors, LSTM, Cloud", "forecasting equipment failure from sensor streams"],
    ["AI Based Health Monitoring Band", "ESP32, ML, Firebase", "detecting abnormal vitals using on-device models"],
    ["Smart Traffic Management", "Raspberry Pi, YOLO, IoT", "counting vehicles and adapting signals in real time"],
    ["Edge AI Wildlife Monitoring", "Jetson Nano, TensorFlow Lite", "identifying animals from camera traps at the edge"],
    ["Voice Controlled Home Appliances", "ESP32, NLP, MQTT", "speech-driven control of home devices"],
    ["Smart Waste Segregation System", "Raspberry Pi, CNN, Servo", "automatically sorting waste by type"],
  ],
};

const diff = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
const years = [2022, 2023, 2024, 2025, 2026];
let created = 0, skipped = 0;

for (const [domainSlug, items] of Object.entries(data)) {
  const domain = await prisma.domain.findUnique({ where: { slug: domainSlug } });
  if (!domain) { console.log("!! domain not found, skipping:", domainSlug); continue; }
  for (let i = 0; i < items.length; i++) {
    const [title, tech, summary] = items[i];
    const slug = slugify(title);
    const exists = await prisma.project.findUnique({ where: { slug } });
    if (exists) { skipped++; continue; }
    const technologies = tech.split(",").map((t) => t.trim());
    const description =
      `This project develops ${summary}. ` +
      `It is implemented using ${technologies.join(", ")}. ` +
      `The work covers requirement analysis, system design, implementation, testing and documentation, ` +
      `and is suitable for academic submission at B.Tech and M.Tech level.`;
    await prisma.project.create({
      data: {
        domainId: domain.id,
        title,
        slug,
        description,
        technologies,
        difficultyLevel: diff[i % 3],
        level: i % 2 === 0 ? "BTECH" : "MTECH",
        publicationYear: years[i % years.length],
        status: "PUBLISHED",
        displayOrder: i,
      },
    });
    created++;
  }
  console.log("Domain done:", domain.name);
}
console.log(`\nCreated ${created} projects, skipped ${skipped} that already existed.`);
await prisma.$disconnect();
