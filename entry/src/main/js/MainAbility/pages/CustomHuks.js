/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import huks from '@ohos.security.huks';

let aesKeyAlias = 'test_aesKeyAlias';
let plainText = '123456789';
let handle;
let IV = '0000000000000000';
let AAD = '0000000000000000';
let NONCE = '000000000000';
let huksInfo;
let operationSuccessful;

function StringToUnit8Array(str) {
    let arr = [];
    for (let i = 0, j = str.length; i < j; ++i) {
        arr.push(str.charCodeAt(i));
    }
    return new Uint8Array(arr);
}

function Unit8ArrayToString(fileData) {
    let dataString = '';
    for (let i = 0; i < fileData.length; i++) {
        dataString += String.fromCharCode(fileData[i]);
    }
    return dataString;
}

function GetAesGenPropertiesCBC() {
    return [
        { tag: huks.HuksTag.HUKS_TAG_ALGORITHM, value: huks.HuksKeyAlg.HUKS_ALG_AES },
        { tag: huks.HuksTag.HUKS_TAG_KEY_SIZE, value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128 },
        { tag: huks.HuksTag.HUKS_TAG_PURPOSE, value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT | huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT },
        { tag: huks.HuksTag.HUKS_TAG_PADDING, value: huks.HuksKeyPadding.HUKS_PADDING_PKCS7 },
        { tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE, value: huks.HuksCipherMode.HUKS_MODE_CBC },
        { tag: huks.HuksTag.HUKS_TAG_IV, value: StringToUnit8Array(IV) }
    ];
}

function GetAesEncryptPropertiesCBC() {
    return [
        { tag: huks.HuksTag.HUKS_TAG_ALGORITHM, value: huks.HuksKeyAlg.HUKS_ALG_AES },
        { tag: huks.HuksTag.HUKS_TAG_KEY_SIZE, value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128 },
        { tag: huks.HuksTag.HUKS_TAG_PURPOSE, value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT },
        { tag: huks.HuksTag.HUKS_TAG_PADDING, value: huks.HuksKeyPadding.HUKS_PADDING_PKCS7 },
        { tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE, value: huks.HuksCipherMode.HUKS_MODE_CBC },
        { tag: huks.HuksTag.HUKS_TAG_IV, value: StringToUnit8Array(IV) }
    ];
}

function GetAesDecryptPropertiesCBC() {
    return [
        { tag: huks.HuksTag.HUKS_TAG_ALGORITHM, value: huks.HuksKeyAlg.HUKS_ALG_AES },
        { tag: huks.HuksTag.HUKS_TAG_KEY_SIZE, value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128 },
        { tag: huks.HuksTag.HUKS_TAG_PURPOSE, value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT },
        { tag: huks.HuksTag.HUKS_TAG_PADDING, value: huks.HuksKeyPadding.HUKS_PADDING_PKCS7 },
        { tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE, value: huks.HuksCipherMode.HUKS_MODE_CBC },
        { tag: huks.HuksTag.HUKS_TAG_IV, value: StringToUnit8Array(IV) }
    ];
}

function GetAesGenPropertiesGCM() {
    return [
        { tag: huks.HuksTag.HUKS_TAG_ALGORITHM, value: huks.HuksKeyAlg.HUKS_ALG_AES },
        { tag: huks.HuksTag.HUKS_TAG_KEY_SIZE, value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128 },
        { tag: huks.HuksTag.HUKS_TAG_PURPOSE, value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT | huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT }
    ];
}

function GetAesEncryptPropertiesGCM() {
    return [
        { tag: huks.HuksTag.HUKS_TAG_ALGORITHM, value: huks.HuksKeyAlg.HUKS_ALG_AES },
        { tag: huks.HuksTag.HUKS_TAG_KEY_SIZE, value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128 },
        { tag: huks.HuksTag.HUKS_TAG_PURPOSE, value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_ENCRYPT },
        { tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE, value: huks.HuksCipherMode.HUKS_MODE_GCM },
        { tag: huks.HuksTag.HUKS_TAG_PADDING, value: huks.HuksKeyPadding.HUKS_PADDING_NONE },
        { tag: huks.HuksTag.HUKS_TAG_NONCE, value: StringToUnit8Array(NONCE) },
        { tag: huks.HuksTag.HUKS_TAG_ASSOCIATED_DATA, value: StringToUnit8Array(AAD) }
    ];
}

function GetAesDecryptPropertiesGCM(ae_tag_value) {
    return [
        { tag: huks.HuksTag.HUKS_TAG_ALGORITHM, value: huks.HuksKeyAlg.HUKS_ALG_AES },
        { tag: huks.HuksTag.HUKS_TAG_KEY_SIZE, value: huks.HuksKeySize.HUKS_AES_KEY_SIZE_128 },
        { tag: huks.HuksTag.HUKS_TAG_PURPOSE, value: huks.HuksKeyPurpose.HUKS_KEY_PURPOSE_DECRYPT },
        { tag: huks.HuksTag.HUKS_TAG_BLOCK_MODE, value: huks.HuksCipherMode.HUKS_MODE_GCM },
        { tag: huks.HuksTag.HUKS_TAG_PADDING, value: huks.HuksKeyPadding.HUKS_PADDING_NONE },
        { tag: huks.HuksTag.HUKS_TAG_AE_TAG, value: ae_tag_value },
        { tag: huks.HuksTag.HUKS_TAG_NONCE, value: StringToUnit8Array(NONCE) },
        { tag: huks.HuksTag.HUKS_TAG_ASSOCIATED_DATA, value: StringToUnit8Array(AAD) }
    ];
}

function GenerateKeyGCM() {
    huksInfo = "enter GenerateKey";
    let encryptProperties = GetAesGenPropertiesGCM();
    let options = {
        properties: encryptProperties,
        inData: StringToUnit8Array(plainText)
    }
    huks.generateKeyItem(aesKeyAlias, options, (err) => {
        if (err) {
            huksInfo = "return code:" + err.code + " ： " + err.message;
        } else {
            huksInfo = "The key has been generated";
        }
    });
    return huksInfo;
}

function EncryptDataGCM(plainText) {
    huksInfo = "enter EncryptData"
    let encryptProperties = GetAesEncryptPropertiesGCM()
    let options = {
        properties: encryptProperties,
        inData: StringToUnit8Array(plainText)
    }
    huks.initSession(aesKeyAlias, options, (err, data) => {
        if (err) {
            huksInfo = "return code:" + err.code + " ： " + err.message;
        } else {
            handle = data.handle;
            huks.finishSession(handle, options, (err, data) => {
                if (err) {
                    huksInfo = "return code:" + err.code + " ： " + err.message;
                } else {
                    huksInfo = Unit8ArrayToString(data.outData)
                }
            })
        }
    })
    return huksInfo;
}

function DecryptDataGCM(cipherText) {
    huksInfo = "enter DecryptData"
    let encryptOutPut = StringToUnit8Array(cipherText);
    let ae_tag_value = encryptOutPut.subarray(encryptOutPut.length - 16, encryptOutPut.length)
    let cipherData = encryptOutPut.subarray(0, encryptOutPut.length - 16);
    let decryptOptions = GetAesDecryptPropertiesGCM(ae_tag_value)
    let options = {
        properties: decryptOptions,
        inData: cipherData
    }
    huks.initSession(aesKeyAlias, options, (err, data) => {
        if (err) {
            huksInfo = "return code:" + err.code + " ： " + err.message;
        } else {
            handle = data.handle;
            huks.finishSession(handle, options, (err, data) => {
                if (err) {
                    huksInfo = "return code:" + err.code + " ： " + err.message;
                } else {
                    huksInfo = Unit8ArrayToString(data.outData);
                }
            });
        }
    });
    return huksInfo;
}

function DeleteKeyCBC() {
    huksInfo = "enter DeleteKey"
    let decryptOptions = GetAesEncryptPropertiesCBC()
    let options = {
        properties: decryptOptions,
    }
    huks.deleteKeyItem(aesKeyAlias, options, (err) => {
        if (err) {
            operationSuccessful = false;
            huksInfo = err.message;
        } else {
            operationSuccessful = true;
            huksInfo = "The key is deleted successfully.";
        }
    })
    return {huksInfo, operationSuccessful};
}

function CheckKeyExistCBC() {
    huksInfo = "enter CheckKeyExist"
    let decryptOptions = GetAesEncryptPropertiesCBC()
    let options = {
        properties: decryptOptions,
    }
    huks.isKeyItemExist(aesKeyAlias, options, (err) => {
        if (err) {
            operationSuccessful = false;
            huksInfo = err.message;
        } else {
            operationSuccessful = true;
            huksInfo = "The key exists.";
        }
    })
    return {huksInfo, operationSuccessful};
}

function DeleteKeyGCM() {
    huksInfo = "enter DeleteKey"
    let decryptOptions = GetAesEncryptPropertiesGCM()
    let options = {
        properties: decryptOptions,
    }
    huks.deleteKeyItem(aesKeyAlias, options, (err) => {
        if (err) {
            operationSuccessful = false;
            huksInfo = err.message;
        } else {
            operationSuccessful = true;
            huksInfo = "The key is deleted successfully.";
        }
    })
    return {huksInfo, operationSuccessful};
}

function CheckKeyExistGCM() {
    huksInfo = "enter CheckKeyExist"
    let decryptOptions = GetAesEncryptPropertiesGCM()
    let options = {
        properties: decryptOptions,
    }
    huks.isKeyItemExist(aesKeyAlias, options, (err) => {
        if (err) {
            operationSuccessful = false;
            huksInfo = "return code:" + err.code + " ： " + err.message;
        } else {
            operationSuccessful = true;
            huksInfo = "The key exists.";
        }
    })
    return {huksInfo, operationSuccessful};
}

function GenerateKeyCBC() {
    huksInfo = "enter GenerateKeyCBC";
    let encryptProperties = GetAesGenPropertiesCBC();
    let options = {
        properties: encryptProperties,
    }
    huksInfo = "enter GenerateKey";
    huks.generateKeyItem(aesKeyAlias, options, (err) => {
        if (err) {
            operationSuccessful = false;
            huksInfo = "return code:" + err.code + " ： " + err.message;
        } else {
            operationSuccessful = true;
            huksInfo = "The key has been generated";
        }
    });
    return {huksInfo, operationSuccessful};
}

function EncryptDataCBC(plainText) {
    huksInfo = "enter EncryptDataCBC"
    let encryptProperties = GetAesEncryptPropertiesCBC()
    let options = {
        properties: encryptProperties,
        inData: StringToUnit8Array(plainText)
    }
    huks.initSession(aesKeyAlias, options, (err, data) => {
        if (err !== null) {
            operationSuccessful = false;
            huksInfo = "return code:" + err.code + " ： " + err.message;
        } else {
            handle = data.handle;
            huks.finishSession(handle, options, (err1, data1) => {
                console.debug("enter EncryptDataCBC finishSession err:" + JSON.stringify(err1) + "--- data:" + JSON.stringify(data1))
                if (err1 !== null) {
                    operationSuccessful = false;
                    huksInfo = "return code:" + err.code + " ： " + err.message;
                } else {
                    operationSuccessful = true;
                    huksInfo = Unit8ArrayToString(data1.outData);
                }
            })
        }
    });
    return {huksInfo, operationSuccessful};
}

function DecryptDataCBC(cipherText) {
    huksInfo = "enter DecryptDataCBC"
    let encryptOutPut = StringToUnit8Array(cipherText);
    let decryptOptions = GetAesDecryptPropertiesCBC()
    let options = {
        properties: decryptOptions,
        inData: encryptOutPut
    }
    huks.initSession(aesKeyAlias, options, (err, data) => {
        if (err) {
            operationSuccessful = false;
            huksInfo = "return code:" + err.code + " ： " + err.message;
        } else {
            handle = data.handle;
            huks.finishSession(handle, options, (err, data) => {
                if (err) {
                    operationSuccessful = false;
                    huksInfo = "return code:" + err.code + " ： " + err.message;
                } else {
                    operationSuccessful = true;
                    huksInfo = Unit8ArrayToString(data.outData);
                }
            });
        }
    });
    return {huksInfo, operationSuccessful};
}

export {
    GenerateKeyCBC,
    EncryptDataCBC,
    DecryptDataCBC,
    GenerateKeyGCM,
    EncryptDataGCM,
    DecryptDataGCM,
    DeleteKeyCBC,
    CheckKeyExistCBC,
    DeleteKeyGCM,
    CheckKeyExistGCM
}
