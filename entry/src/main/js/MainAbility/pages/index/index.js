/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless requiretitled by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import hilog from '@ohos.hilog';
import cardEmulation from '@ohos.nfc.cardEmulation';
import {
    GenerateKeyCBC,
    EncryptDataCBC,
    DecryptDataCBC,
    DeleteKeyCBC,
    CheckKeyExistCBC,
} from "../CustomHuks";
import { paymentAid, otherAid, comparisonResponseData, DEFAULT_RESP } from './constant';
import app from '@system.app'

//TODO: You should update this with the package name of your watch application
const appName = "dev.sinanyilmaz.hcepayment";

let plainText = 'abcdef123456789';
let cipherText = '';

function initCardEmulation() {
    cardEmulation.hasHceCapability();
    [cardEmulation.CardType.PAYMENT, cardEmulation.CardType.OTHER].forEach(type => {
        cardEmulation.isDefaultService(appName, type);
    });
}

export default {
    data: {
        headCon: appName,
        paymentAid: paymentAid,
        otherAid: otherAid,
        title: '',
        toastShow: false,
        iconSrc: ''
    },
    onInit() {
        console.log('[HceService-Logs] onInit running');
    },
    /*
     This function handles a swipe event. If the event indicates a rightward direction (e.direction == "right"), it terminates the application (app.terminate()).
     Thus, when a swipe gesture to the right is detected, it triggers the termination of the application.
   */
    swipeEvent(e) {
        if (e.direction == 'right') {
            app.terminate();
        }
    },

    click(buttonValue) {
        let operationSuccessful;

        switch (buttonValue) {
            case 'generate_key':
                operationSuccessful = GenerateKeyCBC().operationSuccessful;
                this.title = GenerateKeyCBC().huksInfo;
                break;
            case 'encrypt_key':
                operationSuccessful = EncryptDataCBC(plainText).operationSuccessful;
                this.title = EncryptDataCBC(plainText).huksInfo;
                break;
            case 'decrypt_key':
                operationSuccessful = DecryptDataCBC(cipherText).operationSuccessful;
                this.title = DecryptDataCBC(cipherText).huksInfo;
                break;
            case 'delete_key':
                operationSuccessful = DeleteKeyCBC().operationSuccessful;
                this.title = DeleteKeyCBC().huksInfo;
                break;
            case 'check_key':
                operationSuccessful = CheckKeyExistCBC().operationSuccessful;
                this.title = CheckKeyExistCBC().huksInfo;
                break;
            default:
                console.log(`err ${buttonValue}.`);
                return;
        }

        // Update icon based on operation success
        this.iconSrc = operationSuccessful ? '/icons/checked.png' : '/icons/error.png';
        this.toastShow = true;

        setTimeout(() => {
            this.toastShow = false
        }, 2000)
    },

    onReady() {
        initCardEmulation();

        const hceService = new cardEmulation.HceService();

        hceService.start(appName, this.paymentAid);

        hceService.on("hceCmd", (data) => {
            console.log('[HceService-Logs] / callback => Operation hceCmd succeeded. Data: ' + data);
            let responseData = handleApdu(data);
            sendResponse(hceService, responseData);
        });
    }
}

function sendResponse(hceService, responseData) {
    hceService.transmit(responseData, () => {
        console.log('[HceService-Logs] sendResponse start');
    });
    console.log('[HceService-Logs] sendResponse end');
}

function compareArray(a1, a2) {
    if (a1 === a2) return true; // Check if they are the same reference
    if (!a1 || !a2) return false; // Check if either one is null
    if (a1.length !== a2.length) return false; // Check their lengths
    return a1.every((value, index) => value === a2[index]); // Compare elements
}

function handleApdu(apdu) {
    let response = DEFAULT_RESP;
    console.log('[HceService-Logs] in handleApdu function');

    comparisonResponseData.forEach(item => {
        if (compareArray(apdu, item.data)) {
            hilog.info(0x0001, "[HceService-Logs]", `RESPONSE${comparisonResponseData.indexOf(item) + 1} matched`)

            response = item.response;
        }
    });

    if (response === DEFAULT_RESP) {
        hilog.info(0x0001, "[HceService-Logs]", "not equals, used default.")
    }

    hilog.info(0x0001, "[HceService-Logs]", "handleApdu response = ", response)

    return response;
}
