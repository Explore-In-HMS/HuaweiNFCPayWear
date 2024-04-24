import {P2pClient, Message, Builder} from './wearEngineSdk/wearengine'
import window from '@ohos.window'

var messageClient = new P2pClient();
var infoClient = new Message();
var builderClient = new Builder();

//TODO: You should update this with the package name of your phone application
var phoneAppPackageName = "PHONE APP PACKAGE NAME"

export const wearEngineFunctions = {
  /*
    When the wearable device is started, it is invoked. The operation of keeping the screen on (setKeepScreenOn) is performed,
    and the package name of the message receiver is set.
  */
    onInit() {
        window.setKeepScreenOn({
            keepScreenOn: true,
            success: function () {
                console.log('screen on success');
            },
            fail: function () {
                console.log('screen on failed');
            },
        });

        messageClient.setPeerPkgName(phoneAppPackageName);
    },
    onDestroy() {},
    /*
    This function registers a message receiver. Upon successful registration, a successful callback (onSuccess) is defined when a message is received.
    In case of failure, an error message (onFailure) is specified,
    and an action to be taken upon receiving a message is defined as onReceiveMessage.
     */
    registerMessage() {
        var flash = this;
        console.log('Register message button click');
        flash.operateMessage = 'Register message button click';

        messageClient.registerReceiver({
            onSuccess: () => flash.receiveMessageOK = 'Message receive success',
            onFailure: () => flash.receiveMessageOK = 'Message receive fail',
            onReceiveMessage: data => {
                flash.receiveMessageOK = data && data.isFileType
                    ? 'Receive file name: ' + data.name
                    : 'Receive message info: ' + data;
            }
        });
    },

    // It is used to remove a registered message receiver.
    unregisterMessage() {
        this.operateMessage = 'Register message button click';

        messageClient.unregisterReceiver({
            onSuccess: () => this.operateMessage = 'Stop receiving messages is sent'
        });
    },
  /*
    This function sends a message. The message content is set by builderClient, and the sending process is executed.
    Upon successful sending, a callback is defined, and in case of failure, an error message is set.
   */
    sendMessage() {
        builderClient.setDescription('hello wearEngine');
        infoClient.builder = builderClient;

        this.operateMessage = 'Send message button click';
        console.log('testBuilder' + infoClient.getData());

        messageClient.send(infoClient, {
            onSuccess: () => this.operateMessage = 'Message sent successfully',
            onFailure: () => this.operateMessage = 'Failed to send message',
            onSendResult: resultCode => console.log(resultCode.data + resultCode.code),
            onSendProgress: count => console.log(count)
        });
    },
 /*
    This function sends a file. The file to be sent is set by builderClient, and the sending process is executed.
    Upon successful sending, a callback is defined, and in case of failure, an error message is set
 */
    sendFile() {
        const testFile = { name: 'internal://app/ccc.png', mode: '', mode2: '' };
        builderClient.setPayload(testFile);
        console.log('setPayload');

        infoClient.builder = builderClient;
        this.operateMessage = 'Send file button click';
        console.log('testFileBuilder: ' + infoClient.getFile().name);

        messageClient.send(infoClient, {
            onSuccess: () => this.operateMessage = 'File sent successfully',
            onFailure: () => this.operateMessage = 'Failed to send file',
            onSendResult: resultCode => console.log(resultCode.data + resultCode.code),
            onSendProgress: count => console.log('Progress:' + count)
        });
    },
   /*
    The "ping" operation involves sending a message to a specific target and waiting for a response, then performing actions based on that response.

    Subsequently, a message is sent to a specific target application (phoneAppPackageName variable) using messageClient. The operateMessage variable contains a message related to this operation.

    1) onSuccess: Function to execute when the sending operation is successful. It appends "success" to the operateMessage variable.
    2) onFailure: Function to execute when the sending operation fails. It appends "fail" to the operateMessage variable.
    3) onPingResult: Function handling the ping result. Based on the result code returned with the resultCode parameter, the operateMessage variable is set.
 */
    pingRight() {
        console.log("ping");
        var flashlight = this;
        flashlight.operateMessage = "Ping APP";
        messageClient.ping({
            onSuccess: function () {
                flashlight.operateMessage = flashlight.operateMessage + "success";
            },
            onFailure: function () {
                flashlight.operateMessage = flashlight.operateMessage + "fail";
            },
            onPingResult: function (resultCode) {
                flashlight.operateMessage = "result code:" + resultCode.code + ", the app already have installed";
            },
        });

    },
}

export default wearEngineFunctions;
