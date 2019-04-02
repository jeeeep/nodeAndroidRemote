const readline = require('readline');

readline.emitKeypressEvents(process.stdin);

process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        process.exit();
    } else {
        console.log(`You pressed the "${str}" key`);
        console.log("Key:", key)
        processKeyPress(key.name)
    }
});

function processKeyPress(keyName){
    let keycode;
    switch(keyName){
        case 'home':
            keycode = 3;
            break;
        case 'backspace':
            keycode = 4;
            break;
        case 'escape':
            keycode = 4;
            break;
        case 'up':
            keycode = 19;
            break;
        case 'down':
            keycode = 20;
            break;
        case 'left':
            keycode = 21;
            break;
        case 'right':
            keycode = 22;
            break;
        case  'return':
            keycode = 23;
            break;
    }
    if(keycode != undefined)
        sendKeyCode(keycode)
    else
        console.log("Undefined key code");
}

function sendKeyCode(keycode){
    let commandString = 'adb shell input keyevent ' + keycode;
    console.log("Command String:", commandString);
    executeCommand(commandString)
}

function executeCommand(cmd){
    console.log("Cmd: ", cmd);
    const exec = require('child_process').exec;
    const child = exec(cmd,
        (error, stdout, stderr) => {
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
}