const weapons = [
  [2, 'Shotgun', 'use shotgun', 'usg', 'dsg', 'dshe'],
  [3, 'Super Shotgun', 'use super shotgun', 'ussg', 'dssg', 'dshe'],
  [4, 'Machinegun', 'use machinegun', 'umg', 'dmg', 'dbul'],
  [5, 'Chaingun', 'use chaingun', 'ucg', 'dcg', 'dbul'],
  [6, 'Grenade Launcher', 'use grenade launcher', 'ugl', 'dgl', 'dgre'],
  [7, 'Rocket Launcher', 'use rocket launcher', 'url', 'drl', 'droc'],
  [8, 'Hyper Blaster', 'use hyperblaster', 'uhb', 'dhb', 'dcel'],
  [9, 'Railgun', 'use railgun', 'urg', 'drg', 'dslu'],
  [0, 'BFG10k', 'use bfg10k', 'ubfg', 'dbfg', 'dcel'],
  ['ctrl', 'Drop Weapon', '+dropweap'],
  ['alt', 'Drop Ammo', '+dropammo'],
  ['space', 'Zoom', '+zoom'],
]

function createInputFields() {
  const weaponBindings = document.getElementById('weapon-bindings')

  weapons.forEach((weapon) => {
    const weaponDiv = document.createElement('div')
    const weaponName = document.createElement('span')
    const input = document.createElement('input')

    input.type = 'text'
    input.placeholder = weapon[0]

    input.addEventListener('mouseenter', function () {
      if (!document.activeElement || document.activeElement !== input) {
        this.focus()
        this.select()
      }
    })

    input.addEventListener('wheel', function (event) {
      if (event.deltaY < 0) {
        this.value = 'mwheelup'
      } else {
        this.value = 'mwheeldown'
      }
    })

    weaponName.textContent = weapon[1]
    weaponDiv.className = 'mb-3 basis-0 justify-content-between gap-2'
    weaponDiv.appendChild(weaponName)
    weaponDiv.appendChild(input)
    weaponBindings.appendChild(weaponDiv)
  })
}

window.onload = createInputFields

function updateWeapons() {
  const updatedWeaponsTextarea = document.getElementById('updated-weapons')
  updatedWeaponsTextarea.value = ''

  const inputs = document.querySelectorAll('#weapon-bindings input')
  inputs.forEach((input, index) => {
    const newKey = input.value.trim()
    if (newKey !== '') {
      weapons[index][0] = newKey
    }
  })

  const result = updateBinds()
  updatedWeaponsTextarea.value += result
}

function updateBinds() {
  const weaponBind = []
  const useWeaponBind = []
  const dropWeaponBind = []
  const dropAmmoBind = []
  const modeBind = []
  const zoomBind = []

  for (let i = 0; i <= 8; i++) {
    for (let j = 0; j <= 4; j++) {
      if (j === 0) {
        weaponBind.push(`bind ${weapons[i][j]} "${weapons[i][j + 2]}"`)
        useWeaponBind.push(`bind ${weapons[i][j]} ${weapons[i][j + 3]}`)
        dropWeaponBind.push(`bind ${weapons[i][j]} ${weapons[i][j + 4]}`)
        dropAmmoBind.push(`bind ${weapons[i][j]} ${weapons[i][j + 5]}`)
      }
    }
  }

  for (let i = 0; i <= 10; i++) {
    for (let j = 0; j <= 2; j++) {
      if (i >= 9 && j === 0) {
        modeBind.push(`bind ${weapons[i][j]} "${weapons[i][j + 2]}"`)
      }
    }
  }
  
  for (let i = 0; i <= 11; i++) {
    for (let j = 0; j <= 2; j++) {
      if (i >= 11 && j === 0) {
        zoomBind.push(`bind ${weapons[i][j]} "${weapons[i][j + 2]}"`)
      }
    }
  }

  const empty = ''
  const plusDropWeap = 'alias +dropweap "'
  const minusDropWeap = 'alias -dropweap "'
  const plusDropAmmo = 'alias +dropammo "'
  const minusDropAmmo = 'alias -dropammo "'
  
  function bindConstructor(startWith, data) {
    let result = startWith

    if (startWith !== '') {
      for (let i = 0; i < data.length; i++) {
        result += data[i]
        if (i < data.length - 1) {
          result += '; '
        }
      }
      result += '"'
      return result
    }
    for (let i = 0; i < data.length; i++) {
      result += `${data[i]}\n`
    }
    return result
  }

  const useWeap = bindConstructor(empty, weaponBind)
  const dropW_On = bindConstructor(plusDropWeap, dropWeaponBind)
  const dropW_Off = bindConstructor(minusDropWeap, useWeaponBind)
  const dropA_On = bindConstructor(plusDropAmmo, dropAmmoBind)
  const dropA_Off = bindConstructor(minusDropAmmo, useWeaponBind)
  const mode = bindConstructor(empty, modeBind)
  const zoom = bindConstructor(empty, zoomBind)

  const result = `//Copia y pega esta shit al final del autoexec.cfg
${useWeap}
${dropW_On}
${dropW_Off}

${dropA_On}
${dropA_Off}

${mode}
${zoom}
//drop weapon alias
alias dsg "drop Shotgun;drop shells"
alias dssg "drop Super Shotgun;drop shells"
alias dmg "drop Machinegun;drop bullets"
alias dcg "drop Chaingun;drop bullets"
alias dgl "drop Grenade Launcher;drop grenades"
alias drl "drop Rocket Launcher;drop rockets"
alias dhb "drop Hyperblaster;drop cells"
alias drg "drop Railgun;drop slugs"
alias dbfg "drop BFG10K:drop cells"

//drop ammo alias
alias dshe "drop shells"
alias dbul "drop bullets"
alias dgre "drop grenades"
alias droc "drop rockets"
alias dcel "drop cells"
alias dslu "drop slugs"

//use weapon alias
alias usg "use shotgun"
alias ussg "use super shotgun"
alias umg "use machinegun"
alias ucg "use chaingun"
alias ugl "use grenade launcher"
alias url "use rocket launcher"
alias uhb "use hyperblaster"
alias ubfg "use bfg10k"
alias urg "use railgun"
alias ubs "use blaster"

//zoom
alias +zoom "fov 60; sensitivity 0.5"
alias -zoom "fov 120; sensitivity 1.5"

//crosshair
ch_scale "2"
crosshair "2"
ch_red "1"
ch_green "0"
ch_blue "1"
`

  return result
}
