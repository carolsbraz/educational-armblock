const board = document.getElementById('programming-blocks')

const dragboard = document.getElementById('here-blocks')
new Sortable(dragboard, {
    group: {
        name: 'shared',
        pull: 'clone',
        put: false // Do not allow items to be put into this list
    },
    animation: 150,
    sort: false,
    filter: '.undrag'
});

let countcommands = 0;

new Sortable(board, {
    group: 'shared',
    animation: 150
        //onAdd: function(evt) {
        //    const blocks = document.querySelectorAll('#board .block')
        //    countcommands = 0;
        //    blocks.forEach(block => {
        //        if (block.classList.contains("delay")) {
        //            console.log(blocks)
        //            countcommands += 2
        //        }
        //        if (block.classList.contains("abrir-garra")) {
        //            console.log(blocks)
        //            countcommands += 1
        //        }
        //        if (block.classList.contains("fechar-garra")) {
        //            console.log(blocks)
        //            countcommands += 1
        //        }
        //        if (block.classList.contains("motor")) {
        //            console.log(blocks)
        //            countcommands += 4
        //        }
        //    });
        //    if (countcommands >= 24) {
        //        var state = this.option("disabled"); // get
        //        this.option("disabled", !state);
        //    }
        //}
});

const btnAdd = document.getElementById('add-button')
const hereBlocks = document.getElementById('here-blocks')

btnAdd.addEventListener('click', () => {
    const newBoard = document.createElement('div')
    newBoard.classList.add('block', 'yellow', 'motor')

    const idt = document.createElement('span')
    var idttxt = document.createTextNode(`(Movimento individual)`);
    var idtblock = document.createTextNode(`Mover o motor`);
    idt.appendChild(idttxt)
    const motorInput = document.createElement('input')
    motorInput.setAttribute('type', 'number')
    motorInput.setAttribute('placeholder', 'motor')

    const br = document.createElement('br')

    // internal yellow

    const drag = document.createElement('div')
    drag.classList.add('drag')

    // blue content

    const blueBlock = document.createElement('div')
    blueBlock.classList.add('block', 'blue')

    var degre = document.createTextNode(`Para`);
    blueBlock.appendChild(degre)

    const degreInput = document.createElement('input')
    degreInput.setAttribute('type', 'number')
    degreInput.setAttribute('placeholder', 'graus')
    blueBlock.appendChild(degreInput)

    var degresymbol = document.createTextNode(`°`);
    blueBlock.appendChild(degresymbol)

    drag.appendChild(blueBlock)

    // red content

    const redBlock = document.createElement('div')
    redBlock.classList.add('block', 'brown')

    var degre = document.createTextNode(`Para`);
    redBlock.appendChild(degre)

    const speedInput = document.createElement('input')
    speedInput.setAttribute('type', 'number')
    speedInput.setAttribute('placeholder', 'velo...')
    redBlock.appendChild(speedInput)

    var degresymbol = document.createTextNode(`°`);
    redBlock.appendChild(degresymbol)

    drag.appendChild(redBlock)

    newBoard.appendChild(idt)
    newBoard.appendChild(br)
    newBoard.appendChild(idtblock)
    newBoard.appendChild(motorInput)
    newBoard.appendChild(drag)
    hereBlocks.appendChild(newBoard)
})

const btndelete = document.getElementById('delete')

btndelete.addEventListener('click', () => {
    const div = document.getElementById("programming-blocks");
    countcommands = 0
    div.innerText = ''
})

const enviar = document.getElementById('enviar')

//chamando os inputs
const txtConfiguracoes = document.getElementById('conf')
const txtPorta = document.getElementById('port')
const txtComando = document.getElementById('final-command')

enviar.addEventListener('click', (event) => {
    //gerando string de comandos
    let blockcommands = ''
    let finalcommand = ''
    let countcommands = 0;
    const blocks = document.querySelectorAll('#board .block')

    let permissao = true

    blocks.forEach(block => {

        countcommands += 1
        console.log(countcommands)
        if (block.classList.contains("delay")) {
            blockcommands += '&'
            blockcommands += '1:'
            const input = block.querySelectorAll('input')[0];
            console.log(input.value)
            if (input.value != "") {
                blockcommands += input.value
            } else {
                const messageerror = document.getElementById('error-message')
                messageerror.style.display = 'inline'
                permissao = false
            }
        }
        if (block.classList.contains("abrir-garra")) {
            blockcommands += '&'
            blockcommands += '2'
        }
        if (block.classList.contains("fechar-garra")) {
            blockcommands += '&'
            blockcommands += '3'
        }
        if (block.classList.contains("motor")) {
            blockcommands += '&'
            blockcommands += '4:'
            const id = block.querySelectorAll('input')[0];
            const pos = block.querySelectorAll('input')[1];
            const vel = block.querySelectorAll('input')[2];

            if (id.value != "" && pos.value != "" && vel.value != "") {

                if (parseInt(pos.value, 10) >= 5 && parseInt(pos.value, 10) <= 180) {
                    blockcommands += `${id.value}:`
                    blockcommands += `${pos.value}:`
                    blockcommands += `${vel.value}`
                } else {
                    const limiteerror = document.getElementById('limit-message')
                    limiteerror.style.display = 'inline'
                    permissao = false
                }

            } else {
                const messageerror = document.getElementById('error-message')
                messageerror.style.display = 'inline'
                permissao = false
            }

            countcommands -= 2
        }

    })

    finalcommand = `prog&${countcommands}${blockcommands}`
        // atribuindo comando ao input
    txtComando.value = finalcommand;

    //pegando valor da porta e atribuindo
    const valorPorta = document.getElementById('serial-port')
    txtPorta.value = valorPorta.value

    //pegando o valor dos pinos
    const pino1 = document.getElementById('pino1')
    const pino2 = document.getElementById('pino2')
    const pino3 = document.getElementById('pino3')
    const pino4 = document.getElementById('pino4')
    const pino5 = document.getElementById('pino5')
    const pino6 = document.getElementById('pino6')
    const pino7 = document.getElementById('pino7')

    if (pino1.value == '' || pino2.value == '' || pino3.value == '' || pino4.value == '' || pino5.value == '' || pino6.value == '' || pino7.value == '') {
        const messageerror = document.getElementById('error-message')
        messageerror.style.display = 'inline'
        permissao = false
    }

    //gerando string
    let config = `conf&${pino1.value}&${pino2.value}&${pino3.value}&${pino4.value}&${pino5.value}&${pino6.value}&${pino7.value}`

    //atribuindo string de conf para input
    txtConfiguracoes.value = config

    //gerando caminho pro server

    if (permissao == true) {
        localStorage.setItem('comandos', finalcommand);
        localStorage.setItem('conf', config);
        localStorage.setItem('com', valorPorta);
        var form = document.getElementById('comandos');
        form.action = "/enviar-comandos";
        form.submit();
    }
})

//message modal

const fecharlimit = document.getElementById('fechar-limit')
const messagelimit = document.getElementById('limit-message')

if (fecharlimit != null) {
    fecharlimit.addEventListener('click', () => {
        messagelimit.style.display = 'none'
    })
}

const fecharerror = document.getElementById('fechar-error')
const messageerror = document.getElementById('error-message')

if (fecharerror != null) {
    fecharerror.addEventListener('click', () => {
        messageerror.style.display = 'none'
    })
}

const fechar = document.getElementById('fechar-message')
const message = document.getElementById('message')

if (fechar != null) {
    fechar.addEventListener('click', () => {
        message.style.display = 'none'
    })
}