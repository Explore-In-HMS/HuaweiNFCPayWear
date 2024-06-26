# <p align="center"> HCE Payment Watch Application for HarmonyOS ⌚ </p>  


![demo](https://github.com/Explore-In-HMS/HuaweiNFCPayWear/assets/56589369/af961206-f99b-447b-826a-160fe1e0c022)


## 📸 Screenshots

|  ![1](https://github.com/Explore-In-HMS/HuaweiNFCPayWear/assets/56589369/0d9ac0ea-b865-46c1-97eb-b5180210dfb8)| ![2](https://github.com/Explore-In-HMS/HuaweiNFCPayWear/assets/56589369/c37ad0b1-d5f4-48d1-8ff4-50a28f02cf82)|
|--|--|
| ![3](https://github.com/Explore-In-HMS/HuaweiNFCPayWear/assets/56589369/a53cea80-c7ff-4845-9db6-c7f3266bbcfa)| ![5](https://github.com/Explore-In-HMS/HuaweiNFCPayWear/assets/56589369/49c514d8-a28e-48fd-a079-47d327972a2b)|

 
  


## Introduction
Using HMS Wear Engine, you can communicate between Android and the watch app. To make payment via NFC, you can send the tokens you have to the watch with this service and communicate with the POS terminal via the watch.


## Core Principles
- Wear Engine integration for Lite-Wearable
- Encrypt & Decrypt Keys with HUKS (HarmonyOS Universal KeyStore)
- NFC Transactions between Watch and POS Terminal

## Tech Stack
- JavaScript programming language
- HarmonyOS Operating System
- HMS Wear Engine
- HarmonyOS Universal KeyStore (HUKS)

## Functions Used In The Project
The following functions are used in index.js class.

### 🔹 initCardEmulation
The initCardEmulation function checks the NFC card emulation capabilities of the device and whether a particular application is the default service for NFC card emulation.

### 🔹 onReady
- It provides the necessary prerequisites for NFC card emulation by calling the <b>initCardEmulation</b> function.
- Initializes NFC card emulation by creating an instance of the <b>cardEmulation.HceService</b> class.
- Starts NFC card emulation with a specific application name and NFC payment AID via the <b>start</b> method.
- By adding an "hceCmd" event to the <b>hceService</b> object, the NFC card emulation defines a callback function that will run when a command is sent to the device. This function processes the incoming APDU command by calling the handleApdu function and generates an appropriate response.

### 🔹 sendResponse
The sendResponse function transmits a response generated by NFC card emulation. This function transmits the generated response to the device via the hceService.transmit method.

### 🔹 compareArray
This function checks the match between APDU commands received by the NFC card emulation and predefined APDU commands.

### 🔹 handleApdu
The handleApdu function processes an APDU (Smart Card Commands) command received by the NFC card emulation. This function compares the incoming APDU command with predefined commands and generates an appropriate response.

### 🔹 switch-case 
This is the part where the necessary operations are performed according to the button clicked and a toast message is displayed to the user on the screen according to the result of the operation.

## Links
- HarmonyOS Design Guide: https://developer.huawei.com/consumer/en/doc/design-guides-V1/components-0000001053459781-V1
- HarmonyOS Universal KeyStore (HUKS) Overview: https://developer.huawei.com/consumer/en/doc/harmonyos-guides-V2/huks-overview-0000001496554665-V2
- HUAWEI Wear Engine SDK Integration: https://developer.huawei.com/consumer/en/doc/connectivity-Guides/integrating-fitnesstwatch-sdk-0000001052859174
- HUAWEI Wear Engine Service Introduction: https://developer.huawei.com/consumer/en/doc/connectivity-Guides/service-introduction-0000000000018585






