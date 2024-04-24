export const paymentAid = [
    '325041592E5359532E4444463031',
    'd5760000850100',
    'd5760000850101',
    'A0000000041010',
    'A0000000042203',
    'A0000000031010'
];

export const otherAid = [
    'd4760000850102',
    'd5760000850103'
];

export const DEFAULT_RESP = [0X6a, 0X82];

const receiveData1 = [
    0x00, 0xa4, 0x04, 0x00, 0x07,
    0xd5, 0x76, 0x00, 0x00, 0x85, 0x01, 0x01,
    0x00
];

export const RESPONSE1 = [
    0x6f, 0x10, 0x84, 0x07, 0xd2, 0x76, 0x00,
    0x00, 0x85, 0x01, 0x01, 0xa5, 0x05, 0x9f,
    0x08, 0x02, 0x81, 0x31, 0x90, 0x00
];

export const receiveData2 = [
    0x00, 0xa4, 0x00, 0x0c,
    0x02, 0xe1, 0x03
];

export const RESPONSE2 = [
    0x90, 0x00
];

export const receiveData3 = [
    0x00, 0xb0, 0x00, 0x00,
    0x0f
];

export const RESPONSE3 = [
    0x00, 0x0f, 0x20, 0x01, 0x00, 0x00, 0xff,
    0x04, 0x06, 0xe1, 0x04, 0x01, 0x00, 0x00,
    0x00, 0x90, 0x00
];

export const receiveData4 = [
    0x00, 0xa4, 0x00, 0x0c,
    0x02, 0xe1, 0x04
];

export const RESPONSE4 = [
    0x90, 0x00
];

export const receiveData5 = [
    0x00, 0xb0, 0x00, 0x00,
    0x02
];

export const RESPONSE5 = [
    0x00, 0x1d, 0x90, 0x00
];

export const receiveData6 = [
    0x00, 0xb0, 0x00, 0x02,
    0x1d
];

export const RESPONSE6 = [
    0xd2, 0x0c, 0x0e,
    0x61, 0x70, 0x70, 0x2F, 0x54, 0x65, 0x73, 0x74, 0x48, 0x43, 0x45,
    0x10, 0x00, 0x00, 0x00, 0x09, 0x01,
    0x03, 0x06, 0x00, 0x00, 0x00, 0x00, 0x07,
    0xc5, 0x90, 0x00
];

export const comparisonResponseData = [
    { data: receiveData1, response: RESPONSE1 },
    { data: receiveData2, response: RESPONSE2 },
    { data: receiveData3, response: RESPONSE3 },
    { data: receiveData4, response: RESPONSE4 },
    { data: receiveData5, response: RESPONSE5 },
    { data: receiveData6, response: RESPONSE6 }
];