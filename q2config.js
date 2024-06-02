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

  const empty = ''
  const plusDropWeap = 'alias +dropweap "'
  const minusDropWeap = 'alias -dropweap "'
  const plusDropAmmo = 'alias +dropammo "'
  const minusDropAmmo = 'alias -dropammo "'

  function bindConstructor (startWith, data) {
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

  const result = `//Copia y pega esta shit al final del autoexec.cfg\n\n${useWeap}\n${dropW_On}\n${dropW_Off}\n\n${dropA_On}\n${dropA_Off}\n\n${mode}`

  return result
}
